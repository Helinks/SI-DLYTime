import React from 'react'
import './Css/PerfilStyle.css';

function Perfil() {
  return (
    <div>
      <div class="contenedor-izquierda">
      <div class="contenedor-izquierda2">
        <div class="imagen_perfil">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
        </div>
        <div class="nombre">
          <b>KEVIN ALEJANDRO AROCA LUNA</b>
        </div>
      </div>
      
    </div>
    <div class="contenedor-derecha">
      <div class="titulo">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
        <h2>Cuenta</h2>
      </div>
      <div class="formulario">
        <form>
            <div class="bloque">
                <div>
                    <b>Nombre</b><br/>
                    <input type="text"/>
                </div>
                <div>
                  <b>Apellido</b><br/>
                  <input type="text"/>
                </div>
            </div>
            <div class="bloque">
                <div>
                  <b>Correo</b><br/>
                  <input type="text"/>
                </div>
                <div>
                  <b>Teléfono</b><br/>
                  <input type="text"/>
                </div>
              </div>
              <div class="bloque">
                <div>
                  <b>Documento</b><br/>
                  <input type="text"/>
                </div>
                <div>
                  <b>Genero</b><br/>
                  <select ></select>
                </div>    
              </div>
              <div class="bloque">
                <div>
                  <b>Contraseña</b><br/>
                  <input type="text"/>
                </div>
              </div>
        </form>
      </div>
      <div class="botones">
        <div>
          <button>Eliminar cuenta</button>
        </div>
        <div>
          <button>Cancelar</button>
          <button>Actualizar</button>
        </div>  
      </div>
    </div>
    </div>

  )
}

export default Perfil
