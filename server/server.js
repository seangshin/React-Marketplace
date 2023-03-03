//Dependencies
const express = require('express');
const path = require('path'); 
const routes = require('./controllers');
const session = require('express-session');
const multer = require('multer');

//Set up for express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 60 * 60 * 1000, // expires after 1 hour
  },
  resave: false,
  saveUninitialized: true,
};
app.use(session(sess));

// Set up Multer for image uploads
const upload = multer({ dest: 'uploads/' });

//import sequelize connection
const { sequelize, transporter } = require('./config/connection');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('image')); // Add Multer to handle image uploads
app.use(routes); // Set up for the routes
app.use(express.static(path.join(__dirname, 'public'))); //*********

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Sever listening on http://localhost:${PORT}`));
});