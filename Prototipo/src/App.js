import './App.css';
import Login from './complements/Login';
import IndexAdmin from './complements/IndexAdmin';
import IndexEmpleado from './complements/IndexEmpleado';
import IndexCliente from './complements/IndexCliente';
import SignIn from './complements/SignIn';
import AgendarCita from './complements/AgendarCita';
import Perfil from './complements/Perfil';
import { Route, Routes } from 'react-router-dom';
import './complements/Css/Index.css';






function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/IndexAdmin" element={<IndexAdmin />} />
        <Route path='/IndexEmpleado' element={<IndexEmpleado/>}></Route>
        <Route path='/IndexCliente' element={<IndexCliente/>}></Route>
        <Route path='/SignIn' element={<SignIn/>}></Route>
        <Route path='/AgendarCita' element={<AgendarCita/>}></Route>
        <Route path='/Perfil' element={<Perfil/>}></Route>
      </Routes>
    </div>
    
  );
}

export default App;
