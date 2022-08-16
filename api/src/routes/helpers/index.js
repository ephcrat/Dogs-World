const axios = require("axios");
const { BASE_URL } = process.env;

//place = api (default) or db. Formats the response object with the detailed data hence the dogs from the DB and the dogs from the API have the same attributes, and the values are in the same format.
const formatDetailedDogs = function (array, place = "api") {
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
          temperament: dog.Temperaments.map((t) => t.name),
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
        temperament: dog.temperament?.split(", "),
      })
  );
};

const formatDogs = async function (array) {
  //return only the data needed for the main route (id, name, weight, temperaments)
  return (dogs = array.map((dog) => {
    let { height, life_span, origin, ...rest } = dog;
    return rest;
  }));
};

const getDogs = async function (name) {
  if (name) {
    name = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`; //first letter in uppercase and the rest in lowercase
    const breedName = await axios.get(`${BASE_URL}/search?q=${name}`);
    if (!breedName) throw new Error("Breed not found");
    const dogsApi = formatDetailedDogs(breedName.data);
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

    const allDogs = formatDetailedDogs(dogsDb, "db").concat(dogsApi);
    return allDogs;
  }

  const dogsApi = await axios.get(BASE_URL);
  const dogsApiFiltered = formatDetailedDogs(dogsApi.data);
  const dogsDb = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const allDogs = formatDetailedDogs(dogsDb, "db").concat(dogsApiFiltered);
  return allDogs;
};

const getDogsId = async function (id) {
  const dogs = await getDogs();
  const parseId = id.length < 20 ? parseInt(id) : id; //if it's not an UUID, convert it to an integer
  const dog = dogs.find((dog) => dog.id === parseId);
  if (!dog) throw new Error("id not found");
  return dog;
};

module.exports = { getDogs, getDogsId, formatDogs };
