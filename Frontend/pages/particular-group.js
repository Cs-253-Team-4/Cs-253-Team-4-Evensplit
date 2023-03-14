import React from "react";
// import { Header } from 'components/Header';
import { Members } from "../components/groups-component/Members";
// import { IncomeExpenses } from 'components/IncomeExpenses';
import { GroupHistory } from "../components/groups-component/GroupHistory";

// import { TransactionList } from 'components/TransactionList';
// import { AddRequest } from '../components/AddRequest';
import { AddTransaction } from "../components/AddTransaction";
import Navbar from "../components/Navbar";

import { GlobalProvider } from "context/GlobalState";
import { SettleUp } from "../components/groups-component/GroupSettle";

//import 'pages/App.css';

function App() {
  return (
    <GlobalProvider>
      <Navbar></Navbar>
      <main className="flex flex-col flex-1 text-center m-5">
        <div className="flex">
          <div className="w-1/3 flex flex-col items-center p-7 m-5 mx-auto rounded-2xl shadow-2xl">
            {/* <Balance/> */}
            {/* <IncomeExpenses/> */}
            <Members />
          </div>
          <div className="w-1/3 flex flex-col p-7 m-5 rounded-2xl shadow-2xl">
            <AddTransaction />
            <SettleUp />
          </div>
          <div className="w-1/3 flex p-7 m-5 mx-auto justify-center rounded-2xl shadow-2xl">
            <GroupHistory />
          </div>
        </div>
      </main>
    </GlobalProvider>
  );
}

export default App;
