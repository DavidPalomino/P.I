const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    releaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
};
