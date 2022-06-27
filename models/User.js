const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
      },
      message: (props) => `${props.value} invalid email address`,
    },
  },
  thoughts: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    immutable: true,
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length} friends`;
});

module.exports = mongoose.model("User", userSchema);