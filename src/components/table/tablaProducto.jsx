import React from "react";
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'

const TablaProducto = (props) => {
    
    return (
        <table className='tabla_producto'>
                <thead>
                  <tr>
                    <th>Sku</th>
                    <th>Nombre</th>
                    <th>Nombre de servicio</th>
                    <th>Part number</th>
                    <th>Stock</th>
                    <th>Stock minimo</th>
                    <th>Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  {props.products.map(products => (
                      <tr key={products.Sku}>
                        <td>{products.Sku}</td>
                        <td>{products.Nombre}</td>
                        <td>{products.Nombre_Servicio}</td>
                        <td>{products.Part_Number}</td>
                        <td>{products.Stock}</td>
                        <td>{products.Stock_min}</td>
                        <td>{products.Unidad}</td>

                        <td>
                        <IconButton variant='outlined' aria-label="delete" onClick={() => {props.deleteProducts(products.Sku)}} >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton variant='outlined' aria-label="edit" >
                            <Edit />
                          </IconButton>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
    )
}
export default TablaProducto;