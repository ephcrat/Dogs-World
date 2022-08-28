const axios = require("axios");
const { BASE_URL } = process.env;

const formatDetailedDogs = function (array, place = "api") {
  //place = "api" (default) or "db". Formats the response object with the detailed data hence the dogs from the db and the dogs from the api have the same attributes, and the values are in the same format.
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
        name: dog.name.replace(/[^a-zA-Z ]/g, ""), //get rid of the parentheses in some names
        weight: !dog.weight.metric
          ? dog.weight.imperial //If the metric weight is unavailabe (it appears as NaN in the response object) get the imperial weight
          : dog.weight.metric,
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
        //query data from different models using include (eager loading) https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#eager-loading-with-many-to-many-relationships
        //include the temperaments, get only the name.
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [], //empty array because we don't want anything from the junction table
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

const getDogsId = async function (name, id) {
  if (id) {
    const dogs = await getDogs();
    const dog = dogs.find((dog) => dog.id === id);
    if (!dog) throw new Error("id not found");
    return dog;
  }
  const dogs = await getDogs();
  const dog = dogs.find((dog) => dog.name === name);
  if (!dog) throw new Error("id not found");
  return dog;
};

module.exports = { getDogs, getDogsId, formatDogs };
