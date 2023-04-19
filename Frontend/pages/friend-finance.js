import React from "react";
import { useState, useEffect } from "react";
import { Header } from "components/Header";
import Footer from "../components/Footer";
import { SearchBar } from "components/SearchBar";
import { IncomeExpenses } from "components/IncomeExpenses";
import { History } from "components/History";

// import { TransactionList } from 'components/TransactionList';
import { AddRequest } from "../components/AddRequest";
import { AddFriendTransaction } from "../components/AddFriendTransaction";
import Navbar from "../components/Navbar";

import { GlobalProvider } from "context/GlobalState";
import { PendingListDisplay } from "@/components/PendingListDisplay";

//import 'pages/App.css';

async function handleRequest(index, accepted, request) {
  fetch("http://localhost:1337/api/deleteRequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      index: index,
      accepted: accepted,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      window.location.reload();
    });
}

function App() {
  const [friendHistory, setFriendHistory] = useState([]);
  const [PendingList, setPendingList] = useState([]);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const keys = ["name", "email"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  const fetchUserData = () => {
    fetch("http://localhost:1337/api/getFriendsHistory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFriendHistory(data.friendsHistory.reverse());
        setPendingList(data.requests.reverse());
      })
      .then(
        fetch("http://localhost:1337/api/getUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.status == "error") window.location.href = "/";
            setUsers(data.users);
          })
      );
  };

  useEffect(() => {
    if (
      window.localStorage.getItem("token") == null ||
      window.localStorage.getItem("user") == null
    )
      window.location.href = "/";
    else fetchUserData();
  }, []);

  return (
    <GlobalProvider>
      <Navbar></Navbar>

      <main className="flex flex-col flex-1 text-center m-5">
        <div className="flex">
          <div className="w-1/3 flex flex-col bg-gray-700 p-7 m-5 mx-auto rounded-2xl shadow-2xl h-screen">
            {/* <Balance/> */}
            {/* <IncomeExpenses/> */}
            {/* <SearchBar /> */}
            {/* <PendingListDisplay /> */}
            <div>
              {/* <h3 className='text-2xl font-bold text-gray-300 m-2' style={{borderBottom:"thick solid gray" }}>Search</h3> */}
              <form>
                <input
                  className="search w-80 text-center border-2 border-gray-600 bg-gray-100 m-1 p-1 text-black rounded-full"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
                <div className="overflow-y-auto h-64">
                  {search(users).map((item) =>
                    item.email == localStorage.getItem("user") ? null : (
                      <button
                        key={item._id}
                        className="px-5 py-2 m-1 border-r-4 border-b-4 border-t-2 border-l-2 border-blue-400 bg-black rounded-lg w-80"
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText(item.email);
                          alert("Email Copied to Clipboard");
                        }}
                      >
                        <p> {item.name}</p>
                        <p> {item.email}</p>
                      </button>
                    )
                  )}
                </div>
              </form>
            </div>
            <h3
              className="text-2xl font-bold text-gray-300 m-2 mt-12"
              style={{ borderBottom: "thick solid gray" }}
            >
              Pending Requests
            </h3>
            <div className="item-center m-2 p-3 overflow-auto max-h-64">
              <ul className="list flex flex-col justify-center item-center">
                {PendingList.map((request, index) => {
                  return localStorage.getItem('user') == request.senderEmail ? (request.resolved == false ? (<div
                  className="btn btn-custom btn-lg page-scroll"
                  style={{ textAlign: "left", textTransform: "lowercase" }}
                >
                  <p className="justify-start w-60 items-center">
                    {" "}
                    You Requested ₹
                    {request.amount} from {request.receiverName} ({request.receiverEmail}) Message: {request.message}
                  </p>
                </div>) : <div
                  className="btn btn-custom btn-lg page-scroll"
                  style={{ textAlign: "left", textTransform: "lowercase" }}
                >
                  <p className="justify-start w-60 items-center">
                    {" "}
                    {request.message}
                  </p>
                </div>) : (
                    <div
                      className="btn btn-custom btn-lg page-scroll"
                      style={{ textAlign: "left", textTransform: "lowercase" }}
                    >
                      <p className="justify-start w-60 items-center">
                        {" "}
                        {request.senderName} ({request.senderEmail}) Requested ₹
                        {request.amount} Message: {request.message}
                      </p>
                      <div className="text-right">
                        <form>
                          <button
                            class="rounded-full w-15 py-0.5 px-3 m-1  bg-green-600 "
                            onClick={() => {
                              handleRequest({ index }, true, { request });
                            }}
                          >
                            {" "}
                            Accept{" "}
                          </button>
                          <button
                            class="rounded-full w-15 py-0.5 px-2 m-1 bg-red-600"
                            onClick={() => {
                              handleRequest({ index }, false, { request });
                            }}
                          >
                            Decline
                          </button>
                        </form>
                      </div>
                      {/* <p> {user.Amount}</p>
                      <p> {user.Description}</p> */}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="w-1/3 flex flex-col bg-gray-700 p-7 m-5 rounded-2xl shadow-2xl h-screen">
            <AddFriendTransaction />
            <AddRequest />
          </div>
          <div className="w-1/3 flex p-7 m-5 bg-gray-700 mx-auto justify-center rounded-2xl shadow-2xl h-screen">
            {/* <History /> */}
            <div className="App">
              <h3
                className="text-2xl font-bold text-gray-300 m-2"
                style={{ borderBottom: "thick solid gray" }}
              >
                History
              </h3>
              {/* Iterate over imported array in userData */}
              <div
                className="users overflow-auto w-96"
                style={{ height: "600px" }}
              >
                {friendHistory.map((user) => {
                  if (user.amount < 0) {
                    return (
                      <div className="px-5 py-2 m-3 bg-black border-r-4 border-b-4 border-t-2 border-l-2 border-red-600 rounded-lg bg-color">
                        <p>
                          {" "}
                          You paid ₹{-user.amount} to {user.friendName} (
                          {user.friendEmail})
                          <br />
                          {user.message == "" ? null : (
                            <p>Message: {user.message}</p>
                          )}
                        </p>
                        {/* <p> ₹ {user.Amount}</p>
                      <p> {user.Description}</p> */}
                      </div>
                    );
                  } else {
                    return (
                      <div className="px-5 py-2 m-3 bg-black border-r-4 border-b-4 border-t-2 border-l-2 border-green-600 rounded-lg ">
                        <p>
                          {" "}
                          You received ₹{user.amount} from {user.friendName} (
                          {user.friendEmail})
                          <br />
                          {user.message == "" ? null : (
                            <p>Message: {user.message}</p>
                          )}
                        </p>
                        {/* <p> ₹ {user.Amount}</p>
                      <p> {user.Description}</p> */}
                      </div>
                    );
                  }
                })}
                {/* Display each data in array in a card */}
                {/* Each card must have a 'key' attribute */}
              </div>
            </div>
            {/* <ul>
            {friendHistory.map(transaction => {
              <li key={transaction.friend}>{transaction.friend} {transaction.amount}</li>
            })}
            </ul> */}
          </div>
        </div>
      </main>
      <Footer />
    </GlobalProvider>
  );
}

export default App;
