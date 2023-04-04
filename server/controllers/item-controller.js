const { User, Item } = require('../models');
const path = require('path');
const fs = require('fs');

module.exports = {
  async getAllItems(req, res) {
    try {
      // Get all posts and JOIN with user data
      const itemData = await Item.findAll({
        include: [{ model: User }],
      });
      //Serialize data so the template can read it
      const items = itemData.map((item) => item.get({ plain: true }));
      
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getMyItems(req, res) {
    console.log(req.user);
    try {
      const itemData = await Item.findAll({
        include: [{ model: User }],
      });
      //Serialize data so the template can read it
      const items = itemData.map((item) => item.get({ plain: true }));
      const myItems = items.filter((item) => item.user_id === req.user.id);
  
      //debug
      // console.log(`items: ${JSON.stringify(items, null, 2)}`);
      // console.log(`myItems: ${JSON.stringify(myItems, null, 2)}`);
  
      res.status(200).json(myItems);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createItem( req, res) {
    // debugging
    console.log(req.file);
    console.log(req.body);
    try {
      const newItem = await Item.create({
        ...req.body,
        user_id: req.user.id,
        image: req.file ? '/uploads/' + req.file.filename : null, // save image path to database if it exists
      });

      res.status(200).json(newItem);
    } catch (err) {
      // remove uploaded image if an error occurs
      if (req.file) {
        fs.unlinkSync(path.join(__dirname, '../../public', req.file.path));
      }
      console.log(err);
      res.status(400).json(err);
    }
  },
  async deleteItem(req, res) {
    try {
      const itemData = await Item.destroy({
        where: {
          id: req.params.itemId
        }
      });
  
      if(!itemData) {
        res.status(404).json({ message: 'No location found with this id!'});
        return;
      }
  
      res.status(200).json({ message: 'Item removed successfully' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
