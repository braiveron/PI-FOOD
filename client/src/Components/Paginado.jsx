import React from "react";
import "./Estilos/Paginado.css";

export default function Paginado({ allRecipes, receipesPerPage, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / receipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="paginado-container">
      <ul className="paginado">
        {pageNumbers?.map((n) => (
          <li className="number" key={n}>
            <a onClick={() => paginado(n)}>{n}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
