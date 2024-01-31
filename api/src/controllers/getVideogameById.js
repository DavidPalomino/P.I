const { Videogame, Genre } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { ALL_GAMES_URL, API_KEY, DB_NAME } = process.env;

const getVideogameById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length >= 6) {
      const videoGameFromDB = await Videogame.findOne({
        where: { id: id },
        include: [
          {
            model: Genre,
            through: { attributes: [] },
          },
        ],
      });

      if (videoGameFromDB) {
        const videoGameDBFiltered = {
          id: videoGameFromDB.id,
          name: videoGameFromDB.name,
          description: videoGameFromDB.description,
          platforms: videoGameFromDB.platforms,
          image: videoGameFromDB.background_image,
          releasedDate: videoGameFromDB.released,
          rating: videoGameFromDB.rating,
          genres: videoGameFromDB.genres.map((g) => g.name).join(" / "),
        };

        return res.status(200).json(videoGameDBFiltered);
      }
    }

    const response = await axios.get(`${ALL_GAMES_URL}/${id}?key=${API_KEY}`);

    const videoGameData = response.data;

    const pokemonDetails = {
        id: videoGameData.id,
        name: videoGameData.name,
        description: videoGameData.description,
        platforms: videoGameData.platforms,
        image: videoGameData.background_image,
        releasedDate: videoGameData.released,
        rating: videoGameData.rating,
        genres: videoGameData.genres.map(g => g.name).join(' / ')
    };

    return res.status(200).json(pokemonDetails);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getVideogameById,
};

