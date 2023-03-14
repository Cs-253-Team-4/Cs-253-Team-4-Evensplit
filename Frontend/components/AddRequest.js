import React, { useState, useContext } from "react";
import { GlobalContext2 } from "../context/GlobalState2";

export const AddRequest = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("₹");

  const { addRequest } = useContext(GlobalContext2);

  const onSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };

    addRequest(newRequest);
  };

  return (
    <>
      <h3
        className="text-2xl font-bold text-gray-500 m-2"
        style={{ borderBottom: "thick solid gray" }}
      >
        Add Request
      </h3>
      <form onSubmit={onSubmit}>
        <div className="form-control align-center justify-center flex m-2">
          {/* <label htmlFor="text" className='mr-3'>Text</label> */}
          <input
            className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-5 mb-2"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add new Request...."
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
          />
        </div>
        <div className="form-control align-center justify-center flex m-1">
          {/* <label htmlFor="text" className='mr-3'>Text</label> */}
          {/* <input type="date" name="Date" className='text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-1.5 pl-5 mb-2'/> */}
        </div>
        <button className="btn">Add Request</button>
      </form>
    </>
  );
};
