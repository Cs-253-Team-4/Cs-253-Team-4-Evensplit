import React from "react";
import Link from "next/link";
const Services = (props) => {
  return (
    <div id="services" className="text-center">
      {/* <div className="container"> */}
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
          Gain a clear understanding of the primary functions and features of the platform
          </p>
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img
          className="w-[500px] mx-auto my-4 hover:scale-105 duration-300"
          src= "calendarr.png"
          alt="/"
        />
        <div className="flex flex-col justify-center px-4">
          <h2 className="text-[#00d25b] font-bold ">CALENDAR</h2>

          <p className="text-white ">
          This integrated calendar allows users to view monthly, weekly, and hourly schedules, add personal events for their own viewing, and allows admins to add events visible to everyone, all while assimilating the various events into a cohesive display.
          
          </p>
          <br></br>
          <div className="flex justify-center">
          <Link href={"/calendar"}>
          <a  
        
        className="btn btn-custom btn-lg page-scroll"
      >
       Calendar
      </a>{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 ">
        <div className="flex flex-col justify-center px-4">
          <h2 className="text-[#00d25b] font-bold ">EXPENSES </h2>

          <p className="text-white ">
          This platform enables users to view, settle, and simplify pending one-to-one or group transactions, while also providing a means for students to document their personal expenses related to food, groceries, travel, and more.
          </p>
          <br></br>
          <div className="flex justify-center">
          <Link  href={"/user-finance"}>
          <a  
        
        className="btn btn-custom btn-lg page-scroll"
      >
     Expenses
      </a>{" "}
          </Link>
        </div>
        </div>
        <img
          className="w-[500px] mx-auto my-4 hover:scale-105 duration-300"
          src="17.png" 
          alt="/"
        />
      </div>
        {/* </div>
         <div className="flex justify-center m-40">
    <div className="w-1/2 flex justify-center">
      <Link href={"/calendar"}>
        <div className="text-3xl font-bold text-white-500 hover:text-4xl h-40 w-40 "><img src="https://i.ibb.co/m9MMrsD/Screenshot-2023-02-02-185300.png" alt="Screenshot-2023-02-02-185300" border="0"/>CALENDAR</div>
        {/* <h1 className="text-3xl font-bold text-blue-500 hover:text-4xl">CALENDAR</h1> */}
      {/* </Link>
    </div>
    <div className="w-1/2 flex justify-center">
      <Link href={"/user-finance"}>
      <div className="text-3xl font-bold text-white-500 hover:text-4xl h-40 w-40"><img src="https://i.ibb.co/hMW5Scp/money.png" alt="money" border="0"/>EXPENSES</div>
      </Link>
    </div>
  </div> */}
  
      </div> 
     </div> 
  );
};

Services.getInitialProps = async () => {
    return { hydrate: false };
  };

export default Services

// import React from "react";
// import { Link } from "react-router-dom";
// export const Services = () => {
//   return (
//     <>
//     <div className="w-full bg-black py-16 px-4" id="Services">
    //   <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
    //     <img
    //       className="w-[500px] mx-auto my-4 hover:scale-105 duration-300"
    //       src= "https://i.ibb.co/m9MMrsD/Screenshot-2023-02-02-185300.png"
    //       alt="/"
    //     />
    //     <div className="flex flex-col justify-center px-4">
    //       <p className="text-[#00d25b] font-bold ">CALENDAR</p>

    //       <p className="text-white ">
    //       The homepage provides an overview of the user's financial behavior,
    //        including their latest expenditures and borrowings. Additionally,
    //         it presents a detailed breakdown of expenses categorized into 
    //         various groups.  
    //       </p>
    //       <div className="flex justify-end">
    //       <Link to="/calendar">
    //       <button className="-m-2 hover:bg-gradient-to-r from-[#00d25b] to-[#00d25b]  w-[200px] border border-[#00d25b] rounded-md font-medium my-6  py-3 text-[#00d25b] font-semibold hover:bg-[#00d25b] hover:text-black hover:border-[#00d25b]">
    //             Get Started
    //           </button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
//       <br></br>
//       <br></br>
    //   <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 ">
    //     <div className="flex flex-col justify-center px-4">
    //       <p className="text-[#00d25b] font-bold ">EXPENSES </p>

    //       <p className="text-white ">
    //         The expenses page features user-friendly calendar that allows you to
    //         quickly select any date and see list of all transactions made on
    //         that day, including the date, amount, shop or vendor, and category
    //         of expense made on that day. This powerful feature makes it easy to
    //         keep track of your expenses and monitor your spending habits over
    //         time
    //       </p>
    //       <Link to="/user-finance">
    //       <button className="-m-2 hover:bg-gradient-to-r from-[#00d25b] to-[#00d25b]  w-[200px] border border-[#00d25b] rounded-md font-medium my-6  py-3 text-[#00d25b] font-semibold hover:bg-[#00d25b] hover:text-black hover:border-[#00d25b]">
    //             Get Started
    //           </button>
    //       </Link>
    //     </div>
    //     <img
    //       className="w-[500px] mx-auto my-4 hover:scale-105 duration-300"
    //       src="https://i.ibb.co/hMW5Scp/money.png" 
    //       alt="/"
    //     />
    //   </div>
//       <br></br>
//       <br></br>

          
//       </div>

// </>
      
//   );
// };