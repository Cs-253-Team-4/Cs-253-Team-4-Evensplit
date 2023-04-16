import React from "react";
import Link from "next/link";
const Intro = () => {
  return (
      <div className="intro">
        <div className="overlay">
          <div className="container">
            {/* <div className="row"> */}
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h2 className = "text">
                  Welcome to EvenSplit!
                  {/* <span></span> */}
                </h2>
                <p>Unlock the Power of Pro-level Expense Management and Time Optimization with Eventsplit! </p>
                <Link  href={"#about"}>
                <a  
        
                  className="btn btn-custom btn-lg page-scroll"
                >
            
                  Learn More
                </a>{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      // </div>
  );
};

Intro.getInitialProps = async () => {
    return { hydrate: false };
  };
  
export default Intro;