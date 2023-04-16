import Head from "next/head";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer"
// const inter = Inter({ subsets: ['latin'] })

export default function signup() {
  const history = useHistory;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  async function setNewPassword(event) {
    event.preventDefault();
    if(password.length < 4){
      window.alert('Password must contain atleast 4 characters');
    }
    else{
      const response = await fetch("http://localhost:1337/api/setNewPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          password,
        }),
      });

      const data = await response.json();

      // if (data.status === "ok") {
      //   history.push("/");
      // }
      if(data.status == 'ok'){
        alert('Password updated successfully!');
        window.location.href = '/';
      }
      else{
        if(data.error == 'Duplicate email'){
          alert('User Already Registered');
        }
        else if(data.error == 'Wrong Email'){
          alert('Please use your IITK Email');
        }
        else{
          alert('Wrong OTP')
        }
      }
    }
  }
  async function sendOtp(event) {
    event.preventDefault();
      const response = await fetch("http://localhost:1337/api/sendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: "forgot password",
        }),
      });
      const data = await response.json();
      if(data.status == 'ok'){
        alert('OTP sent successfuly');
        setIsButtonDisabled(true);
        setCountdown(60);
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 60000);
      }
      else{
        if(data.error == 'Duplicate email'){
          alert('User Already Registered');
        }
        else if(data.error == 'Wrong email')
          alert('Please use your IITK Email');
        }
      }

    useEffect(() => {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000); // update countdown every 1 second
        return () => clearTimeout(timer);
      } else {
        setIsButtonDisabled(false);
      }
    }, [countdown, setIsButtonDisabled]); 
      

  return (
    <>
      {/* <h1 className="text-center font-bold text-5xl mb-30 text-blue-500">EvenSplit</h1> */}
      <main className="flex flex-col items-center justify-center flex-1 text-center m-10">
        <div className="bg-gray-800 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <img
              src="logo.jpg"
              alt="logo-new"
              border="0"
              style={{borderRadius : '10px'}}
              className="h-20 w-25"
            />
            <div className="py-10">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                Forgot Password
              </div>
              <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>
              <form>
                <div className="flex flex-col items-center mb-10">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                    <FaRegEnvelope className="text-gray-400 mr-3" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="text-gray-400 bg-gray-100 outline-none flex-1"
                    />
                  </div>
                  <input
                  type="submit"
                  name="sendotp"
                  placeholder="Send OTP"
                  value={"Send OTP"}
                  className={isButtonDisabled ? "text-s text-blue-500 border-blue-500 border-2 rounded-full px-7 py-1.5" : "text-s text-blue-500 border-blue-500 border-2 rounded-full px-7 py-1.5  hover:bg-blue-500 hover:text-white"}
                  onClick={sendOtp}
                  disabled={isButtonDisabled}
                  />
                  <p className="text-gray-500 w-64 p-2 flex items-center">
                    {isButtonDisabled === true ? (
                      <p>If you didn't receive OTP, please request again in {countdown}s</p>
                    ) : (
                      null
                    )}
                  </p>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                  <MdLockOutline className="text-gray-400 mr-3" />
                  <input
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      type="text"
                      name="otp"
                      placeholder="Please enter OTP"
                      className="text-gray-400 bg-gray-100 outline-none flex-1"
                    />
                    </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center">
                    <MdLockOutline className="text-gray-400 mr-3" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Set New Password"
                      className="text-gray-400 bg-gray-100 outline-none flex-1"
                    />
                  </div>
                  <input
                  type="submit"
                  placeholder="Sign-Up"
                  name="signup"
                  className="text-m text-blue-500 border-blue-500 border-2 rounded-full px-7 py-1.5 mt-4 hover:bg-blue-500 hover:text-white"
                  onClick={setNewPassword}
                />
                </div>
                

              </form>
            </div>
          </div>
          <div className="bg-blue-400 text-white w-2/5 rounded-2xl rounded-br-2xl py-36 px-10">
            <h2 className="text-3xl font-bold mb-2">Hello User!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="text-white mb-4">
              Manage your time and expenses like a pro!
            </p>
            <h4 className="mb-10">If you have already registered</h4>
            <Link
              href={"/"}
              className="text-xl text-white border-white border-2 rounded-full px-7 py-1.5 hover:bg-white hover:text-blue-400"
            >
              Sign-In
            </Link>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
