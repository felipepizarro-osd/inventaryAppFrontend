import React from 'react'
import './navbar.scss'
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link } from "react-router-dom";

function navbar() {
  const onSubmit = () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('name');
    localStorage.removeItem('nocontra');
    window.location.href = '/';
  }
  const onRegister=()=>{
    localStorage.removeItem('registerdone');
    localStorage.removeItem('yaregistrado');
    localStorage.removeItem('reingrese');
    localStorage.removeItem('contradis'); 
  }
  if (localStorage.getItem('isLogin') !== null) {
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
              <Link to="/products" className="nav-link">
                <Inventory2Icon className="nav-link-icon" />
                <span className="nav-link-name">
                  Almacenar o editar producto
                </span>
              </Link>
              <Link to="" className="nav-link">
                <ExitToAppIcon className="nav-link-icon" />
                <span className="nav-link-name">Retirar Producto</span>
              </Link>
              <Link to="/revisar_stock" className="nav-link">
                <CheckBoxIcon className="nav-link-icon" />
                <span className="nav-link-name">Revisar stock</span>
              </Link>
              <Link to="/Agregarproveedor" className="nav-link">
                <AddIcon className="nav-link-icon" />
                <span className="nav-link-name">Agregar Proveedor</span>
              </Link>
              <Link to="/AgregarBodegas" className="nav-link">
                <CreateIcon className="nav-link-icon" />
                <span className="nav-link-name">Crear o editar bodega</span>
              </Link>
              <Link to="/ingresar" className="nav-link">
                <PostAddIcon className="nav-link-icon" />
                <span className="nav-link-name">Ingresar orden de compra</span>
              </Link>
              <Link to="/register" className="nav-link" onClick={() => onRegister()}>
                <PersonAddIcon />
                <span className="nav-link-name" >Registrar usuario</span>
              </Link>
            </div>
          </div>
          <Link to="" className="nav-link" onClick={() => onSubmit()}>
            <ExitToAppIcon />
            <span className="nav-link-name" >Logout</span>
          </Link>
        </nav>
      </>
    )
  }
  else {
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
              <Link to="/products" className="nav-link">
                <Inventory2Icon className="nav-link-icon" />
                <span className="nav-link-name">
                  Almacenar o editar producto
                </span>
              </Link>
              <Link to="" className="nav-link">
                <ExitToAppIcon className="nav-link-icon" />
                <span className="nav-link-name">Retirar Producto</span>
              </Link>
              <Link to="/revisar_stock" className="nav-link">
                <CheckBoxIcon className="nav-link-icon" />
                <span className="nav-link-name">Revisar stock</span>
              </Link>
              <Link to="/Agregarproveedor" className="nav-link">
                <AddIcon className="nav-link-icon" />
                <span className="nav-link-name">Agregar Proveedor</span>
              </Link>
              <Link to="/AgregarBodegas" className="nav-link">
                <CreateIcon className="nav-link-icon" />
                <span className="nav-link-name">Crear o editar bodega</span>
              </Link>
              <Link to="/ingresar" className="nav-link">
                <PostAddIcon className="nav-link-icon" />
                <span className="nav-link-name">Ingresar orden de compra</span>
              </Link>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default navbar