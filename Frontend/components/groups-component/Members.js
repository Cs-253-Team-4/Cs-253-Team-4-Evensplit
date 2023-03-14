import React, { useState, useContext } from "react";
// import { GlobalContext } from "../context/GlobalState";

import Group from "./GroupData";

export const Members = () => {
  return (
    <>
      <div>
        <h3
          className="text-2xl font-bold text-gray-500 m-2"
          style={{ borderBottom: "thick solid gray" }}
        >
          Group Name + Photo
        </h3>
        {/* <form>
          <input
            className="search w-80 text-center border-2 border-gray-600 bg-gray-100 m-1 p-1 text-black rounded-full"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          /> */}
        <div className="users overflow-auto h-96 w-96">
          {Group().map((user) => {
            return (
              <div className="px-5 py-2 m-3 border-r-4 border-b-4 border-t-2 border-l-2 border-cyan-500 rounded-lg">
                <p>{user.name}</p>
              </div>
            );
          })}
        </div>
        {/* </form> */}
      </div>
    </>
  );
};
