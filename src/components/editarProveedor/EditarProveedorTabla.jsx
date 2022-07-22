import React, {useState} from 'react';
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
const AgregarProveedor = () => {
  //Editar 
  //Conexion 
  //=================================================================================================================================


  //opuesto a los de arriva
  const [Proveedor, setProveedor] = useState([]) 
  const url = 'http://localhost:4000/api/pyp';

  
  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data
      setProveedor(data)
    })
  }

  const CreateProveedor = async (newRow) => {
    await axios.post(url, newRow).then((response) => {
      const data = response.data
      if (response.status === 200){
        getData()        
        swal({
          title:'Proveedor Creado',icon:'success',button:'Aceptar',timer:'2000'          
        }).then(res=>{
          setProveedor(...Proveedor,data)
          window.location.reload(true)
        })
      }
    }).catch(function(error){
      swal({title:'error',
      text:error.response.data.message,icon:'warning',button:'Aceptar',
      timer:'5000'})
    })
  }

  const DeleteProveedor = async (selectedRow)=> {
    const prueba = {Nombre_Prov:selectedRow.Nombre_Prov, 
      Codigo_Producto: selectedRow.Codigo_Producto}
    
    await axios.delete(url,{data: prueba}).then((response) => {
      getData()
      swal({
        title:'Relacion Proveedor y producto suministrado Eliminado',icon:'success',button:'Aceptar',timer:'2000'
      })
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    { title: 'Nombre_Prov', field: 'Nombre_Prov', filterPlaceHolder: "Filtrar por Nombre_Prov"},
    { title: 'Codigo_Producto', field: 'Codigo_Producto', filterPlaceHolder: "Filtrar por Codigo_Producto"},
  ]

  return (
    <section>           
        <div className='table'>    
          <MaterialTable title={'Crear y Eliminar relacion Nombre_Prov-Codigo_Producto'} columns={columns} data={Proveedor} icons={tableIcons}
            
            editable={{
              onRowAdd: (newRow) => new Promise((resolve, reject) => {    
                CreateProveedor(newRow); 
                setTimeout(() => resolve(), 500) }).catch(error=>swal({
                title:'Error en insertar',text:error.message,timer:'2000'
              })),
            
              onRowDelete:(selectedRow)=>new Promise((resolve, reject)=>{
                DeleteProveedor(selectedRow)
                setTimeout(() => resolve(), 500)
              })
            }}
            options={{
              sorting: false, search: true, searchFieldAlignment: 'right', searchAutoFocus: true, searchFieldVariant: 'outlined',
              filtering: true, paging: true, pageSizeOptions: [10, 15, 20], pageSize: 10,
              showFirstLastPageButtons: false, paginationPosition: 'bottom',
              exportButton: true, exportAllData: true, exportFileName: 'DataTable', addRowPosition: 'first', actionsColumnIndex: -1,
              columnsButton:true
            }}
          />
        </div>
    </section>
  )
}
  

export default AgregarProveedor;

