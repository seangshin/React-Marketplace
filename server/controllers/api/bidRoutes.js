const router = require('express').Router();
const { Bid, User } = require('../../models');
const withAuth = require('../../utils/auth');

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

router.post('/', async (req, res) => {
  console.log(req.body);
  console.log(req.session);
  try {
    const newBid = await Bid.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBid);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


module.exports = router;