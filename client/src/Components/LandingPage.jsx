import React from "react";
import { Link } from "react-router-dom";
import "./Estilos/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="background">
      <div className="container">
        <div className="welcome">
          <h1>BIENVENIDOS</h1>
          <h1>A MI PAGINA DE RECETAS</h1>
        </div>
        <Link className="button-landing" to="/home"></Link>

        <div className="footer">
          <h4 className="firma">Dev by Braian Veron</h4>
          <a
            className="linkedin"
            href="https://www.linkedin.com/in/braianveron"
            target="_blank"
          ></a>
          <a
            className="github"
            href="https://github.com/braiveron"
            target="_blank"
          ></a>
        </div>
      </div>
    </div>
  );
}
