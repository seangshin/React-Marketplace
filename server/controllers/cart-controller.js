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
      //const { cardNumber, expDate, cvc, name, address, amount } = req.body;

      // console.log(`${cardNumber}, ${expDate.split('/')[0]}, ${expDate.split('/')[1]}, ${cvc}, ${name}, ${address}, `);
  
      const product = await stripe.products.create({name: 'test-product'});

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 200,
        currency: 'usd',
      });

      const domain = 'http://localhost:3000';

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${domain}?success=true`,
        cancel_url: `${domain}?canceled=true`,
      });
  
      res.redirect(303, session.url);
    } catch (err) {
      // Handle errors here (e.g., return an error message to the client)
      console.error(err);
      res.status(400).json(err);
    }
  },
};
