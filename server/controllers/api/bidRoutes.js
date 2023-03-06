const router = require('express').Router();
const { Bid, User } = require('../../models');
const withAuth = require('../../utils/auth');

const upload = require('../../config/multer');
const path = require('path');
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    // const bidData = await Bid.findAll();
    const bidData = await Bid.findAll({
      include: [{ model: User }],
    });
    //Serialize data so the template can read it
    const bids = bidData.map((bid) => bid.get({ plain: true }));
    
    res.status(200).json(bids)
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', upload, async (req, res) => {
 
  console.log(req.file);
  console.log(req.body);

  try {
    const newBid = await Bid.create({
      ...req.body,
      user_id: req.session.user_id,
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
  
});


module.exports = router;