import React from "react";

function Pagination({ dogsPerPage, allDogs, paginate }) {
  const numPages = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    numPages.push(i);
  }

  return (
    <nav>
      <ul>
        {numPages.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
