import React, {useState} from 'react'
import {Grid, Paper, Avatar, TextField, FormGroup, FormControlLabel, Checkbox, Button, CssBaseline} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar/navbar'
import axios from 'axios'
import "./Login.scss"
import { FormControlUnstyled } from '@mui/base';


const Login=()=> {
  const paperStyle={padding :20, height:'50vh',width:280, margin: "80px auto"}
  const avatarStyle={backgroundColor: '#33A5FF'}
  const btnstyle={margin:'8px 0', backgroundColor: '#EA454C'}
  const usuarioStyle={margin: "10px auto"}
  const  [body,setBody] = useState({rut: '', contrasena: ''})

  const inputChange = ({target}) =>{
    const {name, value} = target
    setBody({
      ...body,
      [name]: value
    })
  }
  const onSubmit=(body)=>{
    console.log(body)
    axios.get(`http://localhost:4000/api/usuarios/${body.rut}`)
    .then(({data})=>{
      console.log(data)
    })
    .catch(({response})=>{
      FormControlUnstyled.log(response)
    })
  }

  return (
    <div className='login'>
      <Sidebar/>
      <div className='loginConteiner'>
        <Grid>
          <CssBaseline/>    
          <Navbar/>
            <Paper elevation={10} style={paperStyle}> 
              <Grid align = 'center'>
                <Avatar style={avatarStyle}> <LockIcon/> </Avatar>
                <h2>Ingresar</h2>
              </Grid>
              <TextField label='Rut' placeholder='Enter your rut' fullWidth required name='rut' value={body.rut} onChange={inputChange} style={usuarioStyle}/>
              <TextField label='Password' placeholder='Enter password' type='password' fullWidth required name='contrasena' value={body.password} onChange={inputChange}/>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
              </FormGroup>
              <Button type='submit' color='primary' variant='contained' style={btnstyle} fullWidth onClick={()=> onSubmit(body)} >Sign In</Button>
            </Paper>
        </Grid>
      </div>
    </div>
  )
}

export default Login