const mongoose = require('mongoose');
const express = require('express');
const app = express();
const controllers = require('./controllers');

const PORT = process.env.MONGODB_URL || 3001;

mongoose.connect('mongodb://127.0.0.1/social-api', () => {
  console.log(`Connected to Mongoose Database on Port: ${PORT}`);
},
(err) => {
  console.log(`Error connecting to Mongoose Database: ${err}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", controllers);

app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});