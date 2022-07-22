import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import EditarProveedorTabla from '../../components/editarProveedor/EditarProveedorTabla'
import  './EditarProveedor.scss'
const EditarProveedor = () => {
  return (
    <section className='home'>
    <div >  
      <Sidebar className='sidebar'/>
    </div>
    <div className='homeConteiner'>
      <div className='table'>
        <EditarProveedorTabla/>
      </div>
    </div>
    </section>
  )
}

export default EditarProveedor