import { nameprep } from "ethers/lib/utils";
import React from "react";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogDetails, GET_DOG_DETAILS } from "../../actions";

function DogDetails() {
  let { name } = useParams();
  const nameFormated = name.replaceAll("-", " ");

  const dispatch = useDispatch();
  const dogDetails = useSelector((state) => state.dogDetails);

  useEffect(() => {
    //Forma de despachar la acción
    if (name) {
      dispatch(getDogDetails(nameFormated));
    }
    return () => {
      dispatch({ type: GET_DOG_DETAILS, payload: {} });
    };
  }, [dispatch, nameFormated, name]);

  return (
    <div>
      DogDetails
      <ul>
        <li>{dogDetails?.name}</li>
      </ul>
    </div>
  );
}

export default DogDetails;
