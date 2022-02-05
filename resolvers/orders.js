import { ApolloError } from "apollo-server-errors";
import orderModel from "../models/orderModel.js";

const GET_ALL_ORDERS = async () => {};

const CREATE_ORDER = async (_, args, context) => {
  const { user } = context;
  const { content, foods } = args;

  if (!user) {
    throw new ApolloError("illegal User", "401");
  } else {
    let newOrderDetails = {
      user: user?._id,
      totalPrice: content?.totalPrice,
      address: content?.address,
      foods,
      paymentMethod: content?.paymentMethod,
    };
    const newOrder = await orderModel.create(newOrderDetails);
    const order = await orderModel
      .findOne({ _id: newOrder._id })
      .populate("user");
    order.id = order._id;
    return order;
  }
};

export { GET_ALL_ORDERS, CREATE_ORDER };
