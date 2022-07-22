import React, {useState} from 'react';
import {Grid, Paper, Avatar, TextField, Button, CssBaseline} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Sidebar from '../sidebar/sidebar';
//import { View, Text, FlatList} from 'react-native';
import axios from "axios";
import { useEffect } from 'react';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import swal from 'sweetalert';

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
// Bodega
const AgregarBodega = () => {
  //Editar
 
  //Conexion
  const  [allBodegas,setallBodegas] = useState({ Ubicacion: "" });
    
  useEffect(()=>{ 
    const getBodega = async ()=>{
      const response = await fetch('http://localhost:4000/api/Bodegas');
      setallBodegas(await response.json());      
    }
    getBodega();
  },[])
  //=================================================================================================================================
  //=================================================================================================================================
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  //opuesto a los de arriva
  const [Estanterias, setEstanterias] = useState([]) 
  const [Estanteria, setEstanteria] = useState([])
  const url = 'http://localhost:4000/api/estanterias';

  
  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data
      console.log("getData",data);
      setEstanterias(data)
    })
  }

  const CreateEstanteria = async (newRow) => {
    setEstanteria(newRow)
    console.log("CreateEstanteria_1",newRow);
    console.log("CreateEstanteria_1.1",url,newRow);
    await axios.post(url, newRow).then((response) => {
      const data = response.data
      console.log("CreateEstanteria_2",data);

      if (response.status === 200){
        swal({
          title:'Estanteria Creada',icon:'success',button:'Aceptar',timer:'2000'
        }).then(res=>{
          setEstanterias(...products,data)
        })
      }
    }).catch(function(error){
      swal({title:'error',text:error.response.data.message,icon:'warning',button:'Aceptar',timer:'5000'})
    })

  }

  const EditProduct = async (newRow, sku) => {
    await axios.put(url + '/' + sku, newRow).then((response) => {
      const data = response.data
      console.log('EditProduct_1',data);
      getData()
      swal({
        title:'Producto Editado',icon:'success',button:'Aceptar',timer:'2000'
      })
      console.log('EditProduct_2',response.status)
    })
  }
  const DeleteProduct = async (selectedRow)=> {
    const prueba = {Bodega:selectedRow.Bodega, 
      Modulo: selectedRow.Modulo, 
      Posicion: selectedRow.Posicion, 
      Sku_Producto:selectedRow.Sku_Producto, 
      Num_Prod_Guardados:selectedRow.Num_Prod_Guardados}
    
    console.log('DeleteProduct_A',selectedRow);
    console.log('DeleteProduct_B',prueba.Bodega);

    await axios.delete(url,prueba).then((response) => {
      const data = response.data
      console.log('DeleteProduct_1',data);
      getData()
      swal({
        title:'Producto Eliminado',icon:'success',button:'Aceptar',timer:'2000'
      })
      console.log('DeleteProduct_1',response.status)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    { title: 'Bodega', field: 'Bodega', filterPlaceHolder: "Filtrar por Bodega"},
    { title: 'Modulo', field: 'Modulo', filterPlaceHolder: "Filtrar por Modulo"},
    { title: 'Posicion', field: 'Posicion', filterPlaceHolder: "Filtrar por Posicion",},
    { title: 'Sku_Producto', field: 'Sku_Producto', filterPlaceHolder: "Filtrar por Posicion"},
    { title: 'Num_Prod_Guardados', field: 'Num_Prod_Guardados', filterPlaceHolder: "Filtrar por Posicion"},
  ]
  //=================================================================================================================================
  const btnstyle={margin:'10px 0', backgroundColor: '#EA454C'}
  
  //=================================================================================================================================
  return (
    <section>           
        <div className='table'>    
          <MaterialTable title={'Crear y Eliminar Estanterias'} columns={columns} data={Estanterias} icons={tableIcons}
            
            editable={{
              onRowAdd: (newRow) => new Promise((resolve, reject) => {                 
                console.log("Return onRowAdd",newRow);
                CreateEstanteria(newRow); 
                setTimeout(() => resolve(), 500) }).catch(error=>swal({
                title:'Error en insertar',text:error.message,timer:'2000'
              })),
              onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                EditProduct(newRow, oldRow.Sku);
                setTimeout(() => resolve(), 500)
              }),
              onRowDelete:(selectedRow)=>new Promise((resolve, reject)=>{
                console.log('Return onRowDelete',selectedRow);
                console.log('Return onRowDelete-0',selectedRow.Bodega);
                DeleteProduct(selectedRow)
                setTimeout(() => resolve(), 500)
              })
            }}
            options={{
              sorting: false, search: true, searchFieldAlignment: 'right', searchAutoFocus: true, searchFieldVariant: 'outlined',
              filtering: true, paging: true, pageSizeOptions: [10, 15, 20], pageSize: 10, paginationType: "stepped",
              showFirstLastPageButtons: false, paginationPosition: 'bottom',
              exportButton: true, exportAllData: true, exportFileName: 'DataTable', addRowPosition: 'first', actionsColumnIndex: -1,
              columnsButton:true
            }}
          />
        </div>
    </section>
  )
}
  

export default AgregarBodega;

