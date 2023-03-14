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
import { FriendListDisplay } from "@/components/PendingListDisplay";

//import 'pages/App.css';

function App() {
  return (
    <GlobalProvider>
      <Navbar></Navbar>
      <Header />
      <main className="flex flex-col flex-1 text-center m-5">
        <div className="flex">
          <div className="w-1/3 flex flex-col p-7 my-5 mx-auto rounded-2xl shadow-2xl">
            {/* <Balance/> */}
            {/* <IncomeExpenses/> */}
            <FriendListDisplay />
          </div>
          <div className="w-1/3 flex flex-col p-10 m-3 rounded-2xl shadow-2xl">
            <AddTransaction />
          </div>
          <div className="w-1/3 flex pu-7 mu-5 mr-5 justify-center rounded-2xl shadow-2xl"></div>
        </div>
      </main>
    </GlobalProvider>
  );
}

export default App;
