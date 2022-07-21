import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Editar from '../../components/edit/Editar'
import  './almacenarEdir.scss'
import backgroundHome from '../../components/img/bodega.png'
import { makeStyles } from '@material-ui/core/styles'
import {Grid, Container, Paper, Typography, Avatar, CssBaseline} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'

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
      height: '30%',
      marginTop: theme.spacing(20),
      display: 'flex',
      [theme.breakpoints.down(700 + theme.spacing(2) + 2)]: {
        marginTop: -300,
        marginLeft: 20,
          width: '5%',
          height: '30%'
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
}))
const AlmacenarEdit = () => {
  //console.log(localStorage.getItem('isLogin'));
  const classes = useStyles()
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
                  <Typography component='h1' variant='subtitle1'>DEBE INICIAR SESION</Typography>
              </div>
          </Container>
      </Grid>
    )
  }
  else{
    return (
      <section className='home'>
      <div >  
        <Sidebar className='sidebar'/>
      </div>
      <div className='homeConteiner'>
        <div className='table'>
          <Editar/>
        </div>
      </div>
      </section>
    )
  }
}

export default AlmacenarEdit