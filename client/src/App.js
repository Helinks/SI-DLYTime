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
import ProtectedRoute from './complements/RutaProtegida';
import SignIn from './complements/SignIn';
import Perfil from './complements/Perfil';
import CrudClientes_Empleado from './complements/CrudClientes_Empleado';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route 
          path="/IndexCliente" 
          element={
            <ProtectedRoute requiredRole={[1]}>
              <IndexCliente />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/IndexEmpleado" 
          element={
            <ProtectedRoute requiredRole={[2]}>
              <IndexEmpleado />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/IndexAdmin" 
          element={
            <ProtectedRoute requiredRole={[3]}>
              <IndexAdmin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/CrudClientes_Empleado" 
          element={
            <ProtectedRoute requiredRole={[2,3]}>
              <CrudClientes_Empleado />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Perfil" 
          element={
            <ProtectedRoute requiredRole={[1,2,3]}>
              <Perfil />
            </ProtectedRoute>
          } 
        />
        <Route path="/CrudCita" 
        element={
            <ProtectedRoute requiredRole={[2,3]}>
              <CrudCita />
            </ProtectedRoute>
          }  />

        <Route path="/AdministrarHorarios"   
        element={
            <ProtectedRoute requiredRole={[2,3]}>
              <AdministrarHorarios />
            </ProtectedRoute>
          }  />

        <Route path="/EmpleadoAdCitas"   
        element={
            <ProtectedRoute requiredRole={[2]}>
              <EmpleadoAdCitas />
            </ProtectedRoute>
          }  />

        <Route path="/ClienteAdCitas"  element={
            <ProtectedRoute requiredRole={[1]}>
              <ClienteAdCitas />
            </ProtectedRoute>
          }  />

        <Route path="/AgendarCita"  element={
            <ProtectedRoute requiredRole={[1]}>
              <AgendarCita />
            </ProtectedRoute>
          }  />
        <Route path="/CrudEmpleados"  element={
            <ProtectedRoute requiredRole={[3]}>
              <CrudEmpleados />
            </ProtectedRoute>
          }  />
        <Route path="/CrudClientes"  element={
            <ProtectedRoute requiredRole={[2,3]}>
              <CrudClientes />
            </ProtectedRoute>
          }  />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route 
          path="/IndexCliente" 
          element={
            <ProtectedRoute requiredRole={[1]}>
              <IndexCliente />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/IndexEmpleado" 
          element={
            <ProtectedRoute requiredRole={[2,3]}>
              <IndexEmpleado />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/IndexAdmin" 
          element={
            <ProtectedRoute requiredRole={[3]}>
              <IndexAdmin />
            </ProtectedRoute>
          } 
        />
        <Route path="/CrudCita" 
        element={
            <ProtectedRoute requiredRole={[2]}>
              <CrudCita />
            </ProtectedRoute>
          }  />

        <Route path="/AdministrarHorarios"   
        element={
            <ProtectedRoute requiredRole={[2]}>
              <AdministrarHorarios />
            </ProtectedRoute>
          }  />

        <Route path="/EmpleadoAdCitas"   
        element={
            <ProtectedRoute requiredRole={[2]}>
              <EmpleadoAdCitas />
            </ProtectedRoute>
          }  />

        <Route path="/ClienteAdCitas"  element={
            <ProtectedRoute requiredRole={[1]}>
              <ClienteAdCitas />
            </ProtectedRoute>
          }  />

        <Route path="/AgendarCita"  element={
            <ProtectedRoute requiredRole={[1]}>
              <AgendarCita />
            </ProtectedRoute>
          }  />
        <Route path="/CrudEmpleados"  element={
            <ProtectedRoute requiredRole={[3]}>
              <CrudEmpleados />
            </ProtectedRoute>
          }  />
        <Route path="/CrudClientes"  element={
            <ProtectedRoute requiredRole={[2]}>
              <CrudClientes />
            </ProtectedRoute>
          }  />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;


