"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SightingCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define separate 1-M relationships with both Sighting and Category models
      // to enable them to query junction model
      this.belongsTo(models.sighting);
      this.belongsTo(models.category);
    }
  }
  SightingCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sightingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "sighting",
          key: "id",
        },
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "sighting_categories",
      underscored: true,
    }
  );
  return SightingCategory;
};
