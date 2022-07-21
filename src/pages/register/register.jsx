import React, {useState} from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from '../../components/sidebar/sidebar'
import axios from 'axios'

import backgroundHome from '../../components/img/bodega.png'


const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${backgroundHome})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    marginLeft: '0',
    marginBottom: '0',
    display: 'flex',
  },
  container: {
      height: '60%',
      marginTop: theme.spacing(20),
      display: 'flex',
      [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
          marginTop: -400,
          marginLeft: 50,
          width: '80%',
          height: '60%'
      }
  },
  div: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
  },
  form: {
      width: '100%',
      marginTop: theme.spacing(1)
  },
  button: {
      margin: theme.spacing(3, 0, 2)
  }
}))


const Login=()=> {
  
  const classes = useStyles()
  //const [show, setShow] = useState(true);
  const [rut,setRut]=useState("")
  const [contrasena,setContrasena]=useState("")
  const [contrasena2,setContrasena2]=useState("")
  const [nombre,setNombre]=useState("")
  
  const user = {
    'rut':rut,
    'nombre':nombre,
    'contrasena':contrasena
  }
  let names;
  const onSubmit=()=>{
    console.log(contrasena);
    console.log(contrasena2);
    if(contrasena !== contrasena2){
        console.log("Ambas son distintas");
    }
    else{
    const request = async () => {
      try {
        const result = await axios.post('http://localhost:4000/api/register',user);
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
      
        if (!result.success) {
            if(result.data.message === "Request failed with status code 500"){
                console.log("ya registrado");
                window.yaregistrado=true;
            }
            if(result.data.message === "Request failed with status code 400"){
                console.log("Ingrese datos.");
            }
        }
        else{
            window.location.href = '/';
        }
              
    })();
  }
}
  if(localStorage.getItem('isLogin')!==null){

    return (
      <Grid container component='main' className={classes.root}>
        <Sidebar/>
          <CssBaseline />
          <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
              <div className={classes.div}>
                  <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>Register</Typography>
                  <form className={classes.form}>
                      <TextField
                          fullWidth
                          autoFocus
                          color='primary'
                          margin='normal'
                          variant='outlined'
                          label='Username'
                          value={user.rut}
                          onChange={(e) => setRut(e.target.value)}
                          name='username'
                      />
                      <TextField
                          fullWidth
                          autoFocus
                          color='primary'
                          margin='normal'
                          variant='outlined'
                          label='Name'
                          value={user.nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          name='Name'
                      />
                      <TextField
                          fullWidth
                          type='password'
                          color='primary'
                          margin='normal'
                          variant='outlined'
                          label='Password'
                          value={user.contrasena}
                          onChange={(e) => setContrasena(e.target.value)}
                          name='password'
                      />
                    <TextField
                          fullWidth
                          type='password'
                          color='primary'
                          margin='normal'
                          variant='outlined'
                          label='Re-enter Password'
                          value={user.contrasena2}
                          onChange={(e) => setContrasena2(e.target.value)}
                          name='password'
                      />
                      <Button
                          fullWidth
                          variant='contained'
                          color='secondary'
                          className={classes.button}
                          onClick={()=> onSubmit()}
                      >
                          Register
                      </Button>
                  </form>
              </div>
          </Container>
      </Grid>
  )
  }
  else{
    window.location.href='/';
  }
}

export default Login
