import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function user_finance(){
    return(
        <>
        <Navbar></Navbar>
      <div className="flex justify-center m-40 ">
      <div className="w-1/3 flex justify-center">
        <Link href={"/personal-finance"}>
        <div className="h-40 w-40"><img src="https://i.ibb.co/hMW5Scp/money.png" alt="money" border="0" style={{borderRadius: '10px'}}/></div>
          <h1 className="text-3xl font-bold text-blue-500" style={{textAlign: 'center'}}>PERSONAL</h1>
        </Link>
      </div>
      <div className="w-1/3 flex justify-center">
        <Link href={"/friend-finance"}>
        <div className="h-40 w-40"><img src="friends.jpg" alt="friend2" border="0" style={{borderRadius: '10px'}}/></div>
          <h1 className="text-3xl font-bold text-blue-500" style={{textAlign: 'center'}}>FRIEND</h1>
        </Link>
      </div>
      <div className="w-1/3 flex justify-center">
        <Link href={"/group-home"}>
        <div className="h-40 w-40"><img src="https://i.ibb.co/TT2NCjN/group.png" alt="group" border="0" style={{borderRadius: '10px'}}/></div>
          <h1 className="text-3xl align-center font-bold text-blue-500" style={{textAlign: 'center'}}>GROUPS</h1>
        </Link>
      </div>
    </div>
    <Footer/>
        </>
    )
}