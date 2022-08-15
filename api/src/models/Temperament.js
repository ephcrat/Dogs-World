const { Model, DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
class Temperament extends Model {}

module.exports = (sequelize) => {
  // defino el modelo
  return Temperament.init(
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, createdAt: false, sequelize }
  );
};
