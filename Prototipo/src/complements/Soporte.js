import React from "react";
import { Link } from "react-router-dom";
import "./Css/Soporte.css";

function Soporte() {
    function validar() {
        alert("Mensaje Enviado");
    }

    return (
        <div className="Body">
            <div className="navBar">
                <nav className="navbar navbar-dark bg-danger">
                    <div className="container-fluid">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarToggleExternalContent"
                            aria-controls="navbarToggleExternalContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <Link to="/IndexCliente">
                                <div className="BackButton">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        fill="currentColor"
                                        className="bi bi-box-arrow-right"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </button>
                    </div>
                </nav>
            </div>

            <div>
                <>
                    <div
                        className="body-login"
                        style={{ backgroundImage: "url(img/fondo.png)" }}
                    >
                        <div className="contenedor-formulario">
                            <div className="information">
                                <div className="izquierda">
                                    <h2>Compartenos tu inquietud!</h2>
                                </div>
                            </div>
                            <div className="derecha">
                                <form className="form" method="POST" noValidate>
                                    <h1 id="Titulo">
                                        <b>Mensaje</b>
                                    </h1>
                                    <div className="inputs">
                                        <div className="col-md">
                                            <select
                                                className="form-select"
                                                aria-label="Tipo de Problema"
                                            >
                                                <option>Tipo de Documento:</option>
                                                <option value="1">Agendamiento de cita</option>
                                                <option value="2">Problema con el Aplicativo</option>
                                                <option value="3">otro.</option>
                                            </select>
                                        </div>
                                        <div className="input-group mb-3">
                                            <div class="form-floating">
                                                <textarea
                                                    class="form-control"
                                                    placeholder="Comentarios"
                                                    id="floatingTextarea2"
                                                    style={{ height: '150px', resize: 'none', width: "132%" }}
                                                ></textarea>
                                                <label for="floatingTextarea2">Comentarios</label>
                                            </div>
                                        </div>
                                        <button type="button" class="Enviar-soporte" onClick={validar}>Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
}

export default Soporte;
