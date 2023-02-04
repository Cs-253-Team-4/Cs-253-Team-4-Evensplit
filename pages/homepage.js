import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
//import Logo from "./Logo";
//import NavItem from ".../components/NavItem";
//import Navbar from "../components/Navbar";

export default function homepage(){
  return(
    <>
    <Navbar></Navbar>
    <div className="flex justify-center m-40">
      <div className="w-1/2 flex justify-center">
        <Link href={"/"}>
          <div className="text-3xl font-bold text-blue-500 hover:text-4xl h-40 w-40 "><img src="https://i.ibb.co/m9MMrsD/Screenshot-2023-02-02-185300.png" alt="Screenshot-2023-02-02-185300" border="0"/>CALENDAR</div>
          {/* <h1 className="text-3xl font-bold text-blue-500 hover:text-4xl">CALENDAR</h1> */}
        </Link>
      </div>
      <div className="w-1/2 flex justify-center">
        <Link href={"/"}>
        <div className="h-40 w-40"><img src="https://i.ibb.co/hMW5Scp/money.png" alt="money" border="0"/></div>
          <h1 className="text-3xl font-bold text-blue-500">EXPENSES</h1>
        </Link>
      </div>
    </div>
    </>
  )
}