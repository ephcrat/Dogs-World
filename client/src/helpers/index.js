import { Link } from "react-router-dom";

export function filters(arr, value) {
  if (!arr) return;
  if (value !== "") {
    if (value === "a-z") {
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (value === "z-a") {
      return arr.sort((a, b) => -1 * a.name.localeCompare(b.name));
    }

    if (value === "0-9") {
      return arr.sort(
        (a, b) =>
          parseInt(a.weight[0] + a.weight[1]) -
          parseInt(b.weight[0] + b.weight[1])
      );
    }

    if (value === "9-0") {
      return arr.sort(
        (a, b) =>
          parseInt(b.weight[0] + b.weight[1]) -
          parseInt(a.weight[0] + a.weight[1])
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

export function renderDog(array, route) {
  return array?.map((dog) => (
    <Link
      to={`/${route}/${encodeURIComponent(dog.name).replace(/%20/g, "-")}`}
      key={dog.id}
    >
      <li>{dog.name}</li>
    </Link>
  ));
}

export function currentDog(arr, indexFirst, indexLast) {
  return arr.slice(indexFirst, indexLast);
}
