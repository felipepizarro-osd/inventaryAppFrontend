import React, { useState} from 'react';
import { QrReader } from 'react-qr-reader';
import axios from "axios";
import { Modal, IconButton, Grid } from "@mui/material";
import { QRCode } from "react-qr-svg";
import CloseIcon from "@mui/icons-material/Close";

const Scanner = () => {
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

  const [data, setData] = useState({ sku: "" });
  const [boton, setBoton] = useState(false);

  const handleBoton = () => {
    setBoton(true);
    navigator.mediaDevices
    .getUserMedia({ video: true})
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
  return (
    <>
    <div style={{width:'250px'}}>
      <div>
      <button className="button" onClick={handleBoton}>Activar Camara</button>
      <button className="button" onClick={handleCloseBoton}>Desactivar Camara</button>
       </div>
       {boton === true && <QrReader 
        delay={300}
        onResult={(result) => {
            if (!!result) {
            setData(result?.text);
            searchProduct(result?.text);
          }
        }}
        style={{ width: '100%' }}
      />}
      
      <Modal open={open} onClose={handleClickOpen} >
        {body}
      </Modal>
      
      </div>
    </>
  );
};
export default Scanner;