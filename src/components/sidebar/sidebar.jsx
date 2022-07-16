import React, { useState } from "react";
import "./sidebar.scss";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
//import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "..//img/Logo.png";
const tab = "\u00A0";

let nombre


let entra=localStorage.getItem('isLogin');
if(entra===null){
  nombre='LOG IN';
}
else{
  nombre=localStorage.getItem('name');
  console.log(localStorage.getItem('isLogin'));
}
/*
else{
  console.log('entra')
  nombre=localStorage.getItem('name');
  localStorage.setItem('isLogin','"true"');
  console.log('Despues de entrar: ',localStorage.getItem('isLogin'))
}
*/


//localStorage.removeItem('isLogin')
console.log('borrao', localStorage.getItem('isLogin'))
const Sidebar = () => {

  //console.log(localStorage.getItem('isLogin'))
  const [show, setShow] = useState(false);
  //console.log(localStorage.getItem('name'));
  const onSubmit=()=>{
    if(localStorage.getItem('isLogin')!==null){
      window.location.href = '/';
    }
    else{
      window.location.href = '/login';
    }
  }
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
          <button to="/login" className="nav-link" onClick={() => onSubmit()}>
            <span className="nav-link-name">{nombre}</span>
            <AccountCircleIcon className="icon" />
          </button>
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
