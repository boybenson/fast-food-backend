import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
    default: "legon campus",
  },

  foods: [{}],

  isDelivered: {
    type: Boolean,
    default: false,
  },

  paymentMethod: {
    type: String,
    required: true,
  },
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
