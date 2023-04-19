import React from "react";

const Team = (props) => {
  return (
    <div id="team" className="text-center">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Meet the Team</h2>
          <p>
          Get to know the individuals who are driving the success of the platform
          </p>
        </div>
       <div className="flex">
          
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "9.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Aditya Ajmera</h4>
                      <p>Frontend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "8.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Antriksh Gupta</h4>
                      <p>Backend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "7.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Bhavaj Singla</h4>
                      <p>Frontend Developer</p>
                    </div>
                  </div>
                </div>              
            
        </div>
        <div className="flex">
          
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "6.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Bornadhya Abir Rajbongshi</h4>
                      <p>Backend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "10.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Dhruv Garg</h4>
                      <p>Backend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "1.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Manasvi Jain</h4>
                      <p>Frontend Developer</p>
                    </div>
                  </div>
                </div>              
            
        </div>
        <div className="flex">
          
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "5.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Mihir Deshpande</h4>
                      <p>Frontend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "3.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Mohak Singh Rana</h4>
                      <p>Backend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "4.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Rajat Gattani</h4>
                      <p>Frontend Developer</p>
                    </div>
                  </div>
                </div>              
            
        </div>
        <div className="flex justify-center">
          
                <div className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "2.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>Shourya Trikha</h4>
                      <p>Backend Developer</p>
                    </div>
                  </div>
                </div>
        </div>
      </div>
  );
};

Team.getInitialProps = async () => {
    return { hydrate: false };
  };

export default Team
