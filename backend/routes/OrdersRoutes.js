import express from "express";
import {
  createOrder,
  getAllOrdersForUser,
  updateOrder
} from "../controllers/OrdersController.js";

const orderRouter = express.Router();

orderRouter.post("/orders/createOrder", createOrder);
orderRouter.post("/orders/updateOrder", updateOrder);
orderRouter.post("/orders/getAllOrdersForUser", getAllOrdersForUser);

export default orderRouter;
