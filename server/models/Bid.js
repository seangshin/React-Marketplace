const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Bid extends Model {}

Bid.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    // date_created: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   defaultValue: DataTypes.NOW,
    // },
    // expiration_date: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bid',
  }
);

module.exports = Bid;