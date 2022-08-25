const { Router } = require("express");
const { User, Dog } = require("../db");
const { getDogsId } = require("./helpers");
const router = Router();

router.get("/", async (req, res) => {
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
    const { id, dogName } = req.body;
    const dogDetails = await getDogsId(dogName);
    const findUser = await User.findByPk(id);
    if (!findUser["favorites"]) {
      await findUser.update({ favorites: dogName });
      return res.json(findUser);
    }
    console.log(findUser["favorites"]);
    await findUser.update({ favorites: `${findUser["favorites"]}|${dogName}` });
    res.json(findUser);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});
module.exports = router;
