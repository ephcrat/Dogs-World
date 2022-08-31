const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { getDogs, getDogsId, formatDogs } = require("./helpers");
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const dogsByName = await getDogs(name);
      const dogs = await formatDogs(dogsByName); //return only the necessary data for the main route
      return res.json(dogs);
    }
    const dogs = await getDogs();
    const dogsFormated = await formatDogs(dogs);
    res.json(dogsFormated);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});
router.post("/", async (req, res) => {
  const {
    name,
    min_height,
    max_height,
    min_weight,
    max_weight,
    min_life_span,
    max_life_span,
    image,
    origin,
    temperament,
  } = req.body;
  if (
    !name ||
    !min_height ||
    !max_height ||
    !min_weight ||
    !max_weight ||
    !min_life_span ||
    !max_life_span ||
    !image
  )
    throw new Error("Missing required attributes");
  try {
    let dog = await Dog.create({
      name,
      min_height: +min_height,
      max_height: +max_height,
      min_weight: +min_weight,
      max_weight: +max_weight,
      min_life_span: +min_life_span,
      max_life_span: +max_life_span,
      image,
      origin,
    });

    temperament.map(async (t) => {
      let findTemperament = await Temperament.findAll({
        where: { name: t },
      });
      dog.addTemperament(findTemperament);
    });

    res.json(`${name} was created succesfully!`);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});

router.get("/:name", async (req, res) => {
  const { name } = req.params; //All dog names from the API and DB are unique. In this case I'm using the name as the identifier instead of the id to improve SEO.
  try {
    const dog = await getDogsId(name);
    res.json(dog);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});

router.delete("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    await Dog.destroy({
      where: { name: name },
    });
    res.json(`Breed ${name} has been deleted sucessfully`);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});

module.exports = router;
