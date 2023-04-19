import React from "react";
import { useState, useEffect } from "react";
import { Header } from "components/Header";
import { Balance } from "components/Balance";
import { IncomeExpenses } from "components/IncomeExpenses";
import { Transaction } from "@/components/Transaction";
import { AddTransaction } from "components/AddTransaction";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GlobalContext } from "../context/GlobalState";

import { GlobalProvider } from "context/GlobalState";
import color from "@material-ui/core/colors/amber";

// import 'pages/App.css';

function moneyFormatter(num) {
  let p = Number(num).toFixed(2).split(".");
  return (
    "₹ " +
    (p[0].split("")[0] === "-" ? "-" : "") +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "")
  );
}

const App = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState([]);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const fetchUserData = () => {
    fetch("http://localhost:1337/api/getPersonalExpenseHistory", {
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
        setUsers(data.personalExpenseHistory.reverse());
        const amounts = data.personalExpenseHistory.map((transaction) =>
          Number(transaction.Amount)
        );
        setTotal(amounts.reduce((acc, item) => (acc += item), 0));
        setIncome(
          amounts
            .filter((item) => item > 0)
            .reduce((acc, item) => (acc += item), 0)
        );
        setExpense(
          amounts
            .filter((item) => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
        );
      });
  };

  useEffect(() => {
    if (
      window.localStorage.getItem("token") == null ||
      window.localStorage.getItem("user") == null
    ) {
      window.location.href = "/";
    } else fetchUserData();
  }, []);

  return (
    <GlobalProvider>
      <Navbar></Navbar>
      <Header />
      <main className="flex flex-col flex-1 text-center m-10">
        <div className="flex">
          <div className="w-1/3 bg-gray-700 justify-center flex p-7 m-5 rounded-2xl shadow-2xl">
            <div>
              {/* <Balance /> */}
              {/* <IncomeExpenses /> */}
              <div
                className="flex justify-center text-xl font-semibold text-gray-300"
                style={{ borderBottom: "thick solid gray" }}
              >
                <h1>Your Balance {moneyFormatter(total)}</h1>
              </div>
              <div
                className="inc-exp-container justify-center flex align-center"
                style={{
                  backgroundColor: "#111111",
                  borderWidth: "2px",
                  borderColor: "#999999",
                  borderRadius: "20px",
                }}
              >
                <div>
                  <p
                    className="money plus p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    Income <br></br>
                    {moneyFormatter(income)}
                  </p>
                </div>
                <div>
                  <p
                    className="money minus p-3"
                    style={{ backgroundColor: "#111111" }}
                  >
                    Expense <br></br>
                    {moneyFormatter(expense)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 bg-gray-700 flex flex-col p-7 m-5 rounded-2xl shadow-2xl">
            <AddTransaction />
          </div>
          <div
            className="w-1/3 flex pu-7 m-5 bg-gray-700 justify-center rounded-2xl shadow-2xl "
            style={{ height: "580px" }}
          >
            <div className="justify-end m-2 p-3">
              <h3
                className="text-2xl font-bold text-gray-300 m-2"
                style={{ borderBottom: "thick solid gray" }}
              >
                History
              </h3>
              <ul
                className="list overflow-y-auto"
                style={{ textAlign: "left", width: "300px", height: "480px" }}
              >
                {/* {tempdata.map(transaction => (<Transaction key={transaction.Title} transaction={transaction} />))} */}
                {users.map((user) => (
                  <li
                    className={
                      user.Amount < 0
                        ? "px-5 py-2 m-3 border-r-4 border-b-4 border-t-2 border-l-2 border-red-600 rounded-lg"
                        : "px-5 py-2 m-3 border-r-4 border-b-4 border-t-2 border-l-2 border-green-600 rounded-lg"
                    }
                    style={{ backgroundColor: "black", color: "white" }}
                    key={user.Time}
                  >
                    ₹ {Math.abs(user.Amount)} <br />
                    {user.Title} <br />
                    {new Date(user.Time).toLocaleDateString("en-GB")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </GlobalProvider>
  );
};

export default App;
