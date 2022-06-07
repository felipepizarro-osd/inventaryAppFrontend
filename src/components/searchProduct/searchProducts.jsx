import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';


import './searchProducts.scss'


function searchProducts() {
    return (
        <div className='Buscar'>
            <div className='top'>
                <div className='title'>
                    Sistema de Inventario
                </div>
            </div>

            <div className='container'>
                <div className='info'>
                    <h4>
                        Buscar Producto por QR
                    </h4>
                    <FormControl fullWidth sx={{ m: 0.5 }}>
                        <InputLabel className='input' htmlFor="outlined-adornment-amount">SKU del Producto</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            style={{
                                borderRadius: '20px',
                                width: '100%',
                                marginBottom: '20px',
                                backgroundColor:'#1B5A74',
                                borderColor:"white"
                                
                            }}
                            color="success"
                            label="Sku del Producto"
                        />
                    </FormControl> 
                    <div className='bton'>
                        <Button size="large" variant="contained">Buscar</Button>
                    </div>
                                       
                    <div className='social Media'>
                        <a href='/' className='icon-circle'>
                            <i className='icon'></i>
                        </a>
                    </div>
                </div>
            </div>
            <form>

            </form>
        </div >
    )
}

export default searchProducts