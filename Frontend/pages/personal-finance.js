import React from "react";
import { useState, useEffect } from 'react';
import { Header } from "components/Header";
import { Balance } from "components/Balance";
import { IncomeExpenses } from "components/IncomeExpenses";
import { TransactionList } from "components/TransactionList";
import { Transaction } from "@/components/Transaction";
import { AddTransaction } from "components/AddTransaction";
import Navbar from "../components/Navbar";
import { GlobalContext } from '../context/GlobalState';

import { GlobalProvider } from "context/GlobalState";


// import 'pages/App.css';

function moneyFormatter(num) {
  let p = Number(num).toFixed(2).split('.');
  return (
    '₹ ' + (p[0].split('')[0]=== '-' ? '-' : '') +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '')
  );
}

const App = () => {
  const [users, setUsers] = useState([])    
  const [total, setTotal] = useState([])    
  const [expense, setExpense] = useState([])    
  const [income, setIncome] = useState([])    
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
              setUsers(data.personalExpenseHistory.reverse())
              const amounts = data.personalExpenseHistory.map(transaction => Number(transaction.Amount));
              setTotal(amounts.reduce((acc, item) => (acc += item), 0));
              setIncome(amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0));
              setExpense(amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)*-1);
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
                          {/* <Balance /> */}
                          {/* <IncomeExpenses /> */}
                          <div className='flex justify-center text-xl font-semibold text-gray-500'>
                            <h1>Your Balance {moneyFormatter(total)}</h1>
                          </div>
                          <div className="inc-exp-container justify-center flex align-center">
                            <div>
                              <p className="money plus p-3">Income <br></br>{moneyFormatter(income)}</p>
                            </div>
                            <div>
                              <p className="money minus p-3">Expense <br></br>{moneyFormatter(expense)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3 flex flex-col p-7 m-5 rounded-2xl shadow-2xl">
                        <AddTransaction />
                      </div>
                      <div className="w-1/3 flex pu-7 m-5 justify-center rounded-2xl shadow-2xl">
                      <div className='justify-end m-2 p-3'>
                        <h3 className='text-2xl font-bold text-gray-500 m-2'>History</h3>
                        <ul className="list" style={{textAlign:"center", width:"300px"}}>
                          {/* {tempdata.map(transaction => (<Transaction key={transaction.Title} transaction={transaction} />))} */}
                          {users.map(user => (
                                <li className={user.Amount < 0 ? 'minus' : 'plus'} key={user.Time}>₹  {user.Amount} {user.Title}</li>
                              
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
