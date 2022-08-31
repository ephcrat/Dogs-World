import { useNavigate } from "react-router-dom";
import img from "./img.png";
import styles from "./Empty.module.css";

import { useDispatch } from "react-redux";
import { resetFilters } from "../../helpers";
function Empty({ reset, setOrder, setTemp, setSource}) {
  const navigate = useNavigate();

  const handleClick = function () {
    reset ? resetFilters(setOrder, setTemp, setSource) : navigate(-1, { replace: true });
  };
  return (
    <div className={styles.div}>
      <img src={img} alt="404 not found" />
      <button className={styles.button} onClick={() => handleClick()}>
        Go Back
      </button>
    </div>
  );
}

export default Empty;
