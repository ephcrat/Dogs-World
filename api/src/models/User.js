const { Model, DataTypes } = require("sequelize");

class User extends Model {}

module.exports = (sequelize) => {
  // defino el modelo
  return User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      favorites: {
        type: DataTypes.STRING(4000),
        // set(value) {
        //   const fav = this.getDataValue("favorites");
        //   if (fav) {
        //     return this.setDataValue("favorites", `${fav}-${value}`);
        //   }
        //   return this.setDataValue("favorites", value);
        // },
      },
    },
    { timestamps: false, createdAt: false, sequelize }
  );
};
