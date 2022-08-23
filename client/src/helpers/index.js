import { Link } from "react-router-dom";

export function sortOrder(arr, value) {
  if (!arr) return;
  if (value !== "") {
    if (value === "a-z") {
      return arr.sort((a, b) => a.name.localeCompare(b.name)); //localeCompare will act as the compare function of the sort, it'll return -1 if a is lower than b in alphabetical order, 1 if it's higher, and 0 if equal
    }
    if (value === "z-a") {
      return arr.sort((a, b) => -1 * a.name.localeCompare(b.name)); //same as above but in reverse order
    }

    if (value === "0-9") {
      return arr.sort(
        (a, b) => a.weight[0] + a.weight[1] - (b?.weight[0] + b?.weight[1])
      );
    }

    if (value === "9-0") {
      return arr.sort(
        (a, b) => b.weight[0] + b.weight[1] - (a.weight[0] + a.weight[1])
      );
    }
  }
  return arr;
}

export function dynamicSelect(arr) {
  return arr.map((el) => (
    <option key={el.id} value={el.name}>
      {el.name}
    </option>
  ));
}

export function filterByTemp(arr, defaultArr, temp) {
  if (temp === "All") {
    return defaultArr;
  }
  return arr?.filter((d) => d.temperament?.includes(temp));
}

export function filterBySource(arr, defaultArr, source) {
  if (source === "All") {
    return defaultArr;
  }
  return arr.filter((d) => typeof d.id === source); //if the id is a string, it'll return the dogs from the database, if it's a number it'll return the dogs from the api
}
