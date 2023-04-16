import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import Intro from "../components/Intro";
import About from "../components/About";
import Team from "../components/Team";
import Services from "../components/Services";
import { NoSsr } from '@material-ui/core';
import { animateScroll } from 'react-scroll';

const scrollToTop = () => {
  animateScroll.scrollToTop();
};

const App = () => {
  const [landingPageData, setLandingPageData] = useState({
    "About": {
      "paragraph":
      `The aim of our product is to help students manage their time and expenses in an efficient way. Our integrated calendar will assimilate the various events and display their details according to the student's interests. It also allows students to document their personal expenses on food, groceries, travel, etc. as well as manage the expenses incurred in a group.`,
      "Why": [
        "Form groups and simplify transactions within a Group",
        "Add an expense",
        "Request money",
        "Get summary of expenses and optimise expenses",
      ],
      "Why2": [
        "Add personal events",
        "Monthly, weekly and hourly view of calendar",
        "Admin can add global events",
        "Get details regarding events"
      ]
    },
    "Services": [
      {
        "icon": "fa fa-wordpress",
        "name": "Lorem ipsum dolor",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
      },
      {
        "icon": "fa fa-cart-arrow-down",
        "name": "Consectetur adipiscing",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
      },
      {
        "icon": "fa fa-cloud-download",
        "name": "Lorem ipsum dolor",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
      },
      {
        "icon": "fa fa-language",
        "name": "Consectetur adipiscing",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
      },
      {
        "icon": "fa fa-plane",
        "name": "Lorem ipsum dolor",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
      },
      {
        "icon": "fa fa-pie-chart",
        "name": "Consectetur adipiscing",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."
      }
    ],
    "Team": [
      {
        "img": "team/01.jpg",
        "name": "John Doe",
        "job": "Director"
      },
      {
        "img": "team/02.jpg",
        "name": "Mike Doe",
        "job": "Senior Designer"
      },
      {
        "img": "team/03.jpg",
        "name": "Jane Doe",
        "job": "Senior Designer"
      }
    ]
  });

  return(
    <>
    <NoSsr>
    <Navbar onClick={scrollToTop}></Navbar>
    <Intro/>
    <About data={landingPageData.About} />
    <Services data={landingPageData.Services} />
    <Team data={landingPageData.Team} />
    <Footer />
    </NoSsr>
    </>
  )
}
export default App;