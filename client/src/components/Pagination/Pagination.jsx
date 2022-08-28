import React from "react";
import styles from "./Pagination.module.css";

function Pagination({
  dogsPerPage,
  allDogsLength,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const numPages = [];

  for (let i = 1; i <= Math.ceil(allDogsLength / dogsPerPage); i++) {
    numPages.push(i);
  }

  return (
    <div className={styles.pages}>
      <nav>
        <ul className={styles.list}>
          {currentPage !== 1 && (
            <button
              className={styles.button}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
          )}
          {numPages.map((number) => (
            <li key={number} className={styles.listItem}>
              <button
                className={
                  currentPage === number ? styles.buttonActive : styles.button
                }
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
          {currentPage !== Math.ceil(allDogsLength / dogsPerPage) &&
            numPages.length !== 0 && (
              <button
                className={styles.button}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            )}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
