
import React, {useState} from 'react';
import {Grid, Paper, Avatar, TextField, Button, CssBaseline} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Sidebar from '../../components/sidebar/sidebar';
//import { View, Text, FlatList} from 'react-native';
import { Modal} from "@mui/material";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import { useEffect } from 'react';


const Agregarproveedor = () => {
  const paperStyle={padding :20, height:'40vh',width:350, margin: "100px auto"}
  const avatarStyle={backgroundColor: '#33A5FF'}
  const btnstyle={margin:'10px 0', backgroundColor: '#EA454C'}
  const usuarioStyle={margin: "10px auto", textTransform: 'uppercase'}

  //Editar
  const useStyles = {
    position: "absolute",
    padding: "12px 12px 12px",
    backgroundColor: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
  };
  
  //Conexion console.log("AllProveedores",proveed[0].Nombre)
  const  [proveed,setProveedor] = useState([]);
  
  useEffect(()=>{ 
    const getProveedor = async ()=>{
      const response = await fetch('http://localhost:4000/api/proveedores');
      setProveedor(await response.json());
      
    }
    getProveedor();
  },[])

  //Verificar SI existe el proveedor
  
  const  [prove,setProveedorName] = useState({ Nombre: "" });

  const searchProveedor = (nombre) => {
    axios.get(`http://localhost:4000/api/proveedores/${nombre}`).then(resp =>{
    
    if (resp.data){
      setProveedorName(resp.data);
    }
    else{
      setProveedorName({ Nombre: "" });
    }
    console.log("Proveedor-->",resp.data);
    // aqui falta una funcion? 
    })
  }

  const [dato, setDato] = useState({ Nombre: "" }); 

  const enviarDato = (event) => {
    event.preventDefault();
    console.log("datoo",dato.Nombre);
    searchProveedor(dato.Nombre[0]);
    //searchProveedor(dato.nombre[0]); 
    //nose porque es name y no nombre ver en consola
  };
  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    //if(dato.nombre.lenght > 0 || dato.nombre == undefined){}
    if (dato.Nombre[0] === "" || dato.Nombre[0] === undefined) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setDato({      
      ...dato,
      [event.target.name]: [event.target.value.toUpperCase()],
    });
  };

  const aceptado = (
    <div style={useStyles}>
      <h2>Proveedor Guardado!!</h2>
      <div style={{ padding: "10px" }}>
        <button className="cerrar" onClick={handleClose}>
          {" "}
          cerrar
        </button>
      </div>
    </div>
  );
  const rechazado = (
    <div style={useStyles}>
      <h2>Proveedor Proveedor ya existe!!</h2>
      <div style={{ padding: "10px" }}>
        <button className="cerrar" onClick={handleClose}>
          {" "}
          cerrar
        </button>
      </div>
    </div>
  );
   

  return (
    <div className='Agregarproveedor'>
      <Sidebar/>
      <div className='AgregarproveedorConteiner'>
      {console.log("AllProveedores",proveed)}
        <Grid>
          <CssBaseline/>              
            <Paper elevation={10} style={paperStyle}> 
              <Grid align = 'center'>
                <Avatar style={avatarStyle}> <LibraryAddIcon/> </Avatar>
                <h2>Agregar Proveedor</h2>
              </Grid>
              <form onSubmit={enviarDato} align = 'center'>
                <FormControl align = 'center'>
                  <TextField 
                    label='Nombre Proveedor' 
                    placeholder='Ingrese Nombre del Proveedor' 
                    fullWidth required name='Nombre' 
                    onChange={handleChange}
                    style={usuarioStyle}/>
                  <br /><br />

                  <Button type='submit' 
                  /* onClick={handleClickOpen}  */
                  color='primary' variant='contained' 
                  onClick={handleClickOpen}
                  style={btnstyle} fullWidth >Agregar Proveedor</Button>
                </FormControl>
              </form>
              {dato.Nombre[0] === prove.Nombre.toUpperCase() && (
                console.log('1 dato:',dato.Nombre[0],' prove:',prove.Nombre.toUpperCase()))
              }
              {dato.Nombre[0] !== prove.Nombre.toUpperCase() && (
                console.log('2 dato:',dato.Nombre[0],' prove:',prove.Nombre.toUpperCase()))
              }
              {dato.Nombre[0] === prove.Nombre.toUpperCase() &&(                
                <Modal open={open} onClose={handleClickOpen}>                  
                  {rechazado}
                </Modal>
              )}
              {dato.Nombre[0] !== prove.Nombre.toUpperCase() &&  (
                <Modal open={open} onClose={handleClickOpen}>
                  {aceptado}
                </Modal>
              )}

              <div className='AgregarproveedorInformacion'>   
              </div>      
            </Paper>            
        </Grid>
      </div>
      




    </div>
  )
}

export default Agregarproveedor;


/*

      <div className='AgregarproveedorConteiner'>
        <Grid>
          <CssBaseline/>              
            <Paper elevation={10} style={paperStyle}> 
              <Grid align = 'center'>
                <Avatar style={avatarStyle}> <LibraryAddIcon/> </Avatar>
                <h2>Enlazar Sku a Proveedor</h2>
              </Grid>
              <TextField label='Nombre Proveedor' placeholder='Ingrese Nombre del Proveedor' fullWidth required name='Name' style={usuarioStyle}/>
              <TextField label='Sku del Producto Vendido' placeholder='Ingrese Sku del Producto' fullWidth required name='Sku' style={usuarioStyle}/>
                           
              <Button type='submit' color='primary' variant='contained' style={btnstyle} fullWidth>Agregar Proveedor</Button>
            </Paper>
            
        </Grid>
      </div>
*/