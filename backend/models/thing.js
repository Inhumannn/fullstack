// Mongoose's Schema method allows you to create a data schema for your MongoDB database.
// The model method transforms this model into a usable model.

// when you click on the image, it's this one file
const mongoose = require("mongoose");

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Thing", thingSchema);
