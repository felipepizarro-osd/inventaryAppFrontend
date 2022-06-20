import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import Single from "./pages/single/single"
import New from "./pages/new/New"


import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import AlmacenarEdit from "./pages/almacenar/almacenarEdit";

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" /> 
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="users">
              <Route index element={<Home/>}/>
              <Route path=":userId" element={<Single/>}/>
              <Route path="new" element={<New/>}/>
            </Route>
            <Route path="products">
              <Route index element={<AlmacenarEdit/>}/>
              <Route path=":productId" element={<Single/>}/>
              <Route path="new" element={<New/>}/>
            </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
