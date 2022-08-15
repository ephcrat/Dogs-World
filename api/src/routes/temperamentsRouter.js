const { Router } = require("express");
const { Temperament } = require("../db");
const { getDogs } = require("./helpers");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const dogs = await getDogs();
    const dogsTemperaments = dogs
      .flatMap((dog) => dog.temperament)
      .filter(Boolean);

    dogsTemperaments.forEach((t) =>
      Temperament.findOrCreate({
        where: { name: t },
      })
    );
    const temperaments = await Temperament.findAll();
    res.json(temperaments);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});
module.exports = router;
