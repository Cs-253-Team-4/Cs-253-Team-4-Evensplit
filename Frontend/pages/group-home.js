import React from "react";
import ContactCard from "../components/groups-component/ContactCard";
import groups from "../components/groups-component/groups";
import Navbar from "../components/Navbar";
// import MakeCards from "./MakeCards";
// import Avatar from "./Avatar";

// const nam = contacts;

function App() {
  return (

    <div>
      <Navbar></Navbar>
      <h1 className="heading">My Groups</h1>
      {/* <div className="card-container">{groups.map(ContactCard)}</div> */}
      <ContactCard/>
      {/* //   <Avatar imgsrc="https://media.licdn.com/dms/image/C5603AQEWw0FH_H6RCw/profile-displayphoto-shrink_800_800/0/1517580260726?e=2147483647&v=beta&t=aNMOb_GobO695V_7He-GNXay-K6apDPjEuWWg3sJSIg" /> */}
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


