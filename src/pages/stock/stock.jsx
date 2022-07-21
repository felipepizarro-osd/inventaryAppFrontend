import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import './stock.scss'
import TablaStock from '../../components/table/TablaStock'

const Stock = () => {
  if(localStorage.getItem('isLogin')===null){
    return(
      <section className='home'>
      <div >  
        <Sidebar className='sidebar'/>
      </div>
      <div className='homeConteiner'>
        
        <div className='table'>
          DEBE INICIAR SESION
        </div>
      </div>
      </section>
    )
  }
  else{
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
}

export default Stock;