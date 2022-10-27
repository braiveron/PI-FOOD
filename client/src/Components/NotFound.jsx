import React from "react";
import "./Estilos/NotFound.css";
import loader from "../Utilities/loader.gif";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notFound-container">
      <h1 className="title-found">Pagina no encontrada</h1>
      <img
        className="img"
        src={loader}
        alt="img not found"
        width="250px"
        height="250px"
      />
      <Link className="link-cont" to="/">
        <h3 className="link-text">pagina principal</h3>
      </Link>
    </div>
  );
}
