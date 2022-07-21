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

  { title: 'Fecha', field: 'Fecha', filterPlaceHolder: "Filtrar por Fecha" },

  { title: 'Responsable', field: 'Responsable', filterPlaceHolder: "Filtrar por Responsable" },

  { title: 'Entrada_Salida', field: 'Entrada_Salida', filterPlaceHolder: "Filtrar por Entrada_Salida" }


]
const Orden = () => {
  const [Ordenes, setOrdenes] = useState([])
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const url = 'http://localhost:4000/api/ocs';

  const getData = async () => {
    await axios.get(url).then((response) => {
      const data = response.data
      console.log(data);
      setOrdenes(data)
    })
  }
  const getProduct = async (rowData) => {
    await axios.get(url + '/' + rowData.Codigo).then((response) => {
      const data = response.data
      console.log(data);
      setProduct(data)
      
    })
    setIsLoading(false);
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    
    <section>
      <div className='table'>
        <MaterialTable
          title='Ingresar orden de Compra' columns={columns} data={Ordenes} icons={tableIcons}
          onRowClick={(evt, selectedRow,togglePanel) =>{
            setIsLoading(true);
            getProduct(selectedRow)
            togglePanel()
            
          }}
          options={{
             actionsColumnIndex: -1,isLoading:{isLoading}
          }}
          detailPanel={[
            {
              tooltip: 'Show products',
                render: rowData => {
                  
                  return (
                    <div>
                      <section>
                        <div>
                          <MaterialTable title='' columns={[
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
                          ]}
                            data={product} icons={tableIcons}
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
