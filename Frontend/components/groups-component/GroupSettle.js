import React from "react";
import ReactDOM from "react-dom";
import { FriendListDisplay } from "../PendingListDisplay";
import Groups from "../groups-component/GroupFinalSettlement";

export const SettleUp = () => {
  // const { FriendList } = useContext(GlobalContext);

  return (
    <>
      <h3
        className="text-2xl font-bold text-gray-500 m-2 mt-10"
        style={{ borderBottom: "thick solid gray" }}
      >
        Settle Up
      </h3>
      <div className="item-center m-2 p-3 overflow-auto max-h-64">
        <ul className="list flex flex-col justify-center item-center">
          {Groups().map((friend) => {
            if (friend.Sign === "-") {
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
                    {friend.name} owes you ₹ {friend.Amount}{" "}
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
    </>
  );
};
