import React from 'react'
import './navbar.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
function navbar() {
  return (
    <div className='navbar'>
      <div className='wrapper'>

        <div className='items'>

          <div className='item'>
          <Link className='item' to="/login"> LOG IN </Link>
          <AccountCircleIcon className='icon'/>

          </div>
        </div>
      </div>
    </div>
  )
}

export default navbar