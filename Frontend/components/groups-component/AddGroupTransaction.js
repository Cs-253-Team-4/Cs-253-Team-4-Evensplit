import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "@/context/GlobalState";
import Checkbox from "./Checkbox";

// import Member_List from "./GroupData";

export const AddGroupTransaction = ({groupID}) => {
    console.log(groupID);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("₹");

  const { addTransaction } = useContext(GlobalContext);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const fetchUserData = async () => {
    // fetch('http://localhost:1337/api/getParticularGroup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //       'x-access-token': localStorage.getItem('token'),
    //     },
    //   body: JSON.stringify({
    //       'id': groupID,
    //   }),
    // }).then(res => {
    //   return res.json()
    // }).then(data => {
    //   setList(data.group.members);
    // })
  }

  useEffect(() => {
    fetchUserData()
  },[])

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list?.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const Member = list?.map((Member_List) => {
    return (
      <>
        <Checkbox
          key={Member_List.id}
          type="checkbox"
          name={Member_List.name}
          id={Member_List.id}
          handleClick={handleClick}
          isChecked={isCheck.includes(Member_List.id)}
          className="m-10"
        />
        <p> {Member_List.name} </p>
      </>
    );
  });

  const onSubmit = async (e) => {
    // e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      const res = await fetch("http://localhost:1337/api/addExpenseToGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          title: text,
          amount: amount,
        }),
      });
      const data = await res.json();
    }
  };

  return (
    <>
      <h3
        className="text-2xl font-bold text-gray-500 m-2"
        style={{ borderBottom: "thick solid gray" }}
      >
        Add Group Transaction
      </h3>
      <form onSubmit={onSubmit} className="h-72">
        <div className="form-control align-center justify-center flex m-2">
          {/* <label htmlFor="text" className='mr-3'>Text</label> */}
          <input
            className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-5 mb-2"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add new transaction...."
          />
        </div>
        <div className="form-control align-center justify-center flex m-2">
          {/* <label htmlFor="amount" className='pr-4'>
            Amount
          </label> */}
          <input
            type="number"
            className="text-gray-400 bg-gray-100 outline-none flex-1 rounded-xl p-2 pl-4 mb-2 form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="₹ Enter amount..."
          />
        </div>

        <div className="align-center justify-center overflow-x-scroll w-96">
          <Checkbox
            type="checkbox"
            name="selectAll"
            id="selectAll"
            handleClick={handleSelectAll}
            isChecked={isCheckAll}
          />
          Select All
          <div className="flex flex-row ">{Member}</div>
        </div>
        <button className="btn">Add Group transaction</button>
      </form>
    </>
  );
};
