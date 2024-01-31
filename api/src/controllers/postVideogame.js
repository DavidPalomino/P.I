const { Videogame, Genre } = require('../db'); 

const createVideogame = async (req, res) => {
  try {
    const { name, description, platforms, imagen, releaseDate, genres, rating } = req.body;

    if (!name || !description || !platforms || !imagen || !releaseDate || !genres || !rating ) {
      return res.status(400).json({ error: 'Por favor, proporciona todos los datos necesarios para postear tu videojuego.' });
    }

    let existingVideogame = await Videogame.findOne({ where: { name } });

    if (existingVideogame) {
      existingVideogame = await existingVideogame.update({
        name,
        description,
        platforms,
        releaseDate,
        rating: parseFloat(rating),
        imagen
      });

      const genreRecords = await Genre.findAll({
        where: {
          name: genres,
        },
      });

      await existingVideogame.setGenres(genreRecords);
      return res.status(200).json(existingVideogame);

    } else {

      const newVideogame = await Videogame.create({
        name,
        description,
        platforms,
        releaseDate,
        rating: parseFloat(rating),
        imagen
      });

      const genreRecords = await Genre.findAll({
        where: {
          name: genres,
        },
      });
      await newVideogame.setGenres(genreRecords);

      return res.status(201).json(newVideogame);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createVideogame,
};