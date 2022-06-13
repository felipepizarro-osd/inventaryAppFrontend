import React from 'react'
import "./Home.scss"
import Sidebar from '../../components/sidebar/sidebar'
import Search from '../../components/searchProduct/searchProducts'



const Home = () => {
  return (
    <div className='home'>
        
        
        <section className='homeConteiner'>           
          <Search/>
          <Sidebar/>
        </section>
        
    </div>
  )
}

export default Home