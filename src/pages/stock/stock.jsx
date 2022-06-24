import MaterialTable from 'material-table'
import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import './stock.scss'

const Stock = () => {

    const columns=[
        {title:"Sku", field:"sku"},
        {title:"Nombre", field:"nombre"},
        {title:"Nombre de Servicio", field:"nombre_servicio"},
        {title:"Part number", field:"part_number"},
        {title:"Stock", field:"stock"},
        {title:"Stock min", field:"stock_min"},
        {title:"Unidad", field:"unidad"}
    ]
  return (
    <section className='home'>
    <div >  
      <Sidebar className='sidebar'/>
    </div>
    <div className='homeConteiner'>
      
      <div className='table'>
        <MaterialTable columns={columns}/>
      </div>
    </div>
    </section>
  )
}

export default Stock;