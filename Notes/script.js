const mongoose = require('mongoose');
const User = require('./users');

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://127.0.0.1/testdb', () => {
  console.log(`Connected to Mongoose Database on Port: ${PORT}`);
},
(err) => {
  console.log(`Error connecting to Mongoose Database: ${err}`);
});

/*
================================================
      CREATE NEW USER FROM USER MODEL 
================================================
*/

//STATIC TEST FOR NEW USER
const newTestUser = async () => {
  try {
    const name = "Dick";
    const age = 21;
    const email = "testemail2@test.com";
    const bestFriend = {};
    const hobbies = ["Hiking", "Reading", "Coding"];
    const address = {
      street: "12345 Main St",
      city: "New York",
    };

    const user = await User.create({
      name: name,
      age: age,
      email: email,
      hobbies: hobbies,
      address: address,
    });
    await user.save();
    console.log(`New user successfully added to the Database: \n ${user}`);
  } catch (error) {
    console.log(error.message);
  }
};

//TEMPLATE ROUTE FOR CREATE NEW USER
const newUser = async (req, res) => {
  try {
    const age = req.body.age;
    const name = req.body.name;
    const bestFriend = req.body.bestFriend;
    const hobbies = req.body.hobbies;
    const address = req.body.address;

    const user = await User.create({
      name: name,
      age: age,
      bestFriend: bestFriend,
      hobbies: hobbies,
      address: address,
    });
    await user.save();
    res
      .status(200)
      .send(`New user successfully added to the Database: /n ${user}`);
  } catch (err) {
    console.error(`Error creating new user: ${err.message}`);
  }
};

/*
================================================
        UPDATE USER FROM USER MODEL
================================================
*/

//find user by id
const updateTestUser = async () => {
  
  try {
    const ID = "62aca68d461eddb2004dff30";

    const user = await User.findById(ID);

    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

// find user by any parameters you want to search for specifically, such as name, age, address, ect. 
// other methids you can use are .exists, findOne, .find().limit(), .find().skip(), .find().sort(), .find().select(), .find().count(), .find().distinct(), .find().exec()
const findTestUser = async () => {
  
  try {
    const user = await User.find({ name: "Jack"});

    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

// NOTE: If you use findOne -/ Many - And - update -/ updateMany, updateOne, findByIdAndUpdate - these operations will bypass any validation you have built into the model.
// It is recommended to use the .save method instead. for example instead of: User.findByIdAndUpdate(), you should use: User.findById().save(); See the example below for updating a user.

/*
================================================
        CUSTOM QUERIES | QUERIES
================================================
*/

const queryTestUser = async () => {
  // find all users where the name is equal to "Jack"
  try {
    const user = await User.findByName("Jack");
    console.log(user);

  } catch (error) {
    console.log(error.message);
  }
};

const queryTestUserByComparison = async () => {
  // find all users where the age is greater than 16
  try {
    const user = await User.where('age').gt('16');

    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

const queryTestUserByManyComparison = async () => {
  // find all users where the age is greater than 16 and less than 25, the name is harry nad your results are limites to 2
  try {
    const user = await User.where("age")
      .gt(16)
      .lt(25)
      .where("name")
      .equals("Harry")
      .limit(2);

    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

// Example of how to use a custom query to find a user, and then update their document

const updateTestUserByQuery = async () => {
  try {
    const user = await User.where("age")
      .gt(16)
      .lt(26)
      .where("name")
      .equals("Jack")
      .limit(2)
      ;

    user[0].email = "testeamil6@test.com";
    await user[0].save();
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};




updateTestUserByQuery();