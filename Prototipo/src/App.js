import './App.css';
import Login from './complements/Login';
import IndexAdmin from './complements/IndexAdmin';
import IndexEmpleado from './complements/IndexEmpleado';
import IndexCliente from './complements/IndexCliente';
import SignIn from './complements/SignIn';
import AgendarCita from './complements/AgendarCita';
import PerfilCl from './complements/PerfilCl';
import ClienteAdCitas from './complements/ClienteAdCitas';
import EmpleadoAdCitas from './complements/EmpleadoAdCitas';
import { Route, Routes } from 'react-router-dom';
import './complements/Css/Index.css';
import AdminClientes from './complements/AdminClientes';
import Soporte from './complements/Soporte';
import CambiarPass from "./complements/CambiarPass";

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/IndexAdmin" element={<IndexAdmin />} />
        <Route path="/AdminClientes" element={<AdminClientes />} />
        <Route path="/ClienteAdcitas" element={<ClienteAdCitas />} />
        <Route path="/EmpleadoAdcitas" element={<EmpleadoAdCitas />} />
        <Route path='/IndexEmpleado' element={<IndexEmpleado />}></Route>
        <Route path='/IndexCliente' element={<IndexCliente />}></Route>
        <Route path='/SignIn' element={<SignIn />}></Route>
        <Route path='/AgendarCita' element={<AgendarCita />}></Route>
        <Route path='/Perfil' element={<PerfilCl />}></Route>
        <Route path='/Soporte' element={<Soporte />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/CambiarPass' element={<CambiarPass />}></Route>
      </Routes>
    </div>

  );
}

export default App;
