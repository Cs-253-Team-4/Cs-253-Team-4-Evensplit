import React from "react";
import { useState, useEffect } from "react";
// import { Users } from "../components/UserList1";

var temp = [];
// const [arr, setArr] = useState(temp);

function append_arr(item) {
  temp.push(item);
  console.log(temp);
}

export const GroupForm = () => {
  const [group, setGroup] = useState("");
  const [member, setMember] = useState("");
  const [query, setQuery] = useState("");
  const [Users, setUsers] = useState([]);

  const keys = ["name", "email"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(member))
    );
  };
  const createGroup = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      const res = await fetch("http://localhost:1337/api/createGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          title: group,
          members: temp,
        }),
      });
      const data = await res.json();
      window.location.href = "/group-home";
    }
  };
  const fetchUserData = async () => {
    fetch("http://localhost:1337/api/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data.users);
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <h3
        className="text-2xl font-bold text-gray-500 m-2 text-center"
        style={{ borderBottom: "thick solid gray" }}
      >
        Add Group
      </h3>
      <div className="flex">
        <form onSubmit={createGroup}>
          <div className="form-control align-center justify-center flex m-2">
            {/* <label htmlFor="text" className='mr-3'>Text</label> */}
            <input
              className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-5 mb-2"
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="Group Name"
              required
            />
          </div>

          <div className="form-control align-center justify-center flex m-2">
            <input
              className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-5 mb-2"
              type="text"
              value={member}
              onChange={(e) => setMember(e.target.value.toLowerCase())}
              placeholder="Search User"
            />
          </div>

          <div className="flex justify-center mt-3 pt-5">
            <div className="overflow-auto h-48">
              {search(Users).map((item) =>
                localStorage.getItem("user") == item.email ? null : (
                  <button
                    type="button" // add this attribute
                    key={item.email}
                    className="px-5 py-2 m-1 border-r-4 border-b-4 border-t-2 border-l-2 border-blue-400 rounded-lg w-80 bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      append_arr(item);
                    }}
                  >
                    <p> {item.name}</p>
                    <p> {item.email}</p>
                  </button>
                )
              )}
            </div>
          </div>

          <div class="flex justify-center gap-8 m-3">
            <button class="flex justify-center items-center bg-purple-500 hover:bg-purple-600 focus:ring-purple-500 rounded-full w-1/3 text-white text-lg m-3 p-3 uppercase font-bold">
              Submit
            </button>
            <button
              class="bg-purple-500 hover:bg-purple-600 focus:ring-purple-500 rounded-full w-1/3 text-white text-lg m-3 p-3 uppercase font-bold"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "./group-home";
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* {console.log(item)} */}
    </>
  );
};

export default GroupForm;
