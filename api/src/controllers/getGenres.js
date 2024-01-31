const axios = require("axios");
require("dotenv").config();
const { GAMES_GENRES_URL, API_KEY } = process.env;
const { Genre, Videogame } = require("../db");

const getGenres = async (req, res) => {
  try {
    const response = await axios.get(`${GAMES_GENRES_URL}?key=${API_KEY}`);
    const { results } = response.data;

    const allGenres = await Promise.all(
      results.map(async (genre) => ({
        id: genre.id,
        name: genre.name,
      }))
    );

    const genresFromDB = await Genre.findAll({
      include: [{ model: Videogame, attributes: ["name"], through: { attributes: [] } }]
    });

    const genresDBFiltered = genresFromDB.map((genre) => ({
        id: genre.id,
        name: genre.name,
    }));

    const finalResponse = [...allGenres, ...genresDBFiltered];
    return res.status(200).send(finalResponse);
  } catch (error) {
    console.error(error); // Registro del error para debugging
    return res.status(500).send("Error al recuperar los Generos");
  }
};

module.exports = {
    getGenres,
};