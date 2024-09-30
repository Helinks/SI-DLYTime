import './App.css';
import Login from './complements/Login';
import IndexAdmin from './complements/IndexAdmin';
import IndexEmpleado from './complements/IndexEmpleado';
import IndexCliente from './complements/IndexCliente';
import SignIn from './complements/SignIn';
import AgendarCita from './complements/AgendarCita';
import Perfil from './complements/Perfil';
import PerfilCl from './complements/PerfilCl';
import ClienteAdCitas from './complements/ClienteAdCitas';
import EmpleadoAdCitas from './complements/EmpleadoAdCitas';
import AdminAdCitas from './complements/AdminAdCitas';
import { Route, Routes } from 'react-router-dom';
import './complements/Css/Index.css';
import AdminClientes from './complements/AdminClientes';
import AdminEmpleados from './complements/AdminEmpleados';
import Soporte from './complements/Soporte';
import CambiarPass from "./complements/CambiarPass";
import EmpleadoAdClientes from "./complements/EmpleadoAdClientes";
import AdministrarHorarios from "./complements/AdministrarHorarios";
import EmpleadoAdHorarios from "./complements/EmpleadoAdHorarios";

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/IndexAdmin" element={<IndexAdmin />} />
        <Route path="/AdminClientes" element={<AdminClientes />} />
        <Route path="/AdminEmpleados" element={<AdminEmpleados />} />
        <Route path="/ClienteAdcitas" element={<ClienteAdCitas />} />
        <Route path="/EmpleadoAdcitas" element={<EmpleadoAdCitas />} />
        <Route path="/AdminAdcitas" element={<AdminAdCitas />} />
        <Route path='/IndexEmpleado' element={<IndexEmpleado />}></Route>
        <Route path='/IndexCliente' element={<IndexCliente />}></Route>
        <Route path='/SignIn' element={<SignIn />}></Route>
        <Route path='/AgendarCita' element={<AgendarCita />}></Route>
        <Route path='/PerfilCl' element={<PerfilCl />}></Route>
        <Route path='/Perfil' element={<Perfil />}></Route>
        <Route path='/Soporte' element={<Soporte />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/CambiarPass' element={<CambiarPass />}></Route>
        <Route path='/EmpleadoAdClientes' element={<EmpleadoAdClientes />}></Route>
        <Route path='/AdministrarHorarios' element={<AdministrarHorarios />}></Route>
        <Route path='/EmpleadoAdHorarios' element={<EmpleadoAdHorarios />}></Route>
      </Routes>
    </div>

  );
}

export default App;
