import React from "react";

function Detail(props) {
  let balance;
  if (props.balance >= 0) {
    // balance = `You owe Rs. ${props.balance}`;
    return (
      <div className="bottom">
        <div className="info">
          <p style={{ color: "red" }}>You owe Rs. {props.balance}</p>
          {/* <p>{props.email}</p> */}
        </div>
      </div>
    );
  } else {
    // balance = `You are owed Rs. ${Math.abs(props.balance)}`;
    return (
      <div className="bottom">
        <div className="info">
          <p style={{ color: "green" }}>You are owed Rs. {Math.abs(props.balance)}</p>
          {/* <p>{props.email}</p> */}
        </div>
      </div>
    );
  }

  //number, email
  // return (
  //   <div className="bottom">
  //     <div className="info">
  //       <p style={{ color: "green" }}>{balance}</p>
  //       {/* <p>{props.email}</p> */}
  //     </div>
  //   </div>
  // );
}

export default Detail;
