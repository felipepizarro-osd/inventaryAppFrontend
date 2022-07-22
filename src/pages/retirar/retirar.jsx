import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import './retirar.scss'
import TablaRetiro from '../../components/table/TablaRetiro'

const Retiro = () => {
  return (
    <section className='home'>
    <div >  
      <Sidebar className='sidebar'/>
    </div>
    <div className='homeConteiner'>
      <div className='table'>
        <TablaRetiro/>
      </div>
    </div>
    </section>
  )
}

export default Retiro;