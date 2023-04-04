//import models
const User = require('./User');
const Item = require('./Item');
const Cart = require('./Cart');

//association methods for the Sequelize models to create relationships between them
//A user can have many Items
User.belongsToMany(Item, {
  through: Cart
});
  
  //An item belongs to a single user
  Item.belongsToMany(User, {
    through: Cart
  });

  module.exports = { User, Item , Cart};