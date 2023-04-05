const { sequelize } = require('../config/connection');
const { User, Item } = require('../models');

const userData = require('./userData.json');
const itemData = require('./itemData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const item of itemData) {
    await Item.create({
      ...item,
    });
  }

  process.exit(0);
};

seedDatabase();