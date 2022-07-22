import React from 'react'

const EditForm = ({product}) => {
  //el sku del producto es lo unico no editable
    const sku = product.sku;

    const [Nombre,setNombre] = useState(product.Nombre)
    const [Nombre_Servicio, setNombreServicio] = useState(product.Nombre_Servicio);
    const [Part_Number, setPartNumber] = useState(product.Part_Number)
    const [Stock, setStock] = useState(product.Stock)
    const [Stock_min, setStockMin] = useState(product.Stock_min)
    const [Unidad, setUnidad] = useState(product.Unidad)

    
 

    return (
        <h4>hola</h4>
  )
}

export default EditForm