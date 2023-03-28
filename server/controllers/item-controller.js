const { User, Bid } = require('../models');
const path = require('path');
const fs = require('fs');

module.exports = {
  async getAllItems(req, res) {
    try {
      // Get all posts and JOIN with user data
      const bidData = await Bid.findAll({
        include: [{ model: User }],
      });
      //Serialize data so the template can read it
      const bids = bidData.map((bid) => bid.get({ plain: true }));
      
      res.status(200).json(bids);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getMyItems(req, res) {
    console.log(req.user);
    try {
      const bidData = await Bid.findAll({
        include: [{ model: User }],
      });
      //Serialize data so the template can read it
      const bids = bidData.map((bid) => bid.get({ plain: true }));
      const myBids = bids.filter((bid) => bid.user_id === req.user.id);
  
      //debug
      // console.log(`bids: ${JSON.stringify(bids, null, 2)}`);
      // console.log(`myBids: ${JSON.stringify(myBids, null, 2)}`);
  
      res.status(200).json(myBids);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createItem( req, res) {
    // debugging
    console.log(req.file);
    console.log(req.body);
    try {
      const newBid = await Bid.create({
        ...req.body,
        user_id: req.user.id,
        image: req.file ? '/uploads/' + req.file.filename : null, // save image path to database if it exists
      });

      res.status(200).json(newBid);
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
      const bidData = await Bid.destroy({
        where: {
          id: req.params.bidId
        }
      });
  
      if(!bidData) {
        res.status(404).json({ message: 'No location found with this id!'});
        return;
      }
  
      res.status(200).json({ message: 'Item removed successfully' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
