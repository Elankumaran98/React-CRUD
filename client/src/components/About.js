import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <button className="btn btn-warning m-3" onClick={() => navigate("/")}>
        Go To Home
      </button>
    </div>
  );
};

export default About;
