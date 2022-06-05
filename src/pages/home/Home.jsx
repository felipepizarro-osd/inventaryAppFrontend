import React, {useEffect, useState } from 'react';
import "./Home.scss"
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
//import Table from '../../components/table/Table'
import Search from '../../components/searchProduct/searchProducts'
import axios from 'axios';
import Grid from '@mui/material/Grid'
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
//import { render } from 'react-dom';

function useDatos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
    .then((res) => {
      if(res.ok) return res.json();
    })
    .then((jsonRes) => setProducts(jsonRes));
  }, [])

  return products;
}

function deleteProducts(sku){
  if(window.confirm('Desea borrar este producto?')){

    axios.delete(`http://localhost:4000/api/products/:${sku}`).then((response) => {
      console.log(sku);
    });
  }
}

export default function Home() {
  
  const render = useDatos()
  
  return (
      <div className="home">
        <Sidebar />
        <div className="homeConteiner">
          <Navbar />
          <Search />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart />
          </div>
          <Grid container spacing={2} justifyContent="center" >
            
            <div className="row">
              <table className='tabla_producto'>
                <thead>
                  <tr>
                    <th>Sku</th>
                    <th>Nombre</th>
                    <th>Nombre de servicio</th>
                    <th>Part number</th>
                    <th>Stock</th>
                    <th>Stock minimo</th>
                    <th>Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  {render.map((products) => {
                    return (
                      <tr key={products.Sku}>
                        <td>{products.Sku}</td>
                        <td>{products.Nombre}</td>
                        <td>{products.Nombre_Servicio}</td>
                        <td>{products.Part_Number}</td>
                        <td>{products.Stock}</td>
                        <td>{products.Stock_min}</td>
                        <td>{products.Unidad}</td>

                        <td>
                          <IconButton variant='outlined' aria-label="delete" onClick={() => deleteProducts(products.Sku)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton variant='outlined' aria-label="edit" >
                            <Edit />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Grid>
        </div>
      </div>
    );
}