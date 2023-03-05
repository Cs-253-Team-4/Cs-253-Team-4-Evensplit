import Head from "next/head";
import styles from "styles/Home.module.css";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import logo from "/public/logo.png"
import Link from "next/link";
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>EventSplIIT</title>
        <link rel="icon" href="https://i.ibb.co/JvG6Lzn/logo-new.png" />
      </Head>
      
        <main className="flex flex-col items-center justify-center flex-1 text-center m-10 ">
          <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
            <div className="w-3/5 p-5">
            <img src="https://i.ibb.co/JvG6Lzn/logo-new.png" alt="logo-new" border="0" className="h-20 w-25"/>
              <div className="py-12">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  Log into your Account
                </div>
                <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>
                <div className="flex flex-col items-center mb-10">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5 rounded-md">
                    <FaRegEnvelope className="text-gray-400 mr-3" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="text-gray-400 bg-gray-100 outline-none flex-1 "
                    ></input>
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-5 rounded-md">
                    <MdLockOutline className="text-gray-400 mr-3" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="text-gray-400 bg-gray-100 outline-none flex-1"
                    ></input>
                  </div>
                  <div className="flex justify-between w-64 p-2">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-2" />
                      Remember Me
                    </label>
                    <a href="#" className="text-xs hover:text-blue-500">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <Link 
                  href={"/homepage"}
                  className="text-xl text-blue-500 border-blue-500 border-2 rounded-full px-7 py-1.5  hover:bg-blue-500 hover:text-white"
                >
                  Login
                </Link>
                <div className="text-sm mt-5">
                  <Link href={"/"} className= "text-black px-4 py-1  hover:text-blue-500">Admin? Login Here</Link>
                </div>
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
    </>
  );
}
