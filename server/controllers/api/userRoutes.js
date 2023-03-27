const router = require('express').Router();
const { User, Bid } = require('../../models');
const { transporter } = require('../../config/connection');
const stripe = require('../../config/stripe');

// Create new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    // Set up sessions with a 'loggedIn' variable set to true and 'userId variable set to id from request body 
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

    //send auto email to new registers with welcome message
    var mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: 'Welcome to Marketplace',
      text: `${req.body.username}, thank you for registering with Marketplace.`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(req.session);
      
      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  //When the user logs out, destroy the session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// route to add an item to the cart
router.post('/cart', async (req, res) => {
  try {
    // debug
    // console.log(req.session);
    // console.log(req.body);

    const user = await User.findByPk(req.session.user_id);
    const bid = await Bid.findByPk(req.body.bidId);

    await user.addBid(bid, { through: { quantity: 1 } });

    res.status(200);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to get all items in the cart
router.get('/cart', async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
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
});

// route to delete an item from the cart
router.delete('/cart/:bidId', async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    const bid = await Bid.findByPk(req.params.bidId);

    await user.removeBid(bid);

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to create a checkout transaction
//****************************************************************************** */
// Create a token from card information in the request body using the stripe library.
router.post('/checkout', async (req, res) => {
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
});

module.exports = router;