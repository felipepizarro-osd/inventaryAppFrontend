import React from 'react'
import './navbar.scss'
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

function navbar() {
  const onSubmit=()=>{
    localStorage.removeItem('isLogin');
    localStorage.removeItem('name');
    window.location.href = '/';
  }

  return (
    <>
    <nav className="nav">
    <div>
      <div>
        <Link to="/" className="nav-logo">
          <HomeIcon className="nav-logo-icon" />
          <span className="nav-logo-name">Homepage</span>
        </Link>
      </div>
      <div className="nav-Link">
        <Link to="" className="nav-link">
          <SearchIcon className="nav-link-icon" />
          <span className="nav-link-name">Buscar Producto</span>
        </Link>
        <Link to="/products" className="nav-link">
          <Inventory2Icon className="nav-link-icon" />
          <span className="nav-link-name">
            Almacenar o editar producto
          </span>
        </Link>
        <Link to="/retirar_productos" className="nav-link">
          <ExitToAppIcon className="nav-link-icon" />
          <span className="nav-link-name">Retirar Producto</span>
        </Link>
        <Link to="/revisar_stock" className="nav-link" >
          <CheckBoxIcon className="nav-link-icon" />
          <span className="nav-link-name">Revisar stock</span>
        </Link>
        <Link to="" className="nav-link">
          <AddIcon className="nav-link-icon" />
          <span className="nav-link-name">Agregar Proveedor</span>
        </Link>
        <Link to="" className="nav-link">
          <CreateIcon className="nav-link-icon" />
          <span className="nav-link-name">Crear o editar bodega</span>
        </Link>
      </div>
    </div>
    <Link to="" className="nav-link">
      <ExitToAppIcon />
      <span className="nav-link-name" onClick={()=> onSubmit()} >Logout</span>
    </Link>
  </nav>
  </>
  )
}

export default navbar