import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <button className="btn btn-danger m-3" onClick={() => navigate("/")}>Go To Home</button>
    </div>
  );
};

export default Menu;
