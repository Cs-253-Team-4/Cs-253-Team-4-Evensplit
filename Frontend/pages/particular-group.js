import React from "react";
import { Graph } from 'react-d3-graph'
import {Grid} from '@material-ui/core';
import { useState, useEffect } from 'react';
// import { Header } from 'components/Header';
// import { IncomeExpenses } from 'components/IncomeExpenses';
import { GroupHistory } from "../components/groups-component/GroupHistory";

// import { TransactionList } from 'components/TransactionList';
// import { AddRequest } from '../components/AddRequest';
import { AddTransaction } from "../components/AddTransaction";
import Navbar from "../components/Navbar";

import { GlobalProvider } from "context/GlobalState";
import { SettleUp } from "../components/groups-component/GroupSettle";
import { Transaction } from "@/components/Transaction";

//import 'pages/App.css';

function App() {    
  const [group, setGroup] = useState([]);
  const [members, setMembers] = useState([]);   
  const [expenses, setExpenses] = useState([]);   
  const [simplifiedTransactions, setSimplifiedTransactions] = useState([]);   
  const [inputGraphConfig, setInputGraphConfig] = useState({})
  const [outputGraphData, setOutputGraphData] = useState({})
  const keys = ["name", "email"];
  const config = {
    freezeAllDragEvents: true,
    nodeHighlightBehavior: true,
    node: {
      color: "lightblue",
      highlightStrokeColor: "blue",
      fontSize: 18,
    },
    link: {
      highlightColor: "lightblue",
      renderLabel: true,
      labelProperty: "amount",
      fontSize: 18,
    },
    directed: true,
    height: 1000,
    width: 1000,
    // d3: {
    //   force: {
    //     x: 30,
    //     y: 30,
    //     z: 0.05
    //   }
    // }
    // automaticRearrangeAfterDropNode: true,
    // collapsible: true,
    // height: 700,
    // width: '100%',
    // highlightDegree: 1,
    // highlightOpacity: 1,
    // linkHighlightBehavior: false,
    // maxZoom: 8,
    // minZoom: 0.1,
    // focusZoom: 1,
    // focusAnimationDuration: 0.75,
    // nodeHighlightBehavior: false,
    // panAndZoom: false,
    // staticGraph: false,
    // d3: {
    //   alphaTarget: 0.05,
    //   gravity: -100,
    //   linkLength: 100,
    //   linkStrength: 1
    // },
    // node: {
    //   color: '#d3d3d3',
    //   fontColor: 'black',
    //   fontSize: 8,
    //   fontWeight: 'normal',
    //   highlightColor: 'SAME',
    //   highlightFontSize: 8,
    //   highlightFontWeight: 'normal',
    //   highlightStrokeColor: 'SAME',
    //   highlightStrokeWidth: 1.5,
    //   labelProperty: 'id',
    //   mouseCursor: 'pointer',
    //   opacity: 1,
    //   renderLabel: true,
    //   size: 200,
    //   strokeColor: 'none',
    //   strokeWidth: 1.5,
    //   svg: '',
    //   symbolType: 'circle',
    //   viewGenerator: null
    // },
    // link: {
    //   color: '#d3d3d3',
    //   highlightColor: '#d3d3d3',
    //   mouseCursor: 'pointer',
    //   opacity: 1,
    //   semanticStrokeWidth: false,
    //   renderLabel: true,
    //   labelProperty: 'amount',
    //   strokeWidth: 1.5,
    //   type: 'STRAIGHT'
    // },
    // directed: true
  }; 
  const randomPosition = () => ({
    x: Math.random() * 1000,
    y: Math.random() * 1000,
  });
  const search = (data) => {
    return data.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(query))
      );
  };
  const fetchUserData = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const groupID = searchParams.get('id');
    fetch('http://localhost:1337/api/getParticularGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      body: JSON.stringify({
          'id': groupID,
      }),
    }).then(res => {
      return res.json()
    }).then(data => {
      setGroup(data.group);
      setMembers(data.group.members);
      setExpenses(data.group.expenses.reverse());
      setSimplifiedTransactions(data.simplifiedTransactions);
      setOutputGraphData({nodes : data.group.members.map(item => ({ id: item.email, x: Math.random(), y: Math.random() })), links: data.simplifiedTransactions.map(({ person1, person2, amount }) => ({ source: person1, target: person2, amount }))});
      setInputGraphConfig(config);
    })
  }

  // const generateNodes = async () => members.map(item => ({ id: item.email }));
  // const generateOutputLinks = async (items) => items.map(({ person1, person2, amount }) => ({ source: person1, target: person2, amount }));
  
  useEffect(() => {
    fetchUserData()
  }, [])
  
  return (
    <GlobalProvider>
      <Navbar></Navbar>
      <main className="flex flex-col flex-1 text-center m-5">
        <div className="flex">
          <div className="w-1/3 flex flex-col items-center p-7 m-5 mx-auto rounded-2xl shadow-2xl">
            {/* <Balance/> */}
            {/* <IncomeExpenses/> */}
            {/* <Members /> */}
            <div>
            <h3
              className="text-2xl font-bold text-gray-500 m-2"
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
            <div className="users overflow-auto h-96 w-96">
                {members.map((member) => {
                  return (
                    <div className="px-5 py-2 m-3 border-r-4 border-b-4 border-t-2 border-l-2 border-cyan-500 rounded-lg">
                      <p>{member.name} ({member.email})</p>
                    </div>
                  );
                })}
              </div>
              
              {/* </form> */}
            </div>
          </div>
          <div className="w-1/3 flex flex-col p-7 m-5 rounded-2xl shadow-2xl">
            <AddTransaction />
            {/* <SettleUp /> */}
            <h3
              className="text-2xl font-bold text-gray-500 m-2 mt-10"
              style={{ borderBottom: "thick solid gray" }}
            >
              Settle Up
            </h3>
            <div className="item-center m-2 p-3 overflow-auto max-h-64">
              <ul className="list flex flex-col justify-center item-center">
                {simplifiedTransactions.map((transaction) => {
                  if (transaction.Amount < 0) {
                    return (
                      <div className="users flex items-center p-1 w-100 m-1 min-w-0 border-r-4 border-b-4 border-t-2 border-l-2 border-gray-600 rounded-lg">
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
                      <div className="users flex items-center p-1 w-100 m-1 min-w-0 border-r-4 border-b-4 border-t-2 border-l-2 border-gray-600 rounded-lg">
                        <p className="justify-start w-60 items-center">
                          {" "}
                          {members.find((item) => {return item.email === transaction.person1;}) !== undefined ? members.find((item) => {return item.email === transaction.person1;}).name : null} owes {members.find((item) => {return item.email === transaction.person1;}) !== undefined ? members.find((item) => {return item.email === transaction.person2;}).name : null} ₹ {transaction.amount}{" "}
                        </p>
                        <div className="text-right">
                          <button class="rounded-full w-15 py-0.5 px-3 m-1 text-white bg-purple-400 ">
                            {" "}
                            Settled{" "}
                          </button>
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
          <div className="w-1/3 flex p-7 m-5 mx-auto justify-center rounded-2xl shadow-2xl">
            {/* <GroupHistory /> */}
            <div className="App">
              <h3
                className="text-2xl font-bold text-gray-500 m-2"
                style={{ borderBottom: "thick solid gray" }}
              >
                Group History
              </h3>
              {/* Iterate over imported array in userData */}
              <div className="users overflow-auto h-3/4 w-96">
                {expenses.map((expense, index) => (
                  <div key={index} className="px-5 py-2 m-3 border-r-4 border-b-4 border-t-2 border-l-2 border-gray-600 rounded-lg">
                      <p>
                        {" "}
                        {expense.payer.name} paid ₹ {expense.Amount} to {" "}
                      </p>
                    {expense.returners.map((returner, returner_index) => (
                      
                      <span key={`${index}-${returner_index}`}>{returner.name}<br /></span>
                    ))}
                      <p>
                        {" "}
                        Message : {expense.Message}
                      </p>
                  </div>
                ))}

                {/* Display each data in array in a card */}
                {/* Each card must have a 'key' attribute */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/3 flex flex-col items-center p-7 m-5 mx-auto rounded-2xl shadow-2xl">
            <Grid container>
              <Grid item>
              <br/><br/><br/><br/>
              { 
                Object.keys(outputGraphData).length && Object.keys(inputGraphConfig).length ? (
                  <>
                    <br/><br/>
                    <Graph
                      id="graph-id" // id is mandatory
                      data={outputGraphData}
                      config={inputGraphConfig}
                    />
                    <br/><br/>
                  </>
                ) : null
              }
              </Grid>
              </Grid>
              </div>
      </main>
    </GlobalProvider>
  );
}

export default App;
