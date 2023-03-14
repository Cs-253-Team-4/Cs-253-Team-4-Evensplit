import React, {useState, useContext} from 'react';
import Avatar from "./Avatar";
import Detail from "./Detail";
import groups from './groups';
import Name from "./Name";


export const ContactCard = () => {
  //key, name, imgURL, balance, email

  const [query , setQuery] = useState("");
    const keys = ["name"];
    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
        );
    };

  return (
    <div>
      <form className='flex justify-center mt-3 pt-5'>
          <input className="search w-80 content-center text-center border-2 border-gray-600 bg-gray-100 mb-0 mt-3 p-1 text-black rounded-full" placeholder="Search..." onChange={(e) => setQuery(e.target.value.toLowerCase())} />
      </form>
      <div className='overflow-auto card-container'>
        {search(groups).map((props) => (
          <div className="card-box">
          <a href="./particular-group">
            <button className="card">
              <div className="top">
                {/* <p>{props.keyy}</p> */}
                <Name name={props.name} />
                <Avatar imgURL={props.imgURL} />
              </div>
              <Detail balance={props.balance} email={props.email} />
            </button>
          </a>
        </div>
        ))}
      </div>
    </div>
  );
}

export default ContactCard;
