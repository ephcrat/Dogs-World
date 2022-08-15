const axios = require("axios");
const { Router } = require("express");
const { Op, Temperament } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const dogs = await axios.get("https://api.thedogapi.com/v1/breeds");
    const dogsTemperaments = dogs.data
      .map((dog) => dog.temperament)
      .flatMap((t) => t?.split(", "))
      .filter((t) => t !== undefined);

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
