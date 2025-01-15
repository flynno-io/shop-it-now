const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-shopping';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Successfully connected to MongoDB!" + " " + uri);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

module.exports = mongoose.connection;
