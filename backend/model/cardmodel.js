const mongoose = require("mongoose");

const cardschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("card", cardschema);

module.exports = Card;