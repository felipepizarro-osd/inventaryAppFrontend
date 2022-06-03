import React from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
//import PeopleIcon from '@mui/icons-material/People';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
function sidebar() {
  return (
    <div className='sidebar'>
      <div className='top'>
        <ViewHeadlineIcon className='icon' />
        <span className='logo'>

          C19 Software Inventory
        </span>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <li><DashboardIcon className='Icons' /><span>Dashboard</span></li>
          <li><SearchIcon className='Icons' /><span>Buscar Producto</span></li>
          <li><Inventory2Icon className='Icons' /><span>Almacenar o editar producto</span></li>
          <li><ExitToAppIcon className='Icons' /><span>Retirar Producto</span></li>
          <li><CheckBoxIcon className='Icons' /><span>Revisar stock</span></li>
          <li><AddIcon className='Icons' /><span>Agregar Proveedor</span></li>
          <li><CreateIcon className='Icons' /><span>Crear o editar bodega</span></li>


        </ul>
      </div>
      <div className='bottom'>
        <div className='colorOption'></div>
        <div className='colorOption'></div>

      </div>
    </div>

  )
}

export default sidebar