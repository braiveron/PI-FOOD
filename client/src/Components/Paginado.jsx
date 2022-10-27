import React from "react";
import "./Estilos/Paginado.css";

export default function Paginado({
  allRecipes,
  receipesPerPage,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / receipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="paginado-container">
      <ul className="paginado">
        {pageNumbers?.map((n) => (
          <li className="number-li" key={n}>
            <a
              className={`number ${n === currentPage ? "current" : ""}`}
              onClick={() => paginado(n)}
            >
              {n}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
