import React from "react";
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'


const TablaBodegasEstanteria = (props) => {
    
    return (
        <table className='tabla_producto'>
                <thead>
                  <tr>
                    <th>Bodega</th>
                    <th>Modulo</th>
                    <th>Posiciono</th>
                    <th>Sku_Producto</th>
                    <th>Num_Prod_Guardados</th>
                  </tr>
                </thead>
                <tbody>
                  {props.estanteria.map(estanteria => (
                      <tr key={estanteria.Bodega}>
                        <td>{estanteria.Bodega}</td>
                        <td>{estanteria.Modulo}</td>
                        <td>{estanteria.Posicion}</td>
                        <td>{estanteria.Sku_Producto}</td>
                        <td>{estanteria.Num_Prod_Guardados}</td>

                        <td>
                        
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
    )
}
export default TablaBodegasEstanteria;