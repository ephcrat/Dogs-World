const { Model, DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
class Dog extends Model {}

module.exports = (sequelize) => {
  // defino el modelo
  return Dog.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { is: /^[a-z]+$/i },
        set(val) {
          this.setDataValue(
            "name",
            `${val[0].toUpperCase()}${val.slice(1).toLowerCase()}` //first letter in uppercase and the rest  in lowercase
          );
        },
      },
      min_height: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      max_height: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          heightValidator(val) {
            if (val < this.min_height)
              throw new Error(
                "The maximum height cannot be less than the minimum height"
              );
          },
        },
      },
      height: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.min_height} - ${this.max_height}`;
        },
      },
      min_weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      max_weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          weightValidator(val) {
            if (val < this.min_weight)
              throw new Error(
                "The maximum weight cannot be less than the minimum weight"
              );
          },
        },
      },
      weight: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.min_weight} - ${this.max_weight}`;
        },
      },
      min_life_span: {
        type: DataTypes.INTEGER,
      },
      max_life_span: {
        type: DataTypes.INTEGER,
        validate: {
          heightValidator(val) {
            if (val < this.min_life_span)
              throw new Error(
                "The maximum life span cannot be less than the minimum life span"
              );
          },
        },
      },
      life_span: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.min_life_span} - ${this.max_life_span} years`;
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );
};
