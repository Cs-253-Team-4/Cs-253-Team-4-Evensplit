import React from "react";
// import { GlobalContext } from '../context/GlobalState';
import ReactDOM from "react-dom";
// import "./styles.css";
// import App from "../pages/friend-financetest"

/**
 * Our data comes from users-data.js
 * -----------------------------
 */
import gtrans from "./GroupHistoryData";

/**
 * Our React component where we display data
 * -----------------------------
 */
export const GroupHistory = () => {
  return (
    <div className="App">
      <h3
        className="text-2xl font-bold text-gray-500 m-2"
        style={{ borderBottom: "thick solid gray" }}
      >
        Group History
      </h3>
      {/* Iterate over imported array in userData */}
      <div className="users overflow-auto h-3/4 w-96">
        {gtrans.map((user) => {
          return (
            <div className="px-5 py-2 m-3 border-r-4 border-b-4 border-t-2 border-l-2 border-gray-600 rounded-lg">
              <p>
                {" "}
                {user.name} paid ₹ {user.Amount} for {user.Description}
              </p>
              {/* <p> ₹ {user.Amount}</p>
              <p> {user.Description}</p> */}
            </div>
          );
        })}
        {/* Display each data in array in a card */}
        {/* Each card must have a 'key' attribute */}
      </div>
    </div>
  );
};

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
