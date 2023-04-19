import Head from "next/head";
import styles from "styles/Home.module.css";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import logo from "/public/logo.jpg";
import Link from "next/link";
import Footer from "../components/Footer"
import { useState } from 'react';
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      localStorage.setItem("user", data.email);
      alert("Login successful");
      window.location.href = "/homepage";
    } 
    else if(data.error == "Too many wrong attempts") {
      alert("Too many wrong attempts, please reset your password");
      window.location.href = "/forgot-password";
    }
    else{
      alert("Please check your username and password");
    }
  }
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div  style={{backgroundColor: 'black'}}>
      <main className="flex flex-col items-center justify-center flex-1 text-center m-6 ">
        <div className="bg-black rounded-2xl shadow-2xl m-5 flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <img
              src="logo.jpg"
              alt="logo-new"
              border="0"
              style={{borderRadius : '10px'}}
              className="h-20 w-25"
            />
            <div className="py-12">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                Log into your Account
              </div>
              <div className="border-2 w-10 border-blue-400 inline-block mb-2"></div>
              <form onSubmit={loginUser}>
                <div className="flex flex-col items-center mb-10">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5 rounded-md">
                    <FaRegEnvelope className="text-gray-400 mr-3" />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="text-gray-400 bg-gray-100 outline-none flex-1 "
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5 rounded-md">
                    <MdLockOutline className="text-gray-400 mr-3" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="text-gray-400 bg-gray-100 outline-none flex-1"
                    />
                  </div>
                  <div className="flex justify-between w-64 p-2">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-2" />
                      Remember Me
                    </label>
                    <a href="/forgot-password" className="text-xs hover:text-blue-400">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Login"
                  placeholder="Login"
                  className="text-xl text-blue-400 border-blue-400 border-2 rounded-full px-7 py-1.5  hover:bg-blue-400 hover:text-white"
                />
              </form>
            </div>
          </div>
          <div className="bg-blue-400 text-white w-2/5 rounded-2xl rounded-br-2xl py-36 px-10">
            <h2 className="text-3xl font-bold mb-2">Hello User!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="text-white mb-4">
              Manage your time and expenses like a pro!
            </p>
            <h4 className="mb-10">If you haven't registered yet</h4>
            <Link
              href={"/sign-up"}
              className="text-xl text-white border-white border-2 rounded-full px-7 py-1.5 hover:bg-white hover:text-blue-400"
            >
              Sign-Up
            </Link>
          </div>
        </div>
      </main>
      </div>
      <Footer/>
    </>
  );
}
