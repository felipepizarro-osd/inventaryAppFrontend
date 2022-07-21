import React, {useEffect, useState, Fragment } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from "axios";
import { Modal, IconButton, Grid ,Button} from "@mui/material";
import { QRCode } from "react-qr-svg";
import CloseIcon from "@mui/icons-material/Close";
import "./Scanner.scss";


const Scanner = (props) => {
  //Codigo para mostrar la ventana modal del QR
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    if (data.sku[0] === "" || data.sku[0] === undefined) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  //----------------------------------------------
  const [data, setData] = useState({ sku: "" });
  const [playing,setPlaying]= useState(false);

  const HEIGHT = 300;
  const WIDTH = 300;

  const startVideo = () => {
    setPlaying(true)
    navigator.getUserMedia(
      {video: true,},
      (stream) => {
        let video = document.getElementsByClassName('app_videoFeed')[0];
        if(video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
      )
  }
  const stopVideo = () => {
    setPlaying(false)
    let video = document.getElementsByClassName('app_videoFeed')[0];
    video.srcObject.getTracks()[0].stop();
  }
  //----------------------------------------------
  
  const [product, setProduct] = useState({ Sku: "" });
  const searchProduct = (sku) => {
      axios.get(`http://localhost:4000/api/products/${sku}`).then((response) => {
          setProduct(response.data);
          
          if(response.data !== undefined){
              setOpen(true);
          }
      });
      
  }
  const useStyles = {
    position: "absolute",
    padding: "12px 12px 12px",
    backgroundColor: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
  };
  const prodStyles = {
    borderBottom: "6px",
    padding: "4px",
  };
  const colorStyles = {
    backgroundColor: "#1b5a74",
    color: "white",
  };
  const body = (
    <div className="body" style={useStyles}>
      <Grid container justifyContent="space-between">
        <Grid item>
          <h2>Producto buscado</h2>
        </Grid>
        <Grid
          item
          alignItems="flex-start"
          style={{ transform: "translate(30%, -20%)" }}
        >
          <IconButton size="large" onClick={handleClose}>
            <CloseIcon fontSize="inherit" />{" "}
          </IconButton>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm style={{ display: "block", margin: "auto" }}>
          <QRCode value={product.Sku} level={"L"} style={{ width: 250 }} />
        </Grid>

        <Grid
          item
          sm
          container
          direction="column"
          style={{ marginLeft: "10px", marginRight: "8px" }}
        >
          <p style={prodStyles}>Sku: </p>
          <p style={colorStyles}>{product.Sku}</p>

          <p style={prodStyles}>Nombre: </p>
          <p style={colorStyles}>{product.Nombre}</p>

          <p style={prodStyles}>Nombre de servicio: </p>
          <p style={colorStyles}>{product.Nombre_Servicio}</p>

          <p style={prodStyles}>Part number: </p>
          <p style={colorStyles}>{product.Part_Number}</p>

          <p style={prodStyles}>Stock: </p>
          <p style={colorStyles}>{product.Stock}</p>

          <p style={prodStyles}>Stock minimo: </p>
          <p style={colorStyles}>{product.Stock_min}</p>

          <p style={prodStyles}>Unidad: </p>
          <p style={colorStyles}>{product.Unidad}</p>

          <p style={prodStyles}>Bodega: </p>
          <p style={colorStyles}>{product.Bodega}</p>

          <p style={prodStyles}>Modulo: </p>
          <p style={colorStyles}>{product.Modulo}</p>

          <p style={prodStyles}>Posicion: </p>
          <p style={colorStyles}>{product.Posicion}</p>
        </Grid>
      </Grid>
    </div>
  );
  if(props.o !== false) { 
  return (
    <Fragment>
    <div className="bton">
        {playing ? (<Button style={{color:'white'}} onClick={stopVideo}> Desactivar camara</Button>) : (<Button Button style={{color:'white'}} className="bton" onClick={startVideo}> Activar camara</Button>)}
    </div>
    <div style={{display:'grid', justifyContent:'center', alignItems:'center', backgroundColor:'black'}}>
      <Fragment>
        <video height={HEIGHT} width={WIDTH} muted autoPlay className='app_videoFeed' >   
        {playing ? 
        (
          <QrReader onFind = {playing}/>
         ) :        
        (
        <Fragment>
          <QrReader 
          facingMode={"environment"}
          className='app_videoFeed'
          scanDelay={300}
          onResult={(result) => {
              if (!!result) {
              setData(result?.text);
              searchProduct(result?.text);
            }
          }}
        />
        </Fragment>)
      }
        </video>   
        </Fragment>   
        </div>
      <Modal open={open} onClose={handleClickOpen} >
        {body}
      </Modal>
      
    </Fragment>
  );}
};
export default Scanner;