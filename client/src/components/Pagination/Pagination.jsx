import React from "react";
import { useSelector } from "react-redux";
import { setCurrentPage } from "../../actions";
import styles from "./Pagination.module.css";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
function Pagination({ allDogsLength }) {
  const currentPage = useSelector((state) => state.currentPage);
  const dogsPerPage = useSelector((state) => state.dogsPerPage);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const numPages = [];

  for (let i = 1; i <= Math.ceil(allDogsLength / dogsPerPage); i++) {
    numPages.push(i);
  }

  const handleNext = function (value) {
    if (value) {
      dispatch(setCurrentPage(value));
      return setSearchParams({ page: value });
    }
    dispatch(setCurrentPage(currentPage + 1));
    setSearchParams({ page: currentPage + 1 });
  };

  const handlePrev = function () {
    dispatch(setCurrentPage(currentPage - 1));
    setSearchParams({ page: currentPage - 1 });
  };
  return (
    <div className={styles.pages}>
      <nav>
        <ul className={styles.list}>
          {currentPage !== 1 && (
            <button className={styles.button} onClick={() => handlePrev()}>
              Prev
            </button>
          )}
          {numPages.map((number) => (
            <li key={number} className={styles.listItem}>
              <button
                className={
                  currentPage === number ? styles.buttonActive : styles.button
                }
                onClick={() => handleNext(number)}
              >
                {number}
              </button>
            </li>
          ))}
          {currentPage !== Math.ceil(allDogsLength / dogsPerPage) &&
            numPages.length !== 0 && (
              <button className={styles.button} onClick={() => handleNext()}>
                Next
              </button>
            )}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
