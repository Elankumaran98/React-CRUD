import React from "react";
import eye from "../assests/eye.jpg"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand" href="1">
          <img
            src={eye}
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top rounded-pill me-3"
          />
          EL
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to='/' className="nav-link active" aria-current="page" href="1">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/' className="nav-link" href="1">
                Link
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
