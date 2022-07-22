import React, {useState} from 'react';
import {Grid, Paper, Avatar, TextField, Button, CssBaseline} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Sidebar from '../../components/sidebar/sidebar';
//import { View, Text, FlatList} from 'react-native';
import { Modal} from "@mui/material";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import { useEffect } from 'react';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import swal from 'sweetalert';
import Select from "react-select"
import { Link } from "react-router-dom";

// Bodega
const AgregarBodega = () => {
  const paperStyle={padding :20, height:350,width:350, margin: "100px auto"}
  const avatarStyle={backgroundColor: '#33A5FF'}
  const btnstyle={margin:'10px 0', backgroundColor: '#EA454C'}
  const usuarioStyle={margin: "10px auto"}
  const paperStyle2={padding :20, height:200,width:350, margin: "100px auto"}
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
  //Verificar SI existe el la bodega  
  //Almaceno el nombre de la bodega
  const  [BodegaBuscada,setBodegaBuscada] = useState({ Ubicacion: "" });
  //busco la bodega y si no existe la agrego
  const searchBodega = (Ubicacion) => {
    axios.get(`http://localhost:4000/api/Bodegas/${Ubicacion}`).then(resp =>{
    
    if (resp.data){
      setBodegaBuscada(resp.data);
    }
    else{
      setBodegaBuscada({ Ubicacion: "" });
    }
    console.log("BodegaBuscada-->",resp.data);
    // aqui falta una funcion? 
    })
  }

  const [dato, setDato] = useState({ Ubicacion: "" }); 

  const enviarDato = (event) => {
    event.preventDefault();
    console.log("dato ingresado",dato.Ubicacion);
    searchBodega(dato.Ubicacion[0]);
    //searchBodega(dato.Ubicacion[0]); 
  };
  //===============================================================================================================================
  const [open, setOpen] = useState(false);
  //Al clickar el Boton Agregar Bodega 
  const handleClickOpen = () => {
    //if(dato.nombre.lenght > 0 || dato.nombre == undefined){}
    if (dato.Ubicacion[0] === "" || dato.Ubicacion[0] === undefined) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  //va guardando el dato ingresado por pantalla
  const handleChange = (event) => {
    setDato({      
      ...dato,
      [event.target.name]: [event.target.value.toUpperCase()],
    });
  };
  //=================================================================================================================================
  const aceptado = (
    <div style={useStyles}>
      <h2>Ubicacion Guardada!!</h2>
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
      <h2>Ubicacion ya existe!!</h2>
      <div style={{ padding: "10px" }}>
        <button className="cerrar" onClick={handleClose}>
          {" "}
          cerrar
        </button>
      </div>
    </div>
  );
  //=================================================================================================================================
  //=================================================================================================================================
  // Voy guardando la bodega ingresada por pantalla
  // handleChange va guardando el dato ingresado en el datoBodega
  //=================================================================================================================================
  return (
    <div className='AgregarBodega' >
      <Sidebar/>
      <div className='AgregarBodegaConteiner'>     
        <Grid>
          <CssBaseline/>              
            <Paper elevation={10} style={paperStyle}> 
              <Grid align = 'center'>
                <Avatar style={avatarStyle}> <LibraryAddIcon/> </Avatar>
                <h2>Agregar Bodega</h2>
              </Grid>
              <form onSubmit={enviarDato} align = 'center'>
                <FormControl align = 'center'>
                  <TextField 
                    label='Nombre Bodega' 
                    placeholder='Ingrese Ubicacion' 
                    fullWidth required name='Ubicacion' 
                    onChange={handleChange}
                    style={usuarioStyle}/>
                  <br /><br />

                  <Button type='submit' 
                  /* onClick={handleClickOpen}  */
                  color='primary' variant='contained' 
                  onClick={handleClickOpen}
                  style={btnstyle} fullWidth >Agregar Bodega</Button>
                </FormControl>
              </form>
              {dato.Ubicacion[0] === BodegaBuscada.Ubicacion.toUpperCase() &&(                
                <Modal open={open} onClose={handleClickOpen}>                  
                  {rechazado}
                </Modal>
              )}
              {dato.Ubicacion[0] !== BodegaBuscada.Ubicacion.toUpperCase() &&  (
                <Modal open={open} onClose={handleClickOpen}>
                  {aceptado}
                </Modal>
              )}

              <div className='AgregarUbicacionInformacion'>   
              </div>      
            </Paper>            
        </Grid>
      </div> 
      

      <div className='AgregarBodegaConteiner'>     
        <Grid>
          <CssBaseline/>              
            <Paper elevation={10} style={paperStyle2}> 
              <Grid align = 'center'>
                <Avatar style={avatarStyle}> <LibraryAddIcon/> </Avatar>
                <h2>Editar Bodegas</h2>
              </Grid>
              <div className='BOTONLINK' style={{display: 'flex',  justifyContent:'center'}}> 
                <Link to="/EditarBodegas" className="nav-link" >
                  <Button type='submit'                     
                    color='primary' variant='contained' 
                    style={btnstyle} fullWidth >IR A EDITAR</Button>
                </Link>
              </div> 
              <div className='AgregarUbicacionInformacion'>   
              </div>      
            </Paper>            
        </Grid>
      </div>
    </div>
  )
}

export default AgregarBodega;
