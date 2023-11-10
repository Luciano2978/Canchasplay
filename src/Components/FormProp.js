import React, { useState } from "react";
import background from "../Assets/img/fondo.jpg";
import { useForm } from "react-hook-form";
import auth0 from "auth0-js";
import "../Assets/css/FormProp.css";
import { Navigate, useNavigate } from "react-router-dom";


const auth0Config = {
  domain: "dev-gonf6ysh.us.auth0.com",
  clientID:"vLYBJVhpRwmL86MbveaArcYfBbSqyM3N",
  redirectUri: "https://canchas-playfront.onrender.com/callback", // Cambia esto según tu configuración
  responseType: "token id_token",
  scope: "openid profile email",
};

const webAuth = new auth0.WebAuth(auth0Config);

export default function FormProp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const navigate = useNavigate()
  console.log(errors);

  const [errorEmail, setErrorEmail] = useState("");

  const onSubmit = handleSubmit((data) => {
    const email = data.Email;
    const password = data.Contraseña;
    const nombre = data.Nombre;
    const apellido = data.Apellido;
    const dni = data.Dni;
    const telefono = data.Telefono

    webAuth.signup(
      {
        email,
        password,
        connection: "Prueba-Login", // Cambia esto según tu configuración de Auth0
        user_metadata: {
          nombre,
          apellido,
          dni,
          rol: "Propietario",
          telefono
        },
      },
      (err) => {
        if (err) {
          console.error("Error al registrar usuario en Auth0:", err);
          if (err.code === "invalid_signup") {
            setErrorEmail("Este email ya Existe");
          }
        } else {
          alert("Usuario registrado con éxito en Auth0");
          reset();
          navigate("/Login");
        }
      }
    );
  });

  return (
    <div className="App">
      <section>
        <div className="register">
          <div className="col-1">
            <h2 className="tittle">Registrarse</h2>
            <span className="tittle-span">
              Registrate y obten nuestro servicio
            </span>
            <form id="form" className="flex flex-col" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                {...register("Nombre", {
                  required: { value: true, message: "El nombre es Requerido" },
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "El nombre debe tener maximo 20 caracteres",
                  },
                })}
              />
              {errors.Nombre && <h2>{errors.Nombre.message}</h2>}
              <input
                type="text"
                placeholder="Apellido"
                {...register("Apellido", {
                  required: {
                    value: true,
                    message: "El Apellido es Requerido",
                  },
                  minLength: {
                    value: 2,
                    message: "El Apellido debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "El Apellido debe tener maximo 20 caracteres",
                  },
                })}
              />
              {errors.Apellido && <h2>{errors.Apellido.message}</h2>}
              <input
                type="text"
                placeholder="Telefono"
                {...register("Telefono", {
                  required: { value: true, message: "El Telefono es Requerido" },
                  minLength: {
                    value: 10,
                    message: "El Telefono debe contener 10 caracteres",
                  },
                  maxLength: { value: 11, message: "Telefono no valido" },
                  validate: (value) => {
                    if (/^[a-zA-Z]+$/.test(value)) {
                        return("No debe tener letras");
                      }
                  }
                  
                })}
              />{" "}
              {errors.Telefono && <h2>{errors.Telefono.message}</h2>}
              <input
                type="text"
                placeholder="Dni"
                {...register("Dni", {
                  required: { value: true, message: "El Dni es Requerido" },
                  minLength: {
                    value: 8,
                    message: "El DNI debe contener 8 caracteres",
                  },
                  maxLength: { value: 8, message: "DNI no valido" },
                  validate: (value) => {
                    if (/^[a-zA-Z]+$/.test(value)) {
                        return("No debe tener letras");
                      }
                  }
                  
                })}
              />{" "}
              {errors.Dni && <h2>{errors.Dni.message}</h2>}
              <input
                type="email"
                placeholder="Email"
                {...register("Email", {
                  required: { value: true, message: "El email es requerido" },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Correo no valido",
                  },
                })}
              />{" "}
              {errors.Email && <h2>{errors.Email.message}</h2>}
              {errorEmail ? <h2>{errorEmail}</h2> : ""}
              <input
                type="password"
                placeholder="Contraseña"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
                title="La contraseña debe tener al menos 8 caracteres de longitud y contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (por ejemplo, !@#$%^&*)."
                {...register("Contraseña", {
                  required: { value: true, message: "Contraseña Requerida" },
                })}
              />
              {errors.Contraseña && <h2>{errors.Contraseña.message}</h2>}
              <button className="btn" type="submit">
                Registrarse
              </button>
              <button className="btn" onClick={() => navigate("/")}>Volver</button>
            </form>
          </div>
          <div className="col-2">
            <img src={background} alt="bck" />
          </div>
        </div>
      </section>
    </div>
  );
}

/*
webAuth.signup(
    {
      email,
      password,
      connection: "Prueba-Login", // Cambia esto según tu configuración de Auth0
      user_metadata: {
        nombre,
        apellido,
        rol: "Propietario",
      },
    },
    (err) => {
      if (err) {
        console.error("Error al registrar usuario en Auth0:", err);
      } else {
        console.log("Usuario registrado con éxito en Auth0");
      }
    }
  );*/
