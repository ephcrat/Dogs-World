const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { getDogs, getDogsId } = require("./helpers");
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const dogsByName = await getDogs(name);
      return res.json(dogsByName);
    }
    const dogs = await getDogs();
    return res.json(dogs);
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
      min_height,
      max_height,
      min_weight,
      max_weight,
      min_life_span,
      max_life_span,
      image,
      origin,
    });

    let findTemperament = await Temperament.findAll({
      where: { name: temperament },
    });
    dog.addTemperament(findTemperament);
    res.json(`${name} was created succesfully!`);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dog = await getDogsId(id);
    res.json(dog);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});

module.exports = router;
