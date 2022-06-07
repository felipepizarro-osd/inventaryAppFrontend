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
import TablaProducto from '../../components/table/tablaProducto';
//import { render } from 'react-dom';


export default function Home() {
  
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/api/products")
    .then((res) => {
      if(res.ok) return res.json();
    })
    .then((jsonRes) => setProducts(jsonRes));
    
  },[])
  
  const deleteProducts = (sku) => {
    console.log(sku)
    if(window.confirm('Desea borrar este producto?')){
      axios.delete(`http://localhost:4000/api/products/${sku}`)
      }
    const arrayFiltrado = products.filter(prod => prod.sku !== sku);
    setProducts(arrayFiltrado)
  }
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
              <TablaProducto products={products} deleteProducts={deleteProducts} />
            </div>
          </Grid>
        </div>
      </div>
    
    );
    
}