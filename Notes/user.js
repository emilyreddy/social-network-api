const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 150,
    validate: {
      validator: v => v > 0,
      message: props => `${props.value} is not a valid age`,
    },
  },
  email: {
    type: String,
    min: 10,
    max: 255,
    required: true,
    unique: true,
    lowercase: true,
  },
  createdAt: {
    immutable: true,
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: {
    type:  mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  hobbies: [String],
  address: addressSchema
});

// this is an example of a schema/model method that can be added to any schema 
userSchema.methods.sayHi = function() {
  console.log(`Hi, my name is ${this.name}`);
};

//here is an example of a method that is static, meaning it can be called without an instance of the model

userSchema.statics.findByName = function(name) {
  return this.where({ name: new RegExp(name, 'i') });
};


// Following in an example of a virtual, Virtual's are not stored in the database, but are instead computed on the fly

userSchema.virtual('namedEmail').get(function(){
  return `${this.name} <${this.email}>`;
});

//Mongoose also has middlewear, wich is a way to hook into the lifecycle of a document. Must be defined as pre/post hooks, and include .remove(), .validate(), .update(), and .save()
// this middlewear is an example of how to change the value of updatedAt before it is saved, automatically. This is useful for when you want to track when a document was last updated.
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// this is an example of post middlewear, which is useful for when you want to do something after a document is saved.

userSchema.post('save', function(doc, next) {
  doc.sayHi();
  next();
});


module.exports = mongoose.model('User', userSchema);