import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import EditarBodegasTabla from '../../components/editarBodegas/EditarBodegasTabla'
import  './EditarBodegas.scss'
const EditarBodegas = () => {
  return (
    <section className='home'>
    <div >  
      <Sidebar className='sidebar'/>
    </div>
    <div className='homeConteiner'>
      <div className='table'>
        <EditarBodegasTabla/>
      </div>
    </div>
    </section>
  )
}

export default EditarBodegas