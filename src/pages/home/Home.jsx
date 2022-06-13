import React from 'react'
import "./Home.scss"
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'

import Search from '../../components/searchProduct/searchProducts'



const Home = () => {
  return (
    <div className='home'>
        
        <Sidebar className='sidebar'/>
        <div className='homeConteiner'>
          <Navbar className='nav'/>
          <Search/>
        </div>
    </div>
  )
}

export default Home