import React, {useEffect, useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from "axios";
import { Modal, IconButton, Grid ,Button} from "@mui/material";
import { QRCode } from "react-qr-svg";
import CloseIcon from "@mui/icons-material/Close";
import "./Scanner.scss";

const Scanner = () => {
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
  const [boton, setBoton] = useState(false);

  const handleBoton = () => {
    setBoton(true);
  };
  const handleCloseBoton =  () => {
    setBoton(false);
  };

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
        </Grid>
      </Grid>
    </div>
  );
  const [mystream, setmystream] = useState(false);
  const [videoswitch, setvideo] = useState(true);
  const myvideo = useRef(null);
  
  useEffect(() => {
    navigator.mediaDevices
        .getUserMedia({ video: true})
        .then((stream) => {
            myvideo.current.srcObject = stream;
            myvideo.current.autoplay = true;
            myvideo.current.muted = false;
            setmystream(stream);
        });
}, []);

const handleVideo = () => {
    if (videoswitch) {
        setvideo(false);
        mystream.getTracks().forEach(function (track) {
            if (track.readyState === "live" && 
                track.kind === "video") {
                track.enabled = false;
            }
        });
    } else {
        setvideo(true);
        mystream.getTracks().forEach(function (track) {
            if (track.readyState === "live" && 
                track.kind === "video") {
                track.enabled = true;
            }
        });
    }
};
  return (
    <>
    <div className="bton">
        <Button size="large" variant="contained" onClick={handleVideo}>{videoswitch ? "Desactivar camara" : 
                    "Activar camara"}</Button>
    </div>
    <div> 
       <video ref={myvideo} style={{width: '100%', height:'200px'}}><QrReader 
          delay={300}
          onResult={(result) => {
              if (!!result) {
              setData(result?.text);
              searchProduct(result?.text);
            }
          }}
        /></video>
      
      <Modal open={open} onClose={handleClickOpen} >
        {body}
      </Modal>
      
      </div>
    </>
  );
};
export default Scanner;