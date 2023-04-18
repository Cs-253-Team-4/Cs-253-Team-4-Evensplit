import React, { useState, useContext } from "react";
import { GlobalContext2 } from "../context/GlobalState2";

export const AddRequest = () => {
  const [friendEmail, setFriendEmail] = useState("");
  const [amount, setAmount] = useState("₹");
  const [text, setText] = useState("");

  const { addRequest } = useContext(GlobalContext2);

  const onSubmit = async (e) => {
    // e.preventDefault();
    if(amount <= 0){
      window.alert('Request amount cannot be 0 or negative');
      e.preventDefault();
    }
    else{
    const token = localStorage.getItem('token');
    if(!token){
      window.location.href = ('/');
    }
    else{
      const res = await fetch('http://localhost:1337/api/requestMoney', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
          },
          body: JSON.stringify({
              friendEmail: friendEmail,  
              amount: amount,
              message: text,
          }),
      });
      const data = await res.json();
    }
  }
  };

  return (
    <>
      <h3
        className="text-2xl font-bold text-gray-300 m-2"
        style={{ borderBottom: "thick solid gray" }}
      >
        Add Request
      </h3>
      <form onSubmit={onSubmit} className="h-72">
        <div className="form-control align-center justify-center flex m-2">
            {/* <label htmlFor="text" className='mr-3'>Text</label> */}
            <input
                className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-5 mb-2"
                type="email"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                placeholder="Enter email of friend...."
            />
        </div>
        <div className="form-control align-center justify-center flex m-2">
          {/* <label htmlFor="text" className='mr-3'>Text</label> */}
          <input
            className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-5 mb-2"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add new transaction...."
          />
        </div>
        <div className="form-control align-center justify-center flex m-2">
          {/* <label htmlFor="amount" className='pr-4'>
            Amount
          </label> */}
          <input
            type="number"
            className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-4 mb-2 form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="₹ Enter amount..."
            required
          />
        </div>
        <div className="form-control align-center justify-center flex m-1">
          {/* <label htmlFor="text" className='mr-3'>Text</label> */}
          {/* <input type="date" name="Date" className='text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-1.5 pl-5 mb-2'/> */}
        </div>
        <button className="btn btn-custom btn-lg page-scroll">Request Money</button>
      </form>
    </>
  );
};
