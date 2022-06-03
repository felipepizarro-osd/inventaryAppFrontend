import React from 'react'
import './Widgets.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import BalanceIcon from '@mui/icons-material/Balance';

function Widget({ type }) {
    let data;
    const amount = 100;
    const diff = 20;
    switch(type){
        case "user":
          data={
              title:'USERS',
              isMoney:false,
              link:'See all users',
              icon:<PersonIcon className='icon' style={{ color:'crimson', backgroundColor:'rgba(255,0,0,0.2)'}}/>,
          };
          break 
          //case 2
          case "order":
          data={
              title:'ORDER',
              isMoney:false,
              link:'View all orders',
              icon:<ShoppingCartIcon className='icon' style={{ color:'golden', backgroundColor:'rgba(218,165,32,0.2)'}}/>,
          };
          break 
          //case 3
          case "earning":
          data={
              title:'EARNING',
              isMoney:true,
              link:'View net earnings',
              icon:<PaidIcon className='icon' style={{ color:'green', backgroundColor:'rgba(0,128,0,0.2)'}} />,
          };
          break 
          //case 4
          case "balance":
          data={
              title:'BALANCE',
              isMoney:true,
              link:'See details',
              icon:<BalanceIcon className='icon' style={{ color:'purple', backgroundColor:'rgba(128,0,128,0.2)'}} />,
          };
          break 
          default:
              break;
    }
  return (
    <div className='widget'>
        <div className='left'>
            <span className='title'>
                {data.title}
            </span>
            <span className='counter'>
                {data.isMoney && '$'} {amount}
            </span>
            <span className='link'>
                {data.link}
            </span>
        </div>
        <div className='rigth'>
            <div className='percentage positive'>
                <KeyboardArrowUpIcon/>
                {diff} %
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget