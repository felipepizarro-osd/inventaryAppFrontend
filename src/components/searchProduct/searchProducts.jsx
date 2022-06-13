import React, {useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './searchProducts.scss'
import axios from 'axios';
import { Grid, IconButton, Modal } from '@mui/material';
import {QRCode} from 'react-qr-svg';
import CloseIcon from '@mui/icons-material/Close';
import Scanner from '../scannerQr/Scanner';

//import { flexbox } from '@mui/system';
const tab = '\u00A0'

export default function SearchProducts() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      if(dato.sku[0] === '' || dato.sku[0]=== undefined){
        setOpen(false);
      }else{setOpen(true)}
      
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    const [product, setProduct] = useState({Sku: ''});
    const searchProduct = (sku) => {
        console.log(sku)
        axios.get(`http://localhost:4000/api/products/${sku}`).then((response) => {
        console.log(response.data);
        setProduct(response.data);
    });
    }
    const [dato, setDato] = useState({sku: ''})

    const handleChange = (event) => {
        console.log(event.target.value)
        setDato({
            ...dato,
            [event.target.name] : [event.target.value]
        })

    };

    const enviarDato = (event) => {
        event.preventDefault();
        searchProduct(dato.sku[0])
    };
    
    const useStyles = {
          position: 'absolute',
          padding: "12px 12px 12px",
          backgroundColor: 'white',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px'
          
      }
    const prodStyles={
      borderBottom: '6px', padding:'4px',
    }
    const colorStyles={
      backgroundColor:'#1b5a74',
      color:'white',
    }
    const body=(
      <div className='body' style={useStyles}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <h2>Producto buscado</h2>
          </Grid>
          <Grid item alignItems="flex-start" style={{transform: 'translate(30%, -20%)'}}>
            <IconButton size='large' onClick={handleClose}><CloseIcon fontSize="inherit"/> </IconButton>
          </Grid>
        </Grid>
        <Grid container>
            
          <Grid item sm style={{display:'block', margin:'auto'}}>
            <QRCode value={product.Sku} level={'L'} style={{ width: 250 }}/>
          </Grid>

          <Grid item sm container direction='column' style={{marginLeft:'10px',marginRight:'8px'}}>
            <p style={prodStyles}>Sku: </p>
            <p style={colorStyles}>{product.Sku}</p>
          
            <p style={prodStyles}>Nombre: </p>
            <p style={colorStyles}>{product.Nombre}</p>
            
            <p style={prodStyles}>Nombre de servicio: </p>
            <p style={colorStyles}>{product.Nombre_Servicio}</p>

            <p style={prodStyles}>Part number: </p>
            <p style={colorStyles}>{product.Part_Number}</p>
            
            <p style={prodStyles}>Stock: </p>
            <p style={colorStyles}>{product.Stock}</p>
            
            <p style={prodStyles}>Stock minimo: </p>
            <p style={colorStyles}>{product.Stock_min}</p>
  
            <p style={prodStyles}>Unidad: </p>
            <p style={colorStyles}>{product.Unidad}</p>
          </Grid>
          
        </Grid>
            
            
    </div>
    )
    const bodyAlert=(
      <div style={useStyles}>
        <h2>Producto no encontrado!!</h2>
        <div style={{padding:'10px'}}>
          <button className='cerrar' onClick={handleClose}> cerrar</button>
        </div>
      </div>
    )
    return (
      <div className="Buscar">
        <div className="top">
          <div className="title">Sistema de Inventario</div>
        </div>

        <div className="camera">
          Camara
          <div className="frame">
            <CameraAltIcon className="cameraIcon" />
            <Scanner/>
          </div>
            
        </div>
        <div className="formulario">
            <h1 className="titulo">Buscar Producto por Qr</h1>
            {tab}
            <form onSubmit={enviarDato}>
                <input
                    className='input-sku'
                    type="text"
                    placeholder="SKU del producto"
                    name='sku'    
                    onChange={handleChange}
                />
                
                {tab}
                <button type="submit" className="button" onClick={handleClickOpen}>
                    Buscar
                </button>
            
            </form>
            { dato.sku[0] === product.Sku &&
              <Modal  className='modal' open={open} onClose={handleClose}>{body}</Modal>
            }{ dato.sku[0] !== product.Sku && <Modal  open={open} onClose={handleClose }>{bodyAlert}</Modal>}
          </div>
      </div>
    )}