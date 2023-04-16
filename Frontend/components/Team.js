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
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 mr-48 team">
                  <div className="thumbnail">
                    {" "}
                    <img src= "Team.png" alt="hehe" className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>

              ))
            : "loading"}
</div>
      </div>
  );
};

Team.getInitialProps = async () => {
    return { hydrate: false };
  };

export default Team