import MaterialTable from 'material-table'
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { forwardRef } from 'react';

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
const TablaRetiro = () => {

    const columns=[
        {title:"Sku", field:"Sku"},
        {title:"Nombre", field:"Nombre",defaultSort:'asc'},
        {title:"Part number", field:"Part_Number"},
        {title:"Stock", field:"Stock",searchable:false},
        {title:"Stock min", field:"Stock_min",searchable:false}
    ]
    const [products, setProducts] = useState([])
    const getData = async () => {
        await axios.get('http://localhost:4000/api/products').then((response) => {
          const data = response.data
          console.log(data);
          setProducts(data)
        })
      }
      
      useEffect(() => {
        getData();
      }, [])
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
              onClick: (e, data) => console.log(data),
              // isFreeAction:true
            }
          ]} />
      </div>
    </section>
  )
}

export default TablaRetiro;