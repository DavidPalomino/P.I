const express = require('express');
const { getAllVideoGames } = require('../controllers/getAllVideogames');
const { getVideogameById } = require('../controllers/getVideogameById');
const { createVideogame } = require('../controllers/postVideogame');
const { getGenres } = require('../controllers/getGenres');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = express.Router();
router.get("/videogames", getAllVideoGames)
router.get("/videogames/:id", getVideogameById)
router.get("/genres", getGenres)
router.post("/videogames", createVideogame)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;