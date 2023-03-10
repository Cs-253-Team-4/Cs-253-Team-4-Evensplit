import React from "react";
import { Header } from "components/Header";
import { Balance } from "components/Balance";
import { IncomeExpenses } from "components/IncomeExpenses";
import { TransactionList } from "components/TransactionList";
import { AddTransaction } from "components/AddTransaction";
import Navbar from "../components/Navbar";
import { useState } from 'react';

import { GlobalProvider } from "context/GlobalState";

//import 'pages/App.css';

function App() {
    const [friendEmail, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState("");
  
    async function requestAmount(event) {
      event.preventDefault();
  
      const response = await fetch("http://localhost:1337/api/friendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendEmail,
          message,
          amount,
        }),
      });
  
      const data = await response.json();
  
      if (data.user) {
        localStorage.setItem("token", data.user);
        alert("Request sent successfully");
      } else {
        alert("Please check your username and password");
      }
    }
  return (
    <GlobalProvider>
      <Navbar></Navbar>
      <Header />
      <main className="flex flex-col flex-1 text-center m-10">
        <div className="flex">
          <div className="w-1/3 flex p-7 m-5 rounded-2xl shadow-2xl">
            <div>
              
            </div>
          </div>
          <div className="w-1/3 flex p-10 m-3 rounded-2xl shadow-2xl">
            <form onSubmit={requestAmount}>
              <input
                value={friendEmail}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="friendEmail"
                placeholder="Friend Email"
                className="text-gray-400 bg-gray-100 outline-none flex-1 "
              />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                name="amount"
                placeholder="Amount"
                className="text-gray-400 bg-gray-100 outline-none flex-1 "
              />
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                name="message"
                placeholder="Enter your message here"
                className="text-gray-400 bg-gray-100 outline-none flex-1 "
              />
              <input
                type="submit"
                value="Request"
                placeholder="Send Request"
                className="text-xl text-blue-500 border-blue-500 border-2 rounded-full px-7 py-1.5  hover:bg-blue-500 hover:text-white"
              />
            </form>
          </div>
          <div className="w-1/3 flex pu-7 mu-5 mr-5 justify-center rounded-2xl shadow-2xl">
            
          </div>
        </div>
      </main>
    </GlobalProvider>
  );
}

export default App;
