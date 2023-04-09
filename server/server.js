//Dependencies
const express = require('express');
const path = require('path'); 
const routes = require('./routes');
const bodyParser = require('body-parser');

//Set up for express app
const app = express();
const PORT = process.env.PORT || 3001;


//import sequelize connection
const { sequelize, transporter } = require('./config/connection');

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes); // Set up for the routes
app.use(express.static(path.join(__dirname, '../client/build'))); //*********

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Sever listening on http://localhost:${PORT}`));
});