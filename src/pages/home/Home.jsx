import React from 'react'
import "./Home.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Search from '../../components/searchProduct/searchProducts'



const Home = () => {
  return (
    <div className='home'>
        
         <Search/>
        <div className='homeConteiner'>           
          <Sidebar/>
        </div>
    </div>
  )
}

export default Home