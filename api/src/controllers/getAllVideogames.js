const axios = require("axios");
require("dotenv").config();
const { ALL_GAMES_URL, API_KEY, DB_NAME } = process.env;
const { Videogame, Genre } = require("../db");

const getAllVideoGames = async (req, res) => {
  try {
    const response = await axios.get(`${ALL_GAMES_URL}?key=${API_KEY}`);
    const { results } = response.data;

    const allVideoGames = await Promise.all(
      results.map(async (videogame) => ({
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        platforms: videogame.platforms,
        image: videogame.background_image,
        releasedDate: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres.map(g => g.name).join(' / ')
      }))
    );

    const videoGamesFromDB = await Videogame.findAll({
      include: [{ model: Genre, attributes: ["name"], through: { attributes: [] } }]
    });

    const videoGamesDBFiltered = videoGamesFromDB.map((videogame) => ({
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      platforms: videogame.platforms,
      image: videogame.background_image,
      releasedDate: videogame.released,
      rating: videogame.rating,
      genres: videogame.genres.map(g => g.name).join(' / ')
    }));

    const finalResponse = [...allVideoGames, ...videoGamesDBFiltered];
    return res.status(200).send(finalResponse);
  } catch (error) {
    console.error(error); // Registro del error para debugging
    return res.status(500).send("Error al recuperar los videojuegos");
  }
};

module.exports = {
  getAllVideoGames,
};