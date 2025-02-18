import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdministrarHorarios from './complements/AdministrarHorarios';
import AgendarCita from './complements/AgendarCita';
import ClienteAdCitas from './complements/ClienteAdCitas';
import CrudCita from './complements/CrudCita';
import CrudClientes from './complements/CrudClientes';
import CrudEmpleados from './complements/CrudEmpleados';
import EmpleadoAdCitas from './complements/EmpleadoAdCitas';
import Index from './complements/index';
import IndexAdmin from './complements/IndexAdmin';
import IndexCliente from './complements/IndexCliente';
import IndexEmpleado from './complements/IndexEmpleado';
import Login from './complements/Login';
import SignIn from './complements/SignIn';
import Perfil from './complements/Perfil';
import CrudClientesEmpleado from './complements/CrudClientesEmpleado';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/IndexCliente" element={<IndexCliente />} />
        <Route path="/IndexEmpleado" element={<IndexEmpleado />} />
        <Route path="/IndexAdmin" element={<IndexAdmin />} />
        <Route path="/CrudClientesEmpleado" element={<CrudClientesEmpleado />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/CrudCita" element={<CrudCita />} />
        <Route path="/AdministrarHorarios" element={<AdministrarHorarios />} />
        <Route path="/EmpleadoAdCitas" element={<EmpleadoAdCitas />} />
        <Route path="/ClienteAdCitas" element={<ClienteAdCitas />} />
        <Route path="/AgendarCita" element={<AgendarCita />} />
        <Route path="/CrudEmpleados" element={<CrudEmpleados />} />
        <Route path="/CrudClientes" element={<CrudClientes />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
