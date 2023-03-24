const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Cart extends Model {}

Cart.init(
  {
    // define columns
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cart',
  }
);

module.exports = Cart;
