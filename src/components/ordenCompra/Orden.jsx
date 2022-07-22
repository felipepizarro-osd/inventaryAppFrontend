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


const columns = [
  { title: 'Codigo', field: 'Codigo', filterPlaceHolder: "Filtrar por Codigo" },

  { title: 'Fecha (dia,mes,año)', field: 'Fecha', filterPlaceHolder: "Filtrar por Fecha", type:'date' ,dateSetting: {format: 'dd/MM/yyyy'},},

  { title: 'Responsable', field: 'Responsable', filterPlaceHolder: "Filtrar por Responsable" },

  { title: 'Entrada_Salida', field: 'Entrada_Salida', filterPlaceHolder: "Filtrar por Entrada_Salida" }


]
const Orden = () => {
  const [Ordenes, setOrdenes] = useState([])
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const url = 'http://localhost:4000/api/ocs';
  const urlR = 'http://localhost:4000/api/products';
  

  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data
      console.log(data);
      setOrdenes(data)
    })
  }
  const CreateProduct = async (newRow,rowData) => {
    setProduct(newRow)

    await axios.put(urlR+'/Order/'+rowData.Codigo , newRow).then((response) => {
      const data = response.data
      console.log(data);

      if (response.status === 200){
        swal({
          title:'Producto Creado',icon:'success',button:'Aceptar',timer:'2000'
        }).then(res=>{
          setProduct(...product,data)
        })
      }
    }).catch(function(error){
      swal({title:'error',text:error.response.data.message,icon:'warning',button:'Aceptar',timer:'5000'})
    })

  }
  const EditProduct = async (newRow, sku) => {
    await axios.put(urlR + '/' + sku, newRow).then((response) => {
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
    await axios.delete(urlR + '/' + selectedRow.Sku).then((response) => {
      const data = response.data
      console.log(data);
      getData()
      swal({
        title:'Producto Eliminado',icon:'success',button:'Aceptar',timer:'2000'
      })
      console.log(response.status)
    })
  }
  const CreateNewOrder = async (newRow)=>{
    await axios.post(url,newRow).then((response)=>{
      const data =response.data

      if (response.status === 200){
        swal({
          title:'Orden Creada Puede insertar los Productos asociados',icon:'success',button:'Aceptar',timer:'2000'
        }).then(res=>{
          setProduct(...Ordenes,data)
          getData()
        })
      }
    }).catch(function(error){
      swal({title:'error',text:error.response.data.message,icon:'warning',button:'Aceptar',timer:'5000'})
    })
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    
    <section>
      <div className='table'>
        <MaterialTable
          editable={{
            onRowAdd:(newRow)=> new Promise((resolve, reject) => {
              CreateNewOrder(newRow);
              setTimeout(() => resolve(), 500)
            }).catch(error=>swal({
              title:'Error en insertar',text:error.message,timer:'2000'
            })),
          }}
          title='Ingresar orden de Compra' columns={columns} data={Ordenes} icons={tableIcons}
          onRowClick={(evt,rowData,togglePanel) =>{
            //getProduct(rowData)
            togglePanel()
            
          }}
          options={{
             actionsColumnIndex: -1,isLoading:{isLoading},sorting: true, search: true, searchFieldAlignment: 'right', searchAutoFocus: true, searchFieldVariant: 'outlined',
             filtering: true, paging: true, pageSizeOptions: [10, 15, 20], pageSize: 10, 
             showFirstLastPageButtons: false, paginationPosition: 'bottom',
             exportButton: true, exportAllData: true, exportFileName: 'DataTable', addRowPosition: 'first', 
             tableLayout:'auto'
          }}
          detailPanel={[
            {
              tooltip: 'Show products',
                render: rowData => {
                  
                  return (
                    <div>
                      <section>
                        <div>
                          <MaterialTable title=''
                            editable={{
                              onRowAdd: (newRow) => new Promise((resolve, reject) => { CreateProduct(newRow,rowData); setTimeout(() => resolve(), 500) }).catch(error=>swal({
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
                          columns={[
                            { title: 'Sku', field: 'Sku', filterPlaceHolder: "Filtrar por SKU" },
                            { title: 'Nombre', field: 'Nombre', filterPlaceHolder: "Filtrar por Nombre" },
                            { title: 'Nombre del Servicio', field: 'Nombre_Servicio', filterPlaceHolder: "Filtrar por Servicio" },
                            { title: 'Part Number', field: 'Part_Number', sorting: false, filtering: false },
                            { title: 'Stock', field: 'Stock', filterPlaceHolder: "Filtrar por Stock", type: 'numeric' },
                            { title: 'Stock minimo', field: 'Stock_min', filterPlaceHolder: "Filtrar por Stock minimo", type: 'numeric' },
                            { title: 'Unidad', field: 'Unidad', sorting: false, filtering: false, searchable: false, lookup: { Unidad: 'Unidad', cm: 'Centimetros', mt: 'Metros', km: 'kilometros', Rollo: 'Rollos', Caja: 'Caja', Bolsa: 'Bolsa' } },
                            { title: 'Bodega', field: 'Bodega', filterPlaceHolder: "Filtrar por Bodega", editable: 'onAdd' },
                            { title: 'Modulo', field: 'Modulo', filterPlaceHolder: "Filtrar por Modulo", editable: 'onAdd' },
                            { title: 'Posicion', field: 'Posicion', filterPlaceHolder: "Filtrar por Posicion", editable: 'onAdd' },
                            { title: 'Cantidad', field: 'Cantidad', filterPlaceHolder: "Cantidad", editable: 'onAdd' },
                            
                          ]}
                            data={query=>new Promise((resolve, reject) => {
                              axios.get(url + '/' + rowData.Codigo).then((response)=>{
                                resolve({data:response.data})
                              })
                           })} icons={tableIcons}
                          />
                        </div>
                      </section>
                    </div>
                  )
                },
            },
          ]}

        ></MaterialTable>

    </div>
    </section >
  )
}
export default Orden
