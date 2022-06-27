const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    username: {
      type: String,
      required: true,
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
  });

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 255,
    },
    username: {
      type: String,
      required: true,
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
    reactions: [reactionSchema],
  });

  

  module.exports = mongoose.model('Thought', thoughtSchema);