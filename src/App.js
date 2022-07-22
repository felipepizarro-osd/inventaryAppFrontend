import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import Single from "./pages/single/single"
import New from "./pages/new/New"
import Stock from "./pages/stock/stock"
import Retiro from "./pages/retirar/retirar"
import Agregarproveedor from "./pages/agregarproveedor/Agregarproveedor";
import AgregarBodegas from "./pages/agregarBodegas/AgregarBodegas";
import EditarBodegas from "./pages/editarBodegas/EditarBodegas";
import EditarProveedor from "./pages/editarProveedor/EditarProveedor";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import AlmacenarEdit from "./pages/almacenar/almacenarEdit";
import OrdenCompra from "./pages/OrdenCompra/OrdenCompra";

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" /> 
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="Agregarproveedor" element={<Agregarproveedor/>}/>
            <Route path="AgregarBodegas" element={<AgregarBodegas/>}/>
            <Route path="EditarBodegas" element={<EditarBodegas/>}/>
            <Route path="EditarProveedor" element={<EditarProveedor/>}/>
            <Route path="users">
              <Route index element={<AlmacenarEdit/>}/>
              <Route path=":userId" element={<Single/>}/>
              <Route path="new" element={<New/>}/>
            </Route>
            <Route path="products">
              <Route index element={<AlmacenarEdit/>}/>
              <Route path=":productId" element={<Single/>}/>
              <Route path="new" element={<New/>}/>
            </Route>
            <Route path="revisar_stock">
              <Route index element={<Stock/>}/>
            </Route>
            <Route path="retirar_productos">
              <Route index element={<Retiro/>}/>
            </Route>
            <Route path="ingresar">
              <Route index element={<OrdenCompra/>}/>
            </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
