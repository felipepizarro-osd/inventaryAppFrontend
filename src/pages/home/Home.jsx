import React from 'react'
import "./Home.scss"
import Sidebar from '../../components/sidebar/sidebar'

import Search from '../../components/searchProduct/searchProducts'



const Home = () => {
  return (
    <div className='home'>
        
        
        <div className='homeConteiner'>
          <Search/>
          <Sidebar className='sidebar'/>
        </div>
    </div>
  )
}

export default Home