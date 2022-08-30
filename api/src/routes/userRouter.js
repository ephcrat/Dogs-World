const { Router } = require("express");
const { User, Dog } = require("../db");
const { getDogsId } = require("./helpers");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { id, name } = req.body;
    const user = await User.findOrCreate({
      where: {
        id,
        name,
      },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});
router.put("/", async (req, res) => {
  try {
    const { id, dogName, del } = req.body;
    const dogDetails = await getDogsId(dogName);
    const findUser = await User.findByPk(id);
    if (!findUser["favorites"]) {
      //if the user doesn't have any favorites, insert the dogName without formatting it
      await findUser.update({ favorites: dogName });
      return res.json(findUser);
    }
    if (del) {
      const currentFavoritesStr = findUser["favorites"];
      const currentFavoritesArr = currentFavoritesStr.split("|");
      const updatedFavorites = currentFavoritesArr
        .filter((d) => d !== dogName)
        .join("|");
      await findUser.update({ favorites: updatedFavorites });
      return res.json(findUser);
    }
    await findUser.update({ favorites: `${findUser["favorites"]}|${dogName}` }); //if the user already has favorites, add the dogName to the favorites string and add a separation between the previous and the latest dogName to make it easier to split
    res.json(findUser);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});
module.exports = router;
