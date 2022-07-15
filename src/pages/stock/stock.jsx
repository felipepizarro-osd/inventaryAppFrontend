import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import './stock.scss'
import TablaStock from '../../components/table/TablaStock'

const Stock = () => {
  return (
    <section className='home'>
    <div >  
      <Sidebar className='sidebar'/>
    </div>
    <div className='homeConteiner'>
      
      <div className='table'>
        <TablaStock/>
      </div>
    </div>
    </section>
  )
}

export default Stock;