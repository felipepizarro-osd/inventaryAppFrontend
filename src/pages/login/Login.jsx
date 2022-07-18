import React, {useState} from 'react'
import {Grid, Paper, Avatar, TextField, FormGroup, FormControlLabel, Checkbox, Button, CssBaseline} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import Sidebar from '../../components/sidebar/sidebar'
//import Navbar from '../../components/navbar/navbar'
import axios from 'axios'
import "./Login.scss"

//import { FormControlUnstyled } from '@mui/base';

 
//function enviarDatos(user)
//let logeado=false;
//window.isLogin = false;
const Login=()=> {
  const paperStyle={padding :20, height:'50vh',width:280, margin: "80px auto"}
  const avatarStyle={backgroundColor: '#33A5FF'}
  const btnstyle={margin:'8px 0', backgroundColor: '#EA454C'}
  const usuarioStyle={margin: "10px auto"}
  //const  [body,setBody] = useState({rut: '', contrasena: ''})
  const [rut,setRut]=useState("")
  const [contrasena,setContrasena]=useState("")
  
  const user = {
    'rut':rut,
    'contrasena':contrasena
  }
  let names;
  const onSubmit=()=>{
    const request = async () => {
      try {
        const result = await axios.post('http://localhost:4000/api/login',user);
        return {
          success: true,
          data: result
        }
      } catch( error ) {
        return {
          success: false,
          data: error
        }
      }
    };
    ( async() => {
      const result = await request();
      if ( result.success ) {
        if(result.data.data !== 'Incorrect rut and/or Password!' & result.data.data !== 'Please enter rut and Password!' ){
          console.log('Login correcto!');
          console.log('Bienvenido',result.data.data)
          names = result.data.data;
          //<Sidebar persona={names}/>
          if(localStorage.getItem('isLogin')===null){
            localStorage.setItem('isLogin', '"true"');
            localStorage.setItem('name', names);
          }
          window.location.href = '/';
        }
        else{
          console.log('Falló la petición2', result.data);
          //window.location.href = 'http://localhost:3000/login';
        }
      } else {
       console.log('Falló la petición', result.data);
       //window.location.href = 'http://localhost:3000/login';
      }
    })();
  }
  if(localStorage.getItem('isLogin')===null){
  return (
    <div className='login'>
      <Sidebar/>
      <div className='loginConteiner'>
        <Grid>
          <CssBaseline/>    
            <Paper elevation={10} style={paperStyle}> 
              <Grid align = 'center'>
                <Avatar style={avatarStyle}> <LockIcon/> </Avatar>
                <h2>Ingresar</h2>
              </Grid>
              <TextField label='Rut' placeholder='Enter your rut' fullWidth required name='rut' value={user.rut} onChange={(e) => setRut(e.target.value)} style={usuarioStyle}/>
              <TextField label='Password' placeholder='Enter password' type='password' fullWidth required name='contrasena' value={user.contrasena} onChange={(e) => setContrasena(e.target.value)}/>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
              </FormGroup>
              <Button type='submit' color='primary' variant='contained' style={btnstyle} fullWidth onClick={()=> onSubmit()} >Sign In</Button>
            </Paper>
        </Grid>
      </div>
    </div>
  )
  }
  else{
    window.location.href='/';
  }
}

export default Login
