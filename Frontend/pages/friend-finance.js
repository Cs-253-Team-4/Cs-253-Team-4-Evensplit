import React from "react";
import { Header } from "components/Header";
import { SearchBar } from "components/SearchBar";
import { IncomeExpenses } from "components/IncomeExpenses";
import { History } from "components/History";

// import { TransactionList } from 'components/TransactionList';
import { AddRequest } from "../components/AddRequest";
import { AddTransaction } from "../components/AddTransaction";
import Navbar from "../components/Navbar";

import { GlobalProvider } from "context/GlobalState";
import { PendingListDisplay } from "@/components/PendingListDisplay";

//import 'pages/App.css';

function App() {
  return (
    <GlobalProvider>
      <Navbar></Navbar>

      <main className="flex flex-col flex-1 text-center m-5">
        <div className="flex">
          <div className="w-1/3 flex flex-col p-7 m-5 mx-auto rounded-2xl shadow-2xl h-screen">
            {/* <Balance/> */}
            {/* <IncomeExpenses/> */}
            <SearchBar />
            <PendingListDisplay />
          </div>
          <div className="w-1/3 flex flex-col p-7 m-5 rounded-2xl shadow-2xl h-screen">
            <AddTransaction />
            <AddRequest />
          </div>
          <div className="w-1/3 flex p-7 m-5 mx-auto justify-center rounded-2xl shadow-2xl h-screen">
            <History />
          </div>
        </div>
      </main>
    </GlobalProvider>
  );
}

export default App;
