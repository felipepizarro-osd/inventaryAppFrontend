import React, { useState } from "react";
import "./sidebar.scss";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "..//img/Logo.png";
const tab = "\u00A0";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <main className={show ? "space-toggle" : null}>
      <header className={`header ${show ? "space-toggle" : null}`}>
        
        <div className="header-toggle" onClick={() => setShow(!show)}>
          <ViewHeadlineIcon className="icon" />    
        </div>
        <div className="logo ">
            <img src={logo} alt="logo" height={30} width={70} />
            <span className="logo-name">
              {tab}Software{tab}Inventory
            </span>
          </div>

        <div className="nav-login">
          <Link to="" className="nav-link">
            <span className="nav-link-name">Log In</span>
            <AccountCircleIcon className="icon" />
          </Link>
        </div>
      </header>
      <div>
      <aside className={`sidebar ${show ? "show" : null}`}>
        <Navbar/>
      </aside>
      </div>
    </main>
  );
};

export default Sidebar;
