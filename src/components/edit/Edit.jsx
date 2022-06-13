import React, { useEffect, useState } from 'react'
import './Edit.scss'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from '@mui/material';
import Button from '@mui/material/Button';


const Edit = () => {

  const [products, setProducts] = useState([])
  //metodo del modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const url = 'http://localhost:4000/api/products';

  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data
      console.log(data);
      setProducts(data)
    })
  }

  const [sku, setSku] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Nombre_Servicio, setNombreServicio] = useState('');
  const [Part_Number, setPartNumber] = useState('')
  const [Stock, setStock] = useState('')
  const [Stock_min, setStockMin] = useState('')
  const [Unidad, setUnidad] = useState('')

  const productObject = {
    sku: sku,
    Nombre: Nombre,
    Nombre_Servicio: Nombre_Servicio,
    Part_Number: Part_Number,
    Stock: Stock,
    Stock_min: Stock_min,
    Unidad: Unidad

  }
  const CreateProduct = async (e) => {
    handleClose()
    await axios.post(url, productObject).then((response) => {
      const data = response.data
      console.log(data);
      setProducts(data);
      console.log(response.status)


    })
  }
  const handleSku = e => {
    setSku(e.target.value);
  };
  const handleNombre = e => {
    setNombre(e.target.value);
  };
  const handleNombreServicio = e => {
    setNombreServicio(e.target.value);
  };
  const handlePartNumber = e => {
    setPartNumber(e.target.value);
  };
  const handleStock = e => {
    setStock(e.target.value);
  };
  const handleStockmin = e => {
    setStockMin(e.target.value);
  };
  const handleUnidad = e => {
    setUnidad(e.target.value);
  };
  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      name: "Sku",
      label: "SKU"

    },
    {
      name: "Nombre",
      label: "Nombre"

    },
    {
      name: "Nombre_Servicio",
      label: "Nombre del servicio"
    },
    {
      name: "Part_Number",
      label: " Part number"
    },
    {
      name: "Stock",
      label: "Stock"
    },
    {
      name: "Stock_min",
      label: "Stock minimo"
    },
    {
      name: "Unidad",
      label: "Unidad"
    },
    {
      name: "Edit",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button className='addProduct' onClick={() => window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)}>
              Editar
            </button>
          );
        }
      }
    },
  ]
  //crear producto
  const useStyles = {
    position: 'absolute',
    padding: "12px 12px 12px",
    backgroundColor: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px'

  }
  const prodStyles = {
    borderBottom: '6px', padding: '4px'
  }
  const colorStyles = {
    backgroundColor: '#1b5a74',
    color: 'white',

  }
  const body = (
    <div>
      <DialogTitle>Crear</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rellene los campos necesarios para incluir un producto nuevo al inventario
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          label='Sku del producto'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleSku}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Nombre del producto'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleNombre}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Nombre del Servicio asociado al producto'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleNombreServicio}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Part Number'
          type='text'
          fullWidth
          variant='standard'
          onChange={handlePartNumber}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Stock recibido del producto'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleStock}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Stock minimo del producto en bodega'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleStockmin}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Unidad'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleUnidad}
        />
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button type='Submit' onClick={handleClose} onSubmit={CreateProduct} >Guardar</Button>
        </DialogActions>
    </div>
  )

  return (
    <div className='edit'>
      <div className='editTitle'>
        <h1 className='titulo'>Crear Producto</h1>
        <button onClick={handleClickOpen} className='addProduct'>Crear</button>
        <Dialog open={open} onClose={handleClose}>{body}</Dialog>
      </div>
      <div className='productContainer'>
        <div>
        <MUIDataTable
          title={"Productos"}
          data={products}
          columns={columns}

        >
        </MUIDataTable>
        </div>
      </div>
    </div>
  )
}

export default Edit