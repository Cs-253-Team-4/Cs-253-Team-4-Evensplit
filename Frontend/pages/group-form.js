import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { Users } from "../components/UserList1";

var temp = [];
// const [arr, setArr] = useState(temp);

async function append_arr(item) {
  temp.push(item);
  //   setArr(temp);
  console.log(temp);
  return (
    <div>
      <div key={item.id}>
        <p> {item.first_name}</p>
      </div>
    </div>
  );
}

export const GroupForm = () => {
  const [group, setGroup] = useState("");
  const [member, setMember] = useState("");
  const [query, setQuery] = useState("");
  const [Users, setUsers] = useState([]);
  const [Selected, setSelected] = useState([]);
  const [ClassName, setClassName] = useState([]);

  const keys = ["name", "email"];
  const search = (data) => {
    return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(member))
    );
  };
  const createGroup = async (e) => {
    var i;
    for(i=0;i<Selected.length;i++){
      if(Selected[i] == 1) append_arr(Users[i]);
    }
    e.preventDefault();
    const token = localStorage.getItem('token');
    if(!token){
      window.location.href = ('/');
    }
    else{
      const res = await fetch('http://localhost:1337/api/createGroup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
          },
          body: JSON.stringify({
              title: group,
              members: temp,
          }),
      });
      const data = await res.json();
      if(data.status == 'error') window.location.href="/"
      window.location.href = ('/group-home');
    }
  }
  const fetchUserData = async () => {
    fetch('http://localhost:1337/api/getUsers', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        }
    }).then(res => {
      return res.json()
    }).then(data => {
      if(data.status == 'error') window.location.href="/"
      setUsers(data.users)
      var temp_arr = [];
      var temp_arr2 = [];
      var i;
      for(i=0;i<data.users.length;i++){
        temp_arr.push(0);
        temp_arr2.push("px-5 py-2 m-1 border-r-4 border-b-4 border-t-2 border-l-2 border-blue-400 rounded-lg w-80 bg-gray-900");
      }
      setSelected(temp_arr);
      setClassName(temp_arr2);
    })
  }
  useEffect(() => {
    if(window.localStorage.getItem('token') == null || window.localStorage.getItem('user') == null) window.location.href="/"
    else fetchUserData()
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center">
      <h3
        className="text-2xl font-bold text-gray-300 m-2 text-center"
        style={{ borderBottom: "thick solid gray", textAlign: "center", width: "75%" }}
      >
        Add Group
      </h3>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
      <div className="justify-center flex" style={{width: "75%"}}>
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
          {/* <MemberSearch /> */}
          {/* <input
            className="search w-80 text-center border-2 border-gray-600 bg-gray-100 m-1 p-1 text-black rounded-full"
            placeholder="Search..."
            // onChange={(e) => setQuery(e.target.value.toLowerCase())}
          /> */}
          <div className="overflow-auto h-64">
            {search(Users).map((item,index) => (
              localStorage.getItem('user') == item.email ? null :
              <button 
                type="button" // add this attribute
                key={item.email}
                className={ClassName[Users.indexOf(item)]}
                onClick={(e) => {
                  e.preventDefault();
                  if(Selected[Users.indexOf(item)] == 1){
                    setClassName([...ClassName.slice(0,Users.indexOf(item)),"px-5 py-2 m-1 border-r-4 border-b-4 border-t-2 border-l-2 border-blue-400 rounded-lg w-80 bg-gray-900",...ClassName.slice(Users.indexOf(item)+1)]);
                    setSelected([...Selected.slice(0,Users.indexOf(item)),0,...Selected.slice(Users.indexOf(item)+1)]);
                  }
                  else{
                    setClassName([...ClassName.slice(0,Users.indexOf(item)),"px-5 py-2 m-1 border-r-4 border-b-4 border-t-2 border-l-2 border-gray-100 rounded-lg w-80 bg-green-300 text-black",...ClassName.slice(Users.indexOf(item)+1)]);
                    setSelected([...Selected.slice(0,Users.indexOf(item)),1,...Selected.slice(Users.indexOf(item)+1)]);
                  }
                }}
              >
                <p> {item.name}</p>
                <p> {item.email}</p>
              </button>
            ))}
          </div>

          {/* {selectedMember && (
            <div className="m-2">
              <h3 className="text-2xl font-bold text-gray-500">
                Selected Member
              </h3>
              <p>{selectedMember.first_name}</p>
            </div>
          )} */}
        </div>
        <div className="form-control align-center justify-center flex m-1">
          {/* <label htmlFor="text" className='mr-3'>Text</label> */}
          {/* <input type="date" name="Date" className='text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-1.5 pl-5 mb-2'/> */}
        </div>
        <button className="btn btn-custom btn-lg page-scroll">
        Submit
        </button>
        <button className="btn btn-custom btn-lg page-scroll" onClick={(e) => {e.preventDefault(); window.location.href = './group-home'}}>
          Cancel
        </button>
      </form>
      </div>
      </div>
      <Footer/>

      {/* {console.log(item)} */}
    </>
  );
};

export default GroupForm;
