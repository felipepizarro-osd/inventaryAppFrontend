import React from 'react'
import './navbar.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function navbar() {
  return (
    <div className='navbar'>
      <div className='wrapper'>

        <div className='items'>

          <div className='item'>
          LOG IN
          <AccountCircleIcon className='icon'/>

          </div>
        </div>
      </div>
    </div>
  )
}

export default navbar