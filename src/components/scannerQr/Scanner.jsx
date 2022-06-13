import React, { useState} from 'react';
import { QrReader } from 'react-qr-reader';

const Scanner = () => {
  const [data, setData] = useState('No result');
  const [boton, setBoton] = useState(false);
  const handleBoton = () => {setBoton(!boton)};
  return (
    <>
    <div style={{width:'250px'}}>
      <div>
      <button className="button" onClick={handleBoton}>Camara</button>
       </div>
       {boton === true && <QrReader 
        delay={300}
        onResult={(result) => {
          if(boton === true){
            if (!!result) {
            setData(result?.text);
          }
        }
        }}
        style={{ width: '100%' }}
      />}
      <p>{data}</p>
      </div>
    </>
  );
};
export default Scanner;