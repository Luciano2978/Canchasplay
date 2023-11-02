import React, { useState, useEffect } from "react";
import "../Assets/css/Not404.css";

const NotFound = () => {
  const sports = ["Futbol", "Tenis", "Basquet", "Voley", "Rugby"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeSport = () => {
    setCurrentIndex((currentIndex + 1) % sports.length);
  };

  useEffect(() => {
    const interval = setTimeout(changeSport, 2300); // Cambia cada 2 segundos

    return () => clearTimeout(interval);
  }, [currentIndex]);

  const currentSport = sports[currentIndex];

  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="ball-container">
          <div className={`ball ${currentSport.toLowerCase()}`}></div>
        </div>
        <div className="error-code">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
        <div className="Tittle-404">
          <h1>¡Oops! Página no encontrada</h1>
        </div>
        <div className="Text-404">
          <p>Lo sentimos, la página que estás buscando no existe.</p>
          <p>¿Quieres volver a la página de inicio?</p>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
