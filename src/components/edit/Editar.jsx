import React, { useEffect, useState } from 'react'
//import MUIDataTable from "mui-datatables";
import axios from 'axios';
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
const Editar = () => {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const url = 'http://localhost:4000/api/products';

  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data
      console.log(data);
      setProducts(data)
    })
  }

  const CreateProduct = async (newRow) => {
    setProduct(newRow)
    console.log("Que es lo que guarda->",newRow)

    await axios.post(url, newRow).then((response) => {
      const data = response.data
      console.log(data);

      if (response.status === 200){
        swal({
          title:'Producto Creado',icon:'success',button:'Aceptar',timer:'2000'
        }).then(res=>{
          setProducts(...products,data)
        })
      }
    }).catch(function(error){
      swal({title:'error',text:error.response.data.message,icon:'warning',button:'Aceptar',timer:'5000'})
    })

  }

  const EditProduct = async (newRow, sku) => {
    await axios.put(url + '/' + sku, newRow).then((response) => {
      const data = response.data
      console.log(data);
      getData()
      swal({
        title:'Producto Editado',icon:'success',button:'Aceptar',timer:'2000'
      })
      console.log(response.status)
    })
  }
  const DeleteProduct = async (selectedRow)=> {
    await axios.delete(url + '/' + selectedRow.Sku).then((response) => {
      const data = response.data
      console.log(data);
      getData()
      swal({
        title:'Producto Eliminado',icon:'success',button:'Aceptar',timer:'2000'
      })
      console.log(response.status)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    { title: 'Sku', field: 'Sku', filterPlaceHolder: "Filtrar por SKU" },
    { title: 'Nombre', field: 'Nombre', filterPlaceHolder: "Filtrar por Nombre" },
    { title: 'Nombre del Servicio', field: 'Nombre_Servicio', filterPlaceHolder: "Filtrar por Servicio" },
    { title: 'Part Number', field: 'Part_Number', sorting: false, filtering: false },
    { title: 'Stock', field: 'Stock', filterPlaceHolder: "Filtrar por Stock", type:'numeric'},
    { title: 'Stock minimo', field: 'Stock_min', filterPlaceHolder: "Filtrar por Stock minimo", type:'numeric' },
    { title: 'Unidad', field: 'Unidad', sorting: false, filtering: false, searchable: false, lookup:{Unidad:'Unidad',cm:'Centimetros',mt:'Metros',km:'kilometros',Rollo:'Rollos',Caja:'Caja',Bolsa:'Bolsa'}},
    { title: 'Bodega', field: 'Bodega', filterPlaceHolder: "Filtrar por Bodega",editable:'onAdd' },
    { title: 'Modulo', field: 'Modulo', filterPlaceHolder: "Filtrar por Modulo",editable:'onAdd' },
    { title: 'Posicion', field: 'Posicion', filterPlaceHolder: "Filtrar por Posicion",editable:'onAdd'},
  ]

  return (
    <section>
      <div className='table'>
        <MaterialTable title='Almacenar Producto' columns={columns} data={products} icons={tableIcons}
          
          
          editable={{
            onRowAdd: (newRow) => new Promise((resolve, reject) => { CreateProduct(newRow); setTimeout(() => resolve(), 500) }).catch(error=>swal({
              title:'Error en insertar',text:error.message,timer:'2000'
            })),
            onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
              EditProduct(newRow, oldRow.Sku);
              setTimeout(() => resolve(), 500)
            }),
            onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
              //console.log(selectedRow);
              DeleteProduct(selectedRow)
              setTimeout(() => resolve(), 500)
            })
          }}
          options={{
            sorting: true, search: true, searchFieldAlignment: 'right', searchAutoFocus: true, searchFieldVariant: 'outlined',
            filtering: true, paging: true, pageSizeOptions: [10, 15, 20], pageSize: 10, 
            showFirstLastPageButtons: false, paginationPosition: 'bottom',
            exportButton: true, exportAllData: true, exportFileName: 'DataTable', addRowPosition: 'first', actionsColumnIndex: -1,
            tableLayout:'auto'
          }}
        />
      </div>
    </section>
  )
}

export default Editar