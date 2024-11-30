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



function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path='/SignIn' element={<SignIn />}></Route>
        <Route path='/IndexCliente' element={<IndexCliente />}></Route>
        <Route path='/IndexEmpleado' element={<IndexEmpleado />}></Route>
        <Route path='/CrudCita' element={<CrudCita />}></Route>
        <Route path='/AdministrarHorarios' element={<AdministrarHorarios/>}></Route>
        <Route path='/EmpleadoAdCitas' element={<EmpleadoAdCitas/>}></Route>
        <Route path='/ClienteAdCitas' element={<ClienteAdCitas/>}></Route>
        <Route path='/AgendarCita' element={<AgendarCita/>}></Route>
        <Route path='/CrudCita' element={<CrudCita/>}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/CrudEmpleados' element={<CrudEmpleados />}></Route>
        <Route path='/IndexAdmin' element={<IndexAdmin />}></Route>
        <Route path='/CrudClientes' element={<CrudClientes />}></Route>
      </Routes>
    </div>

  );
}

export default App;
