import React from "react";
import ReactDOM from "react-dom";
import PendingList from "./PendingRequestList";

export const PendingListDisplay = () => {
  // const { FriendList } = useContext(GlobalContext);

  return (
    <>
      <h3
        className="text-2xl font-bold text-gray-500 m-2 mt-10"
        style={{ borderBottom: "thick solid gray" }}
      >
        Pending Requests
      </h3>
      <div className="item-center m-2 p-3 overflow-auto max-h-64">
        <ul className="list flex flex-col justify-center item-center">
          {PendingList().map((friend) => {
            return (
              <div
                className="users flex items-center p-1 text-white w-100 m-1 min-w-0"
                style={{
                  backgroundColor: "rgb(88, 151, 252)",
                  borderRadius: "15px",
                }}
              >
                <p className="justify-start w-60 items-center">
                  {" "}
                  {friend} Requested Rs.100{" "}
                </p>
                <div className="text-right">
                  <button class="rounded-full w-15 py-0.5 px-3 m-1  bg-green-600 ">
                    {" "}
                    Accept{" "}
                  </button>
                  <button class="rounded-full w-15 py-0.5 px-2 m-1 bg-red-600">
                    Decline
                  </button>
                </div>
                {/* <p> {user.Amount}</p>
                <p> {user.Description}</p> */}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
