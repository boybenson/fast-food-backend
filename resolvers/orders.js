import axios from "axios";
import { ApolloError } from "apollo-server-errors";
import orderModel from "../models/orderModel.js";

const GET_ORDERS = async (_, __, context) => {
  const { user } = context;
  if (!user) {
    throw new ApolloError("illegal User", "401");
  } else {
    if (user.role === "admin") {
      const orders = await orderModel.find({}).populate("user");
      return orders;
    } else {
      const orders = await orderModel.find({ user: user._id }).populate("user");
      return orders;
    }
  }
};

const GET_ORDER = async (_, args, context) => {
  let { user } = context;
  let { orderId } = args;
  if (!user) {
    throw new ApolloError("illegal User", "401");
  } else {
    const order = await orderModel.findOne({ _id: orderId }).populate("user");
    return order;
  }
};

const CREATE_ORDER = async (_, args, context) => {
  const { user } = context;
  const { content, foods } = args;

  if (!user) {
    throw new ApolloError("please login", "401");
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

    const axiosConfig = {
      method: "post",
      url: "https://sms.arkesel.com/api/v2/sms/send",
      headers: {
        "api-key": process.env.SMS_API_KEY,
      },
      data: {
        sender: "FAST FOOD",
        message: `Hi!, Your Order with Id Number ${order?.id} has been received! with total price of GHC ${order?.totalPrice}, thank you for choosing the best FAST FOOD joint in the world`,
        recipients: [`233${user?.phone?.slice(1)}`],
      },
    };

    await axios(axiosConfig);
    return order;
  }
};

export { GET_ORDERS, CREATE_ORDER, GET_ORDER };
