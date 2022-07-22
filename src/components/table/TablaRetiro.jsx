import MaterialTable from 'material-table'
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { forwardRef } from 'react';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Modal, TextField, IconButton, Grid } from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const useEstilos = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }))
const TablaRetiro = () => {

  const styles= useEstilos();
  
  const columns=[
    {title:"Sku", field:"Sku"},
    {title:"Nombre", field:"Nombre",defaultSort:'asc'},
    {title:'Nombre del Servicio', field: 'Nombre_Servicio' },
    {title:"Part number", field:"Part_Number"},
    {title:"Stock", field:"Stock",searchable:false},
    {title:"Stock min", field:"Stock_min",searchable:false},
    {title: 'Unidad', field: 'Unidad', sorting: false, filtering: false, searchable: false },
    {title: 'Bodega', field: 'Bodega'},
    {title: 'Modulo', field: 'Modulo'},
    {title: 'Posicion', field: 'Posicion'},
  ]
  const [products, setProducts] = useState([])
  const getData = async () => {
    await axios.get('http://localhost:4000/api/products').then((response) => {
      const data = response.data
      console.log(data);
      setProducts(data)
    })
  }

  const [data, setData]= useState([]);

  const handleChange = (event) => {
    setDato({
      ...dato,
      [event.target.name]: [event.target.value],
    });
  };

  const [dato, setDato] = useState({ retiro: 0});

  const [productoSeleccionado, setProductoSeleccionado]=useState({
    sku: "",
    Nombre:"",
    Nombre_Servicio:"",
    Part_Number:"",
    Stock:"",
    Stock_min:"",
    Unidad:"",
    Bodega:"",
    Modulo:"",
    Posicion:"",
    retiro:""
  })

  const seleccionarProducto=(sku,nombre,nombre_servicio,part_number,stock,stock_min,unidad,bodega,modulo,posicion)=>{
    console.log(sku,nombre,nombre_servicio,part_number,stock,stock_min,unidad,bodega,modulo,posicion)
    let producto = {sku:sku,Nombre:nombre,Nombre_Servicio:nombre_servicio,Part_Number:part_number,Stock:stock,Stock_min:stock_min,Unidad:unidad,Bodega:bodega,Modulo:modulo,Posicion:posicion}
    setProductoSeleccionado(producto);
    abrirCerrarModalR();
  }

  const abrirCerrarModalR=()=>{
    setModalR(!modalR);
  }

  const [modalR, setModalR]= useState(false);

  useEffect(() => {
    getData();
  }, [])


  const cambiarStock = async () => {
    console.log(dato.retiro[0]);
    console.log(productoSeleccionado.Stock);
    console.log("STATE productoSeleccionado",productoSeleccionado)
    productoSeleccionado.retiro = dato.retiro[0]
    console.log(productoSeleccionado.retiro);
    await axios.put('http://localhost:4000/api/products/retiro/' + productoSeleccionado.sku, productoSeleccionado).then((response) => {
      const data = response.data
      console.log(data);
      getData()
      console.log(response.status)

    })

  }


  const bodyR = (
    <div className={styles.modal}>
      <h3>Ingresar cantidad a retirar</h3>
      <TextField className={styles.inputMaterial} label="Cantidad" type="number" name="retiro" onChange={handleChange} value={dato&&dato.retiro}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=> new Promise((resolve, reject) =>{cambiarStock();setTimeout(() => resolve(), 500)})}>Retirar</Button>
        <Button onClick={()=>abrirCerrarModalR()}>Cancelar</Button>
      </div>
    </div>
  )

  return (
    <section>
      <div className='table'>
        <MaterialTable 
        options={{
          sorting: true, search: true, searchFieldAlignment: 'right', searchAutoFocus: true, searchFieldVariant: 'outlined',
          filtering: false, paging: true, pageSizeOptions: [5, 7, 10, 20, 30], pageSize: 7, paginationType: "stepped",
          showFirstLastPageButtons: false, paginationPosition: 'bottom',
          exportButton: true, exportAllData: true, exportFileName: 'DataTable', addRowPosition: 'first', actionsColumnIndex: -1
        }}
        title={'Retirar producto'} 
        icons={tableIcons} columns={columns} data={products}
        actions={[
            {
              icon: () => <button>Retirar</button>,
              tooltip: "Retirar",
              onClick: (event, rowData) => new Promise((resolve, reject) => 
              { 
                seleccionarProducto(rowData.Sku,rowData.Nombre,rowData.Nombre_Servicio,rowData.Part_Number,rowData.Stock,rowData.Stock_min,rowData.Unidad,rowData.Bodega,rowData.Modulo,rowData.Posicion);
                setTimeout(() => resolve(), 500)
              }),
              // isFreeAction:true
            }
          ]} />
        <Modal
          open={modalR}
          onClose={abrirCerrarModalR}>
          {bodyR}
        </Modal>
      </div>
    </section>
  )
}

export default TablaRetiro;