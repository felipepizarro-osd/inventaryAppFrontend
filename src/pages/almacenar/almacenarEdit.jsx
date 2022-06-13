import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'
import Edit from '../../components/edit/Edit'
const AlmacenarEdit = () => {
  return (
    <div className='home'>
        
    <Sidebar className='sidebar'/>
    <div className='homeConteiner'>
      <Navbar className='nav'/>
      <Edit/>
    </div>
</div>
  )
}

export default AlmacenarEdit