import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Editar from '../../components/edit/Editar'
import  './almacenarEdir.scss'
const AlmacenarEdit = () => {
  return (
    <section className='home'>
    <div >  
      <Sidebar className='sidebar'/>
    </div>
    <div className='homeConteiner'>
      <div className='table'>
        <Editar/>
      </div>
    </div>
    </section>
  )
}

export default AlmacenarEdit