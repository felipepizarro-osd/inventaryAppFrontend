import React, { useEffect, useState } from 'react'
import './Edit.scss'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { get } from 'react-hook-form';
/*
primero modificamos los dialogs para que el cierren y abran y renderizen cosas distintas 
lo que pasa ahora es que la option de la mui datatable segun el example entregaa value tableMeta and UpdateValue 
lo que pasa es que tengo que pasarle el objeto que seleccione en la tabla pero no se como recuperarlo en la 
maldita tabla solo me ofrece el rowindex pero eso no dice nada del objeto que quiero modificar
hay 2 opciones pruebo mas y veo si puedo hacerlo
o hago la tabla desde 0 con otro metodo a ver si funca
*/

const Edit = () => {

  const [products, setProducts] = useState([])
  //metodo del modal
  const [open, setOpen] = useState(false);
  //const handleClickOpen = () => setOpen(true);
  //const handleClose = () => setOpen(false);
  const [dialogCreate,setDialogCreate] = useState(false)
  const [dialogUpdate,setDialogUpdate] = useState(false)

  const [selectedProduct,setSelectedProduct] = useState([]);
  
  const url = 'http://localhost:4000/api/products';

  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data
      console.log(data);
      setProducts(data)
    })
  }
  const OpenCloseDialog = () =>{
    setDialogCreate(!dialogCreate);
  }
  const OpenCloseDialogUpdate = () =>{
    setDialogUpdate(!dialogUpdate);
  }

  const [sku, setSku] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Nombre_Servicio, setNombreServicio] = useState('');
  const [Part_Number, setPartNumber] = useState('')
  const [Stock, setStock] = useState('')
  const [Stock_min, setStockMin] = useState('')
  const [Unidad, setUnidad] = useState('')


  const [skuS, setSkuS] = useState('');
  const [NombreS, setNombreS] = useState('');
  const [Nombre_ServicioS, setNombreServicioS] = useState('');
  const [Part_NumberS, setPartNumberS] = useState('')
  const [StockS, setStockS] = useState('')
  const [Stock_minS, setStockMinS] = useState('')
  const [UnidadS, setUnidadS] = useState('')

  const productObjectSelected = {
    sku: skuS,
    Nombre: NombreS,
    Nombre_Servicio: Nombre_ServicioS,
    Part_Number: Part_NumberS,
    Stock: StockS,
    Stock_min: Stock_minS,
    Unidad: UnidadS

  }
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
    //handleClose()
    await axios.post(url, productObject).then((response) => {
      const data = response.data
      console.log(data);
      setProducts(products.concat(data));
      console.log(response.status)
      OpenCloseDialog()
    })
  }
  const EditProduct = async (e) => {
    //handleClose()
    await axios.put(url+'/'+productObjectSelected.sku,productObjectSelected).then((response) => {
      const data = response.data
      console.log(data);
      setProducts(products.concat(data));
      getData()
      console.log(response.status)
      OpenCloseDialogUpdate()
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
//donde se reciben lso cambios del producto seleccionado para recuperarlos
const handleChangeSku = e => {
  setSkuS(e.target.value);
};
const handleChangeName = e => {
  setNombreS(e.target.value);
};
const handleChangeService = e => {
  setNombreServicioS(e.target.value);
};
const handleChangePartNumber = e => {
  setPartNumberS(e.target.value);
};
const handleChangeStock = e => {
  setStockS(e.target.value);
};
const handleChangeStockMin = e => {
  setStockMinS(e.target.value);
};
const handleChangeUnidad = e => {
  setUnidadS(e.target.value);
};

  useEffect(() => {
    getData()
  }, [])
  
  const ProductoSeleccionado = (product,caso)=>{
    console.log(product)
    setSkuS(product[0])
    //console.log(productObjectSelected.sku);
    setNombreS(product[1])
    setNombreServicioS(product[2])
    setPartNumberS(product[3])
    setStockS(product[4])
    setStockMinS(product[5])
    setUnidadS(product[6])  
    console.log(productObjectSelected);
    
    (caso === 'Edit' )&&OpenCloseDialogUpdate()

  }
  
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

            <button className='addProduct' onClick={
              ()=> ProductoSeleccionado(tableMeta.rowData,'Edit')
              /*() => window.alert(`Clicked "Edit" for row ${tableMeta.rowData}`)*/}>
              Editar
              
            </button>
          );
        }
      }
    },
  ]
  //crear producto



  //Body del dialog editar producto 
  const bodyEditar = (
    <div>
      <DialogTitle>Editar</DialogTitle>
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
          onChange={handleChangeSku}
          value={productObjectSelected.sku}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Nombre del producto'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleChangeName}
          value={productObjectSelected.Nombre}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Nombre del Servicio asociado al producto'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleChangeService}
          value={productObjectSelected.Nombre_Servicio}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Part Number'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleChangePartNumber}
          value={productObjectSelected.Part_Number}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Stock recibido del producto'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleChangeStock}
          value={productObjectSelected.Stock}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Stock minimo del producto en bodega'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleChangeStockMin}
          value={productObjectSelected.Stock_min}
        />
        <TextField
          autoFocus
          margin='dense'
          label='Unidad'
          type='text'
          fullWidth
          variant='standard'
          onChange={handleChangeUnidad}
          value={productObjectSelected.Unidad}
        />
      </DialogContent>
          <DialogActions>
          <Button onClick={()=>OpenCloseDialogUpdate()}>Cerrar</Button>
          <Button type='Submit' onClick={()=>{EditProduct()}}  >Editar</Button>
        </DialogActions>
    </div>
  )
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
          <Button onClick={()=>OpenCloseDialog()}>Cerrar</Button>
          <Button type='Submit' onClick={()=>CreateProduct()}  >Guardar</Button>
        </DialogActions>
    </div>
  )

  return (
    <div className='edit'>
      <div className='editTitle'>
        <h1 className='titulo'>Crear Producto</h1>
        <button onClick={()=>OpenCloseDialog()} className='addProduct'>Crear</button>
        <Dialog open={dialogCreate} onClose={OpenCloseDialog}>{body}</Dialog>
        <Dialog open={dialogUpdate} onClose={OpenCloseDialogUpdate}>{bodyEditar}</Dialog>

      </div>
      <div className='productContainer'>
        <MUIDataTable
          title={"Productos"}
          data={products}
          columns={columns}

        >

        </MUIDataTable>
      </div>
    </div>
  )
}

export default Edit