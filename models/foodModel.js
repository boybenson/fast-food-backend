import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  cookingDuration: {
    type: Number,
    default: 30,
  },
  image: {
    type: String,
  },

  qtyToBuy: {
    type: Number,
    default: 1,
  },
});

const foodModel = mongoose.model("food", foodSchema);

export default foodModel;
