import { useNavigate } from "react-router-dom";
import img from "./img.png";
import styles from "./Empty.module.css";

import { resetFilters } from "../../helpers";
import { useDispatch } from "react-redux";
import { getDogs } from "../../actions";

function Empty({ reset, setOrder, setTemp, setSource }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = function () {
    resetFilters(setOrder, setTemp, setSource);
    dispatch(getDogs());
    navigate("../dogs", { replace: true });
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
