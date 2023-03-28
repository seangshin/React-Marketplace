const { User, Bid } = require('../models');
const stripe = require('../config/stripe');

module.exports = {
  async addItem(req, res) {
    try {
      // debug
      // console.log(req.session);
      // console.log(req.body);
  
      const user = await User.findByPk(req.user.id);
      const bid = await Bid.findByPk(req.body.bidId);
  
      await user.addBid(bid, { through: { quantity: 1 } });
  
      res.status(200);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async removeItem(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      const bid = await Bid.findByPk(req.params.bidId);
  
      await user.removeBid(bid);
  
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async viewCart( req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        include: {
          model: Bid,
          through: { attributes: ['quantity'] },
        },
      });
  
      const bidData = user.bids.map((bid) => bid.get({ plain: true }));
  
      // debug
      // console.log(user);
      // console.log(`bids: \n ${user.bids}`);
      // console.log(`bids: \n ${JSON.stringify(bidData, null, 2)}`);
      
      res.status(200).json(bidData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async checkout(req, res) {
    try {
      const { cardNumber, expDate, cvc, name, address, amount } = req.body;
  
      // Create a Stripe token for the card information
      const { token } = await stripe.tokens.create({
        card: {
          number: cardNumber,
          exp_month: expDate.split('/')[0],
          exp_year: expDate.split('/')[1],
          cvc: cvc,
          name: name,
        },
      });
  
      // Use the token to create a charge
      const charge = await stripe.charges.create({
        amount,
        currency: 'usd',
        source: token.id,
        description: 'Example charge',
      });
  
      res.status(200).send('Payment processed successfully');
    } catch (err) {
      // Handle errors here (e.g., return an error message to the client)
      console.error(err);
      res.status(400).json({ success: false, error: err.message });
    }
  },
};
