import { useNavigate } from "react-router-dom";
import img from "./img.png";
import styles from "./Empty.module.css";

import { resetFilters } from "../../helpers";
import { useDispatch } from "react-redux";
import { getDogs } from "../../actions";

function Empty({ setOrder, setTemp, setSource, setReset }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = function () {
    if (setOrder && setTemp && setSource) {
      setReset(true);
      resetFilters(setOrder, setTemp, setSource);
      setTimeout(() => setReset(false), 100);
    }

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
