import React from "react";
import { Graph } from "react-d3-graph";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
// import { Header } from 'components/Header';
// import { IncomeExpenses } from 'components/IncomeExpenses';
import { GroupHistory } from "../components/groups-component/GroupHistory";

// import { TransactionList } from 'components/TransactionList';
// import { AddRequest } from '../components/AddRequest';
import { AddGroupTransaction } from "../components/groups-component/AddGroupTransaction";
import Checkbox from "../components/groups-component/Checkbox";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { GlobalProvider } from "context/GlobalState";
import { SettleUp } from "../components/groups-component/GroupSettle";
import { Transaction } from "@/components/Transaction";

//import 'pages/App.css';

function App() {
  const [group, setGroup] = useState([]);
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [simplifiedTransactions, setSimplifiedTransactions] = useState([]);
  const [inputGraphConfig, setInputGraphConfig] = useState({});
  const [outputGraphData, setOutputGraphData] = useState({});
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("₹");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const keys = ["name", "email"];
  var groupID;
  const config = {
    freezeAllDragEvents: true,
    // nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      fontColor: "white",
      highlightStrokeColor: "blue",
      fontSize: 16,
    },
    link: {
      color: "white",
      fontColor: "white",
      highlightColor: "lightblue",
      renderLabel: true,
      labelProperty: "amount",
      fontSize: 16,
    },
    directed: true,
    height: 1000,
    width: 1000,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (amount == 0) {
      window.alert("Transaction amount cannot be 0");
    } else {
      const url = window.location.href;
      const searchParam = new URLSearchParams(window.location.search);
      const gid = searchParam.get("id");
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
      } else {
        const res = await fetch("http://localhost:1337/api/addExpenseToGroup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            groupID: gid,
            amount: amount,
            message: text,
            returners: isCheck,
          }),
        });
        const data = await res.json();
        if (data.status == "error") {
          alert("Please select atleast on returner");
        } else window.location.href = url;
      }
    }
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(members?.map((li) => li.email));
    if (isCheckAll) setIsCheck([]);
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const Member = members?.map((Member_List) => {
    return (
      <>
        <div className="flex flex-nowrap items-center border-r-2 border-b-2 border-t-1 border-l-1 border-blue-300 bg-black mx-2 px-1 my-1 rounded-lg">
          <Checkbox
            key={Member_List.email}
            type="checkbox"
            name={Member_List.name}
            id={Member_List.email}
            handleClick={handleClick}
            isChecked={isCheck.includes(Member_List.email)}
            // className="bg-gray-300"
          />
          <p className=" ml-2 mr-5 inline-block whitespace-nowrap">
            {" "}
            {Member_List.name}{" "}
          </p>
        </div>
      </>
    );
  });

  const randomPosition = () => ({
    x: Math.random() * 1000,
    y: Math.random() * 1000,
  });
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  async function settleDues(person2, amount) {
    const searchParam = new URLSearchParams(window.location.search);
    const gid = searchParam.get("id");
    // console.log(gid,amount,person2);
    const res = await fetch("http://localhost:1337/api/addExpenseToGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        groupID: gid,
        amount: amount,
        message: "Dues Settled",
        returners: [person2],
      }),
    });
    const data = await res.json();
    if (data.status == "error") window.location.href = "/";
    window.location.reload();
  }
  const fetchUserData = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const groupID = searchParams.get("id");
    fetch("http://localhost:1337/api/getParticularGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: groupID,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == "error") window.location.href = "/";
        else {
          setGroup(data.group);
          setMembers(data.group.members);
          setExpenses(data.group.expenses.reverse());
          setSimplifiedTransactions(data.simplifiedTransactions);
          let increment = 0;
          let vertices = data.group.members.length;
          setOutputGraphData({
            nodes: data.group.members.map((item) => {
              const x =
                450 +
                (7.0 / 9.0) *
                  450 *
                  Math.cos((2 * Math.PI * increment) / vertices);
              const y =
                450 +
                (7.0 / 9.0) *
                  450 *
                  Math.sin((2 * Math.PI * increment) / vertices);
              increment += 1;
              return {
                id: item.email.split("@")[0],
                x,
                y,
              };
            }),
            links: data.simplifiedTransactions.map(
              ({ person1, person2, amount }) => ({
                source: person1.split("@")[0],
                target: person2.split("@")[0],
                amount: "Rs." + amount.toFixed(2),
              })
            ),
          });
          setInputGraphConfig(config);
        }
      });
  };

  // const generateNodes = async () => members.map(item => ({ id: item.email }));
  // const generateOutputLinks = async (items) => items.map(({ person1, person2, amount }) => ({ source: person1, target: person2, amount }));

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
          <div className="w-1/3 flex flex-col bg-gray-700 items-center p-7 m-5 mx-auto rounded-2xl shadow-2xl h-screen">
            {/* <Balance/> */}
            {/* <IncomeExpenses/> */}
            {/* <Members /> */}
            <div>
              <h3
                className="text-2xl font-bold text-gray-300 m-2"
                style={{ borderBottom: "thick solid gray" }}
              >
                {group.title}
              </h3>
              {/* <form>
              <input
                className="search w-80 text-center border-2 border-gray-600 bg-gray-100 m-1 p-1 text-black rounded-full"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              /> */}
              <div className="overflow-auto " style={{ height: "580px" }}>
                {members.map((member) => {
                  return (
                    <button
                      className="px-5 py-2 m-1 bg-black border-r-4 border-b-4 border-t-2 border-l-2 border-blue-300 rounded-lg w-30"
                      style={{ width: "320px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(member.email);
                        alert("Email Copied to Clipboard");
                      }}
                    >
                      <p>
                        {member.name} ({member.email})
                      </p>
                    </button>
                  );
                })}
                <button
                  class="rounded-full w-15 py-0.5 px-3 m-1 mt-5 text-white bg-blue-400"
                  onClick={() =>
                    (window.location.href =
                      "./add-member/?id=" + `${group._id}`)
                  }
                >
                  {" "}
                  Add Members{" "}
                </button>
              </div>

              {/* </form> */}
            </div>
          </div>
          <div className="w-1/3 flex flex-col  bg-gray-700 p-7 m-5 rounded-2xl shadow-2xl h-screen">
            {/* <AddGroupTransaction /> */}
            <h3
              className="text-2xl font-bold text-gray-300 m-2"
              style={{ borderBottom: "thick solid gray" }}
            >
              Add Group Transaction
            </h3>
            <form onSubmit={onSubmit} className="h-64">
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
              <div className="flex justify-center border-r-2 border-b-2 border-t-1 border-l-1 border-blue-300 bg-black mx-2 px-1 my-1 rounded-lg">
                <Checkbox
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  handleClick={handleSelectAll}
                  isChecked={isCheckAll}
                />
                <div className="ml-2 mr-5">Select All</div>
              </div>
              <div className=" overflow-x-scroll ">
                <div className="flex flex-row">{Member}</div>
              </div>
              <button className="btn btn-custom btn-lg page-scroll">
                Add Group transaction
              </button>
            </form>
            {/* <SettleUp /> */}
            <h3
              className="text-2xl font-bold text-gray-300 m-2 mt-6"
              style={{ borderBottom: "thick solid gray" }}
            >
              Settle Up
            </h3>
            <div className="item-center m-2 p-3 overflow-auto max-h-72">
              <ul className="list flex flex-col justify-center item-center">
                {simplifiedTransactions.map((transaction) => {
                  if (transaction.Amount < 0) {
                    return (
                      <div className="users flex items-center bg-black p-1 w-100 m-1 min-w-0 border-r-4 border-b-4 border-t-2 border-l-2 border-blue-300 rounded-lg">
                        <p className="justify-start w-60 items-center text-red">
                          {" "}
                          You owe {friend.name} ₹ {friend.Amount}{" "}
                        </p>
                        <div className="text-right">
                          <button class="rounded-full w-15 py-0.5 px-3 m-1 text-white  bg-purple-400 ">
                            {" "}
                            Settled{" "}
                          </button>
                        </div>
                        {/* <p> {user.Amount}</p>
                        <p> {user.Description}</p> */}
                      </div>
                    );
                  } else {
                    return (
                      <div className="users flex items-center bg-black p-1 w-100 m-1 min-w-0 border-r-4 border-b-4 border-t-2 border-l-2 border-blue-300 rounded-lg">
                        <p className="justify-start w-60 items-center">
                          {" "}
                          {transaction.person1 == localStorage.getItem("user")
                            ? "You"
                            : members.find((item) => {
                                return item.email === transaction.person1;
                              }) !== undefined
                            ? members.find((item) => {
                                return item.email === transaction.person1;
                              }).name
                            : null}{" "}
                          {transaction.person1 == localStorage.getItem("user")
                            ? "owe"
                            : "owes"}{" "}
                          {members.find((item) => {
                            return item.email === transaction.person1;
                          }) !== undefined
                            ? members.find((item) => {
                                return item.email === transaction.person2;
                              }).name
                            : null}{" "}
                          ₹ {transaction.amount}{" "}
                        </p>
                        <div className="text-right">
                          {transaction.person1 !=
                          localStorage.getItem("user") ? null : (
                            <button
                              class="rounded-full w-15 py-0.5 px-3 m-1 text-white bg-purple-400"
                              onClick={() =>
                                settleDues(
                                  transaction.person2,
                                  transaction.amount
                                )
                              }
                            >
                              {" "}
                              Settle{" "}
                            </button>
                          )}
                        </div>
                        {/* <p> {user.Amount}</p>
                        <p> {user.Description}</p> */}
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          <div className="w-1/3 flex p-7 m-5 bg-gray-700 mx-auto justify-center rounded-2xl shadow-2xl h-screen">
            {/* <GroupHistory /> */}
            <div className="App">
              <h3
                className="text-2xl font-bold text-gray-300 m-2 "
                style={{ borderBottom: "thick solid gray" }}
              >
                Group History
              </h3>
              {/* Iterate over imported array in userData */}
              <div className="users h-5/6 overflow-auto">
                {expenses.map((expense, index) => (
                  <div
                    key={index}
                    className="px-5 py-2 m-3 bg-black border-r-4 border-b-4 border-t-2 border-l-2 border-blue-300 rounded-lg"
                  >
                    <p>
                      {" "}
                      {expense.payer.name} paid ₹ {expense.Amount} to{" "}
                    </p>
                    {expense.returners.map((returner, returner_index) => (
                      <span key={`${index}-${returner_index}`}>
                        {returner.name}
                        <br />
                      </span>
                    ))}
                    <p>
                      {" "}
                      {expense.Message == "" ? null : (
                        <p>Message: {expense.Message}</p>
                      )}
                    </p>
                  </div>
                ))}

                {/* Display each data in array in a card */}
                {/* Each card must have a 'key' attribute */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-gray-700 p-7 m-5 mx-auto rounded-2xl shadow-2xl">
          <div>
            <h3
              className="text-2xl font-bold text-gray-300 m-2"
              style={{ textDecoration: "underline", marginTop: "30px" }}
            >
              Graph
            </h3>
            <h5 className="m-2 text-gray-300">Drag nodes as desired</h5>
            {Object.keys(outputGraphData).length &&
            Object.keys(inputGraphConfig).length ? (
              <>
                {/* <br/><br/> */}
                <div className=" border-2">
                  <Graph
                    id="graph-id" // id is mandatory
                    data={outputGraphData}
                    config={inputGraphConfig}
                  />
                </div>
                {/* <br/><br/> */}
              </>
            ) : null}
          </div>
          {/* <br/><br/><br/><br/> */}
        </div>
      </main>
      <Footer />
    </GlobalProvider>
  );
}

export default App;
