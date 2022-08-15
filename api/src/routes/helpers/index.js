const axios = require("axios");

//place = api (default) or db. Formats the response object hence the dogs from the DB and the dogs from the API have the same attributes, and the values are in the same format.
const formatDogs = function (array, place = "api") {
  if (place !== "api") {
    return array.map(
      (dog) =>
        (dog = {
          id: dog.id,
          name: dog.name,
          image: dog.image,
          weight: dog.weight,
          height: dog.height,
          life_span: dog.life_span,
          origin: dog.origin,
          temperaments: dog.Temperaments.map((t) => t.name),
        })
    );
  }
  return array.map(
    (dog) =>
      (dog = {
        id: dog.id,
        name: dog.name,
        weight: dog.weight.metric,
        image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
        height: dog.height.metric,
        life_span: dog.life_span,
        origin: dog.origin === "" ? null : dog.origin,
        temperaments: dog.temperament?.split(", "),
      })
  );
};

const getDogs = async function (name) {
  if (name) {
    name = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`; //first letter in uppercase and the rest in lowercase
    const breedName = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );
    if (!breedName) throw new Error("Breed not found");
    const dogsApi = formatDogs(breedName.data);
    const dogsDb = await Dog.findAll({
      where: { name: name },
      include: {
        //include the temperaments, get only the name.
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const allDogs = formatDogs(dogsDb, "db").concat(dogsApi);
    return allDogs;
  }

  const dogsApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  const dogsApiFiltered = formatDogs(dogsApi.data);
  const dogsDb = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const allDogs = formatDogs(dogsDb, "db").concat(dogsApiFiltered);
  return allDogs;
};

const getDogsId = async function (id) {
  const dogs = await getDogs();
  const parseId = id.length < 20 ? parseInt(id) : id; //if it's not an UUID, convert it to an integer
  const dog = dogs.find((dog) => dog.id === parseId);
  if (!dog) throw new Error("id not found");
  return dog;
};

module.exports = { getDogs, getDogsId };
