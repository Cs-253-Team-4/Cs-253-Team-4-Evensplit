import React from "react";
import { useState, useEffect } from 'react';
import ContactCard from "../components/groups-component/ContactCard";
// import groups from "../components/groups-component/groups";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Avatar from "../components/groups-component/Avatar";
import Detail from "../components/groups-component/Detail";
import Name from "../components/groups-component/Name";
// import MakeCards from "./MakeCards";
// import Avatar from "./Avatar";

// const nam = contacts;

function App() {
  const [groups, setGroups] = useState([])   
  const [query , setQuery] = useState("");
  const keys = ["title"]
  const search = (data) => {
      return data.filter((item) =>
          keys.some((key) => item[key].toLowerCase().includes(query))
      );
  }; 
  const fetchUserData = () => {
    fetch('http://localhost:1337/api/getGroups', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        }
    }).then(res => {
      return res.json()
    }).then(data => {
      if(data.status == 'error') window.location.href="/"
      setGroups(data.groups.reverse())
    })
  }

  useEffect(() => {
    if(window.localStorage.getItem('token') == null || window.localStorage.getItem('user') == null) window.location.href="/"
    else fetchUserData()
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <h1 className="heading">My Groups</h1>
      {/* <div className="card-container">{groups.map(ContactCard)}</div> */}
      {/* <ContactCard/> */}
      <div>
        <form className='flex justify-center mt-3 pt-5'>
            <input className="search w-80 content-center text-center border-2 border-gray-600 bg-gray-100 mb-0 mt-3 p-1 text-black rounded-full" placeholder="Search..." onChange={(e) => setQuery(e.target.value.toLowerCase())} />
        </form>
        <div className="card-box opacity-100 flex justify-center">
            <button
              className="card"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "./group-form";
              }}
            >
              <div className="top">
                <Name className="text-xs " name="Create New Group" />
                <Avatar imgURL="https://static.vecteezy.com/system/resources/previews/009/266/327/original/plus-sign-icon-free-png.png" />
              </div>
            </button>
          </div>
        <div className='overflow-auto card-container'>
          {search(groups).map((group) => (
            <div className="card-box">
            {/* <a href="./particular-group"> */}
              <button className="card" onClick={() => window.location.href = './particular-group/?id='+`${group._id}`}>
                <div className="top">
                  {/* <p>{props.keyy}</p> */}
                  <Name name={group.title} />
                  {/* <Avatar imgURL={props.imgURL} /> */}
                  <Avatar imgURL={'https://png.pngtree.com/png-clipart/20190904/original/pngtree-icon-people-group.-icon-people-network.-connection-people-png-image_4459398.jpg'} />
                </div>
                {/* <Detail balance="100" email="yo@;lksad" /> */}
              </button>
            {/* </a> */}
          </div>
          ))}
        </div>
      </div>
      {/* //   <Avatar imgsrc="https://media.licdn.com/dms/image/C5603AQEWw0FH_H6RCw/profile-displayphoto-shrink_800_800/0/1517580260726?e=2147483647&v=beta&t=aNMOb_GobO695V_7He-GNXay-K6apDPjEuWWg3sJSIg" /> */}
      <Footer/>
    </div>

  );
}

export default App;



// import React, {useState, useContext} from 'react'
// import { GlobalContext } from '../context/GlobalState';

// import { Users} from './UserList1'


// export const SearchBar = () => {
//     const [query , setQuery] = useState("");
//     const keys = ["first_name", "last_name", "email"];
//     const search = (data) => {
//         return data.filter((item) =>
//             keys.some((key) => item[key].toLowerCase().includes(query))
//         );
//     };


//     return (
//         <>
//           <div>
//           {/* <h3 className='text-2xl font-bold text-gray-500 m-2' style={{borderBottom:"thick solid gray" }}>Search</h3> */}
//             <form >
//                 <div className="overflow-auto max-h-64 ">
//                     <input className="search w-80 text-center border-2 border-gray-600 bg-gray-100 m-1 p-1 text-black rounded-full" placeholder="Search..." onChange={(e) => setQuery(e.target.value.toLowerCase())} />
//                     {search(Users).map((item) => (
//                         <button key={item.id} className="w-80 px-5 py-2 m-1 bg-cyan-300 rounded-lg hover:bg-blue-700" > 
//                             <p> {item.first_name}</p>
//                             <p> {item.email}</p>
//                         </button>
//                     ))}
//                 </div>
//             </form>
//           </div>
//         </>
//     )
// }


