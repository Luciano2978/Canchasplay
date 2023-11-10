import React from "react";
import "../Assets/css/HomePage.css";
import back from "../Assets/img/GROUND.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  // Login AUTH0

  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      logout({ logoutParams: { returnTo: "https://canchas-play.onrender.com/" } })
    }
  };

  return (
    <div>
      <section className="hero">
        <header>
          <h2 className="company-name">Canchas Play!</h2>
          <nav className="mainmenu">
            <button className="login-button" onClick={handleLoginClick}>
              {isAuthenticated ? "Cerrar Sesión" : "Iniciar Sesión"}
            </button>
          </nav>
        </header>
        <img className="hero-image" src={back} alt="" />
        <div className="hero-message">
          <h1>
            Bienvenido
            <br />A canchas Play!
          </h1>
        </div>
      </section>

      <section className="about_us">
        <div className="row nomargin">
          <h2 className="section_title">Sobre Nosotros</h2>
        </div>
        <div className="row row2">
          <div>
            <h2>
              ¡Bienvenido a "CanchasPlay"! Somos tu destino en línea para
              encontrar y reservar canchas deportivas de manera rápida y
              sencilla.
            </h2>
            <p>
              Ya sea que estés buscando el lugar perfecto para jugar tu deporte
              favorito o que seas un propietario que desea publicar su cancha,
              CanchasPlay te ofrece la solución perfecta. Explora nuestras
              opciones de búsqueda personalizadas y disfruta de una experiencia
              deportiva sin complicaciones. ¡Únete a nosotros y lleva tu pasión
              por el deporte al siguiente nivel!"
            </p>
          </div>
          <div>
            <figure>
              <img
                src="https://st2.depositphotos.com/1005563/5210/i/450/depositphotos_52108211-stock-photo-sport-balls-with-rackets.jpg"
                alt=""
              />
              <figcaption>Imagen de prueba</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="services" id="nuestros-servicios">
        <div className="row nomargin">
          <h2 className="section_title">Nuestros Servicios</h2>
        </div>
        <div className="row row4">
          <div className="service">
            <p>
              <span className="highlight"> Reservas Intuitivas:</span> Creamos
              una plataforma de reserva con una interfaz amigable que te permite
              encontrar y reservar canchas de forma rápida y sencilla.
            </p>
          </div>
          <div className="service">
            <p>
              <span className="highlight">Reservas en Tiempo Real: </span>{" "}
              Nuestro sistema de reservas actualiza la disponibilidad de las
              canchas al instante, evitando duplicados y garantizando
              información precisa.
            </p>
          </div>
          <div className="service">
            <p>
              <span className="highlight"> Planificación Sencilla:</span> Te
              ofrecemos un calendario claro para ver fechas y horarios
              disponibles, facilitando la planificación de tus actividades
              deportivas.
            </p>
          </div>
          <div className="service">
            <p>
              <span className="highlight"> Personalización Total:</span>{" "}
              Personaliza tu búsqueda de canchas según deporte, ubicación y
              características de la cancha.
            </p>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="row nomargin">
          <h2 className="section_title white">Staff</h2>
        </div>
        <div className="row row4mobile">
          <div className="profile">
            <figure>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/octavector-stock3.jpg"
                alt=""
              />
            </figure>
            <p className="profile_name">Luciano Rojas</p>
            <p className="profile_position">Jefe del Proyecto</p>
          </div>
          <div className="profile">
            <figure>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/octavector-stock3.jpg"
                alt=""
              />
            </figure>
            <p className="profile_name">Martin Ortega</p>
            <p className="profile_position">Programador</p>
          </div>
          <div className="profile">
            <figure>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/octavector-stock3.jpg"
                alt=""
              />
            </figure>
            <p className="profile_name">Juan Medina</p>
            <p className="profile_position">Programador</p>
          </div>
          <div className="profile">
            <figure>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/octavector-stock3.jpg"
                alt=""
              />
            </figure>
            <p className="profile_name">Agustin Figueroa</p>
            <p className="profile_position">Programador</p>
          </div>
        </div>
      </section>

      <section className="Propietario">
        <div className="row nomargin">
          <h2 className="section_title">Unete a Nosotros </h2>
        </div>
        <div className="row row2">
          <div>
            <h2 className="proptext">
              Si tienes en propiedad una cancha y quieres Publicarla, Registrate
              Aqui
            </h2>
          </div>
          <button onClick={() => navigate("/RegistroPropietario")}>
            Propietario
          </button>
        </div>
        <h2 className="texto"></h2>
        <div className="row row2">
          <div>
            <h2 className="proptext">Si no tienes cuenta como Usuario registrate aqui</h2>
          </div>
          <button className="registrocliente" onClick={() => loginWithRedirect()}>Usuario</button>
        </div>
      </section>

      <footer>
        <div className="row row4">
          <div>
            <address>
              <h3>Contacto</h3>
              <p>
                <a href="mailto:">canchasplay@gmail.com</a>
              </p>
            </address>
          </div>
          <div></div>
          <div>
            <h3>Social</h3>
            {/* Icons thanks to iconmonstr.com */}
            {/* Facebook */}
            <a href="#" className="icon" title="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M0 0v24h24v-24h-24zm16 7h-1.923c-.616 0-1.077.252-1.077.889v1.111h3l-.239 3h-2.761v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"
                />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="icon" title="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M0 0v24h24v-24h-24zm18.862 9.237c.208 4.617-3.235 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.079-4.03 3.198-4.03.944 0 1.797.398 2.396 1.037.748-.147 1.451-.42 2.085-.796-.245.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.44.656-.997 1.234-1.638 1.697z"
                />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="icon" title="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
