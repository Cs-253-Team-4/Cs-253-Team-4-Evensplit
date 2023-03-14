import React from "react";

function Avatar(props) {
  //imgURL
  return (
      <img className="circle-img" src={props.imgURL} alt="avatar_img" />
  );
}

export default Avatar;
