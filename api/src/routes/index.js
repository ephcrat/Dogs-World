const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const dogsRouter = require("./dogsRouter");
const temperamentsRouter = require("./temperamentsRouter");
const userRouter = require("./userRouter");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentsRouter);
router.use("/user", userRouter);
module.exports = router;
