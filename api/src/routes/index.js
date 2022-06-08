const { Router } = require('express');
const videogameRoute = require("./VideogameRoute.js")
const genreRouter = require("./GenreRoute.js")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/videogames", videogameRoute)
router.use("/genres", genreRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
