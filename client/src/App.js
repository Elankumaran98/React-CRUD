import React from "react";
import "./App.css"
import Home from "./components/Home";
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Menu from "./components/Menu";
import About from "./components/About";
import Error from "./components/Error";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
