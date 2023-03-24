//import models
const User = require('./User');
const Bid = require('./Bid');
const Cart = require('./Cart');

//association methods for the Sequelize models to create relationships between them
//A user can have many Bids
User.belongsToMany(Bid, {
  // through: {
  //   model: Cart,
  //   unique: false
  // },
  // as: 'bids',
  // foreignKey: 'user_id',
  // onDelete: 'CASCADE'
  through: Cart
});
  
  //A bid belongs to a single user
  Bid.belongsToMany(User, {
    // through: {
    //   model: Cart,
    //   unique: false
    // },
    // as: 'users',
    // foreignKey: 'bid_id',
    through: Cart
  });

  module.exports = { User, Bid , Cart};