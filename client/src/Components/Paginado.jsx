import React from "react";
import "./Estilos/Paginado.css";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

export default function Paginado({
  allRecipes,
  receipesPerPage,
  paginado,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / receipesPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <nav className="paginado-container">
      <ul className="paginado">
        <a className="number-arrow" onClick={onPreviousPage}>
          <GrCaretPrevious />
        </a>
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
        <a className="number-arrow" onClick={onNextPage}>
          <GrCaretNext />
        </a>
      </ul>
    </nav>
  );
}
