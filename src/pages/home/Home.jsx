import React, {Component } from 'react';
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


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    axios.get("http://localhost:4000/api/products").then((response) => {
      console.log(response.data);
      this.setState({ products: response.data });
    });
  }

  deleteProducts(sku){
    
    if(window.confirm('Desea borrar este producto?')){
      axios.delete(`http://localhost:4000/api/products/${sku}`).then((response) => {
        console.log(sku);
        this.fetchProducts();
      });
   }
  }
  render() {
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
                  {this.state.products.map((products) => {
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
                          <IconButton variant='outlined' aria-label="delete" onClick={() => this.deleteProducts(products.Sku)}>
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
}

export default Home;