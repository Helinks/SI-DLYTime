import './Css/StyleCambiarPass.css';
import { Route, Routes } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";

const Menu = () => {

  return <div background="img/fondo.png" className="body-cp">
    <div class="contenedor-formulario-cp">
      <div class="information-cp">
        <div class="izquierda-cp">
          <h2>Tuslentes Shop</h2>

        </div>
      </div>
      <div class="derecha-cp">
        <form class="form-cp" method="" novalidate>

          <h1 id="Titulo-cp"><b>Recuperar contraseña</b></h1>
          <label>
            <input id="ancho_correo-cp" type="correo" placeholder="correo" name="correo" />
          </label>
        </form>
        <div class="botones-cp">
          <input type="submit" value="Recuperar" class="Recuperar-cp" name="Recuperar" /><br />
          <Link to="/"
          ><input type="submit" value="Cancelar" class="Cancelar-cp" name="Cancelar" />
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  </div>
}

function CambiarPass() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Menu />} >
        </Route>
      </Routes>

    </div>



  );
}

export default CambiarPass;
