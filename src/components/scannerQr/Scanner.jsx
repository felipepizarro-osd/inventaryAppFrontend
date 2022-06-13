import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Scanner = () => {
  const [data, setData] = useState('No result');

  return (
    <>
    <div style={{width:'250px'}}>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
      </div>
    </>
  );
};
export default Scanner;