import React from 'react';
import { Header } from 'components/Header';
import { Balance } from 'components/Balance';
import { IncomeExpenses } from 'components/IncomeExpenses';
import { TransactionList } from 'components/TransactionList';
import { AddTransaction } from 'components/AddTransaction';
import Navbar from "../components/Navbar";

import { GlobalProvider } from 'context/GlobalState';

//import 'pages/App.css';

function App() {
  return (
    <GlobalProvider>
        <Navbar></Navbar>
      <Header/>
      <main className="flex flex-col flex-1 text-center m-10">
      <div className="flex">
        <div className='w-1/3 flex p-7 m-5 rounded-2xl shadow-2xl'>
            <div >
            <Balance/>
            <IncomeExpenses/>
            </div>
        </div>
        <div className='w-1/3 flex p-10 m-3 rounded-2xl shadow-2xl'>
        <AddTransaction />
        </div>
        <div className='w-1/3 flex pu-7 mu-5 mr-5 justify-center rounded-2xl shadow-2xl'>
        <TransactionList />
        </div>  
      </div>
      </main>
    </GlobalProvider>
  );
}

export default App;