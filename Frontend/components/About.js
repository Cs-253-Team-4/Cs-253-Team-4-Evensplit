import React from "react";
const About = (props) => {
  return (
    <div id="about">
          <div className="col-xs-2 col-lg-2">
            {" "}
            <img src="about.jpg" className="img-responsive" alt="" />{" "}
        
          </div>
          <div className="col-xs-2 col-lg-2">
            <div className="about-text">
              <h2> About Us </h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>Why Choose Us?</h3>
              <div className="list-style flex">
                <div className="col-lg-6 col-sm-6 col-xs-12 mr-48">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </div>
  );
};

About.getInitialProps = async () => {
    return { hydrate: false };
  };

export default About