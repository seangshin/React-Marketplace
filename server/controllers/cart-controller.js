const { User, Item } = require('../models');
const stripe = require('../config/stripe');

module.exports = {
  async addItem(req, res) {
    try {
      // debug
      // console.log(req.session);
      // console.log(req.body);
  
      const user = await User.findByPk(req.user.id);
      const item = await Item.findByPk(req.body.itemId);
  
      await user.addItem(item, { through: { quantity: 1 } });
  
      res.status(200);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async removeItem(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      const item = await Item.findByPk(req.params.itemId);
  
      await user.removeItem(item);
  
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async viewCart( req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        include: {
          model: Item,
          through: { attributes: ['quantity'] },
        },
      });
  
      const itemData = user.items.map((item) => item.get({ plain: true }));
  
      // debug
      // console.log(user);
      // console.log(`items: \n ${user.items}`);
      // console.log(`items: \n ${JSON.stringify(itemData, null, 2)}`);
      
      res.status(200).json(itemData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  async checkout(req, res) {
    try {
      const product = await stripe.products.create({name: 'My Cart'});

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: req.body.total,
        currency: 'usd',
      });

      //const domain = 'http://localhost:3000'; //for development
      const domain = 'https://quiet-gorge-31724.herokuapp.com/';

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
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
