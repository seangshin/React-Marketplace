const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { transporter } = require('../config/connection');

module.exports = {
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      const token = signToken(userData);
  

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
  
      res.status(200).json({token, userData})
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  async login(req, res) {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      const token = signToken(userData);
  
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

      res.status(200).json({ token, userData });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
