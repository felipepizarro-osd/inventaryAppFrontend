import React from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './searchProducts.scss'
function searchProducts() {
  return (
    <div className='Buscar'>
        <div className='top'>
            <div className='title'>
                Sistema de Inventario
            </div>
        </div>

        <div className='camera'>
            Camara
            <div className='frame'>
                <CameraAltIcon className='cameraIcon'/>
            </div>
        </div>
        <div className='formulario'>
            <h1 className='titulo'>Buscar Producto por Qr</h1>
            <input className='inputSku' type='text' placeholder='SKU del producto'></input>
            <button className='button' >Buscar</button>
        </div>
    </div>
  )
}

export default searchProducts