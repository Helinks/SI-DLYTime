import style from './Css/index.module.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import React, { useState } from 'react'
import img1 from '../../img/9.jpg'

function AdminClientes() {
  const [mNull, setMNull] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [problem, setProblem] = useState('')

  const cleanMessage = async () => {
    setMNull('')
  }

  const handleSendEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      setMNull('Por favor ingresa tu correo')
    } else if (!emailRegex.test(email)) {
      setMNull('Por favor ingresa un correo valido')
    } else if (!message || !problem) {
      setMNull('Por favor llena todos los campos')
    } else {
      setMNull('')
      try {
        const response = await Axios.post(
          'https://backenddlytime-efgpffakcxe2d9e9.brazilsouth-01.azurewebsites.net/enviarCorreo/enviar-soporte',
          {
            to: 'aroca3282@gmail.com',
            subject: 'Soporte desde el sistema',
            message,
            email,
            problem,
          }
        )
        alert(response.data.message) // Notificar al usuario
        setMessage('') // Limpiar el mensaje
      } catch (error) {
        console.error(error)
        alert('Hubo un error al enviar el mensaje.')
      }
    }
  }

  return (
    <div className={style.homeContainer}>

<nav className={`navbar navbar-expand-lg navbar-dark bg-danger ${style.navbar}`}>
  <div className={`container-fluid`}>
    <a className={`navbar-brand`} href="/">Home</a>
    <button className={`navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className={`navbar-toggler-icon`}></span>
    </button>
    <div className={`collapse navbar-collapse ${style.navbarCollapse}`}  id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className={`nav-item ${style.navItem}`}>
          <a className={`nav-link active ${style.navLink}`} aria-current="page" href="/Login">Iniciar sesion</a>
        </li>
        <li className={`nav-item ${style.navItem}`}>
          <a className={`nav-link ${style.navLink}`} href="/SignIn">Registrarse</a>
        </li>
        <li className={`nav-item ${style.navItem}`}>
          <a className={`nav-link ${style.navLink}`} data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-bs-whatever="@mdo" href='/'>Soporte</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Soporte
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={cleanMessage}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Digita un correo al que te podamos contactar:
                  </label>
                  <input
                    type="email"
                    id="TextInputEmail"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Tipo de problema:
                  </label>
                  <select
                    className="form-control"
                    id="message-text"
                    onChange={(e) => setProblem(e.target.value)}
                  >
                    <option></option>
                    <option>Problema al iniciar sesión</option>
                    <option>Problema al agendar una cita</option>
                    <option>Problema con mis datos</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Mensaje:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <h5>{mNull}</h5>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={cleanMessage}
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendEmail}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={style.homeBanner}>
        <img src={img1} alt="Imagen 1" />
        <p>TusLentesShop</p>
      </div>

      <div className={style.homeContentWrapper}>
        <div className={style.homeSchedule}>
          <h2>Horarios de Atención</h2>
          <div className={style.homeScheduleRow}>
          <div className={style.dayRow}><p>Lunes:</p><h5>10a.m - 7:30p.m</h5></div>
  <div className={style.dayRow}><p>Martes:</p><h5>10a.m - 7:30p.m</h5></div>
  <div className={style.dayRow}><p>Miércoles:</p><h5>10a.m - 7:30p.m</h5></div>
  <div className={style.dayRow}><p>Jueves:</p><h5>10a.m - 7:30p.m</h5></div>
  <div className={style.dayRow}><p>Viernes:</p><h5>10a.m - 7:30p.m</h5></div>
  <div className={style.dayRow}><p>Sábado:</p><h5>10a.m - 7:30p.m</h5></div>
  <div className={style.dayRow}><p>Domingo:</p><h5>10a.m - 7:30p.m</h5></div>
          </div>
        </div>
        <div className={style.homeHelp}>
          <h2>Como podemos Ayudarte</h2>
          <div className={style.homeHelpOptions}>
            <button>
              <h5>Asesoria Personalizada</h5>
            </button>
            <button>
              <h5>Jornadas de Salud Visual</h5>
            </button>
            <button>
              <h5>Lentes y Monturas</h5>
            </button>
          </div>
        </div>
      </div>

      <div className={style.homeLocationSection}>
        <div className={style.mapBox}>
        <p>Cra. 78k #35A - 82sur, Bogotá</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8265376707536!2d-74.15526952407288!3d4.6250172953497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9e9e99c8c65d%3A0xd258c208c28cee9d!2sCra.%2078k%20%2335D29%2C%20Kennedy%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1728793972225!5m2!1ses!2sco"
            loading="lazy"
            title="mapa"
            className={style.map}
          ></iframe>
        </div>
        <div className={style.cardBox}>
          <h1>¿Algun problema?</h1>
          Si tienes algún problema o necesitas ayuda, no dudes en contactar
           con nuestro equipo de soporte. ¡Estamos aquí para ayudarte!
          <div className={style.supportButton}>
            <button
              id="links"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              data-bs-whatever="@mdo"
            >
              Soporte
            </button>
          </div>
        </div>
      </div>

      <div className={style.homeFooter}>
        <div className={style.homeSocialIcons}>
          {/* icono de instagram */}
            <a
              href="https://www.instagram.com/tuslentesshop/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
                  <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="60"
            height="60"
            viewBox="0 0 50 50"
          >
              <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"/>
          </svg>
            </a>
          {/* icono de facebook */}
            <a
              href="https://www.facebook.com/tuslentesshop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label='Facebook'
            >
              <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="60"
            height="60"
            viewBox="0 0 50 50"
          >
            <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"/>
          </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminClientes
