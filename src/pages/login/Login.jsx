import React, {useState} from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from '../../components/sidebar/sidebar'
import axios from 'axios'
import "./Login.scss"
import backgroundHome from '../../components/img/backgroundHome.jpg'


const useStyles = makeStyles(theme => ({
  root: {
      backgroundImage: `url(${backgroundHome})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'
  },
  container: {
      height: '60%',
      marginTop: theme.spacing(20),
      [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
          marginTop: 0,
          width: '100%',
          height: '100%'
      }
  },
  div: {
      marginTop: theme.spacing(8),
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

          names = result.data.data;

          if(localStorage.getItem('isLogin')===null){
            localStorage.setItem('isLogin', '"true"');
            localStorage.setItem('name', names);
          }
          window.location.href = '/';
        }
        else{

          window.location.href = 'http://localhost:3000/login';
        }
      } else {

       window.location.href = 'http://localhost:3000/login';
      }
    })();
  }
  if(localStorage.getItem('isLogin')===null){

    return (
      <Grid container component='main' className={classes.root}>
        <Sidebar/>
          <CssBaseline />
          <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
              <div className={classes.div}>
                  <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>Sign In</Typography>
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
                          type='password'
                          color='primary'
                          margin='normal'
                          variant='outlined'
                          label='Password'
                          value={user.contrasena}
                          onChange={(e) => setContrasena(e.target.value)}
                          name='password'
                      />
                      <Button
                          fullWidth
                          variant='contained'
                          color='secondary'
                          className={classes.button}
                          onClick={()=> onSubmit()}
                      >
                          Sign In
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
