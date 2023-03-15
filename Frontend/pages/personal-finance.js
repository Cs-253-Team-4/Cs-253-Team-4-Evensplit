import React from "react";
import { useState, useEffect } from 'react';
import { Header } from "components/Header";
import { Balance } from "components/Balance";
import { IncomeExpenses } from "components/IncomeExpenses";
import { TransactionList } from "components/TransactionList";
import { Transaction } from "@/components/Transaction";
import { AddTransaction } from "components/AddTransaction";
import Navbar from "../components/Navbar";

import { GlobalProvider } from "context/GlobalState";

//import 'pages/App.css';

const App = () => {
  const [users, setUsers] = useState([])    
  const fetchUserData = () => {
    fetch('http://localhost:1337/api/getPersonalExpenseHistory', {
      method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                  }
            }).then(res => {
              return res.json()
            }).then(data => {
              setUsers(data.personalExpenseHistory)
            })
          }
          useEffect(() => {
            fetchUserData()
          }, [])

              return (
                <GlobalProvider>
                  <Navbar></Navbar>
                  <Header />
                  <main className="flex flex-col flex-1 text-center m-10">
                    <div className="flex">
                      <div className="w-1/3 flex p-7 m-5 rounded-2xl shadow-2xl">
                        <div>
                          <Balance />
                          <IncomeExpenses />
                        </div>
                      </div>
                      <div className="w-1/3 flex flex-col p-7 m-5 rounded-2xl shadow-2xl">
                        <AddTransaction />
                      </div>
                      <div className="w-1/3 flex pu-7 m-5 justify-center rounded-2xl shadow-2xl">
                      <div className='justify-end m-2 p-3'>
                        <h3 className='text-2xl font-bold text-gray-500 m-2'>History</h3>
                        <ul className="list">
                          {/* {tempdata.map(transaction => (<Transaction key={transaction.Title} transaction={transaction} />))} */}
                          {users.map(user => (
                            <li key={user.Time}>{user.Title} {user.Amount}</li>
                          ))}
                        </ul>
                      </div>
                      </div>
                    </div>
                  </main>
                </GlobalProvider>
              );
            };       
          
        

        
export default App;
