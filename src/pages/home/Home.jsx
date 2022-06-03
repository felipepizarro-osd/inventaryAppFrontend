import React from 'react'
import "./Home.scss"
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import Table from '../../components/table/Table'
import Search from '../../components/searchProduct/searchProducts'



const Home = () => {
  return (
    <div className='home'>
        
        <Sidebar/>
        <div className='homeConteiner'>
          <Navbar/>
          <Search/>
          <div className='widgets'>
            <Widget type='user'/>
            <Widget type='order'/>
            <Widget type='earning'/>
            <Widget type='balance'/>

          </div>
          <div className='charts'>
            <Featured/>
            <Chart/>
          </div>
          <div className='listContainer'>
            <div className='listTitle'> Latest transaction</div>
            <Table/>
          </div>
        </div>
    </div>
  )
}

export default Home