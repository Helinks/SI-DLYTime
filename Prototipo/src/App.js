import './App.css';
import Login from './complements/Login';
import IndexAdmin from './complements/IndexAdmin';
import IndexEmpleado from './complements/IndexEmpleado';
import IndexCliente from './complements/IndexCliente';
import SignIn from './complements/SignIn';
import { Route, Routes } from 'react-router-dom';
import './complements/Css/Index.css';
import EmpleadoAdClientes from './complements/EmpleadoAdClientes';
import AdminClientes from './complements/AdminClientes';
import EmpleadoAdCitas from './complements/EmpleadoAdCitas'
import ClienteAdCitas from './complements/ClienteAdCitas';
import Soporte from './complements/Soporte';



function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/IndexAdmin" element={<IndexAdmin />} />
        <Route path='/IndexEmpleado' element={<IndexEmpleado/>}></Route>
        <Route path='/IndexCliente' element={<IndexCliente/>}></Route>
        <Route path='/SignIn' element={<SignIn/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/EmpleadoAdClientes' element={<EmpleadoAdClientes/>}></Route>
        <Route path='/AdminClientes' element={<AdminClientes/>}></Route>
        <Route path='/EmpleadoAdCitas' element={<EmpleadoAdCitas/>}></Route>
        <Route path='/ClienteAdCitas' element={<ClienteAdCitas/>}></Route>
        <Route path='/Soporte' element={<Soporte/>}></Route>
      </Routes>
    </div>
    
  );
}

export default App;
