import React from 'react'
import "./Home.scss"
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'

import Search from '../../components/searchProduct/searchProducts'



const Home = () => {
  return (
    <div className='home'>
        
        <Sidebar/>
        <div className='homeConteiner'>
          <Navbar/>
          <Search/>
        </div>
    </div>
  )
}

export default Home