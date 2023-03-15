import Head from "next/head";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Link from "next/link";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
// const inter = Inter({ subsets: ['latin'] })

export default function signup() {
  const history = useHistory;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    // if (data.status === "ok") {
    //   history.push("/");
    // }
    if(data.status == 'ok'){
      alert('User Registered Successfully');
      window.location.href = '/';
    }
  }
  return (
    <>
      {/* <h1 className="text-center font-bold text-5xl mb-30 text-blue-500">EvenSplit</h1> */}
      <main className="flex flex-col items-center justify-center flex-1 text-center m-10">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <img
              src="https://i.ibb.co/JvG6Lzn/logo-new.png"
              alt="logo-new"
              border="0"
              className="h-20 w-25"
            />
            <div className="py-10">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                Sign-Up
              </div>
              <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>
              <form onSubmit={registerUser}>
                <div className="flex flex-col items-center mb-10">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                    <MdLockOutline className="text-gray-400 mr-3" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Name"
                      className="text-gray-400 bg-gray-100 outline-none flex-1"
                    />
                  </div>
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
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5">
                    <MdLockOutline className="text-gray-400 mr-3" />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Set Password"
                      className="text-gray-400 bg-gray-100 outline-none flex-1"
                    />
                  </div>
                  
                </div>
                <input
                  type="submit"
                  placeholder="Sign-Up"
                  className="text-xl text-blue-500 border-blue-500 border-2 rounded-full px-7 py-1.5  hover:bg-blue-500 hover:text-white"
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
    </>
  );
}
