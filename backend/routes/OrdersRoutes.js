import express from "express";
import {
  createOrder,
  createOrderAsGuest,
  getAllOrdersForUser,
  trackOrder,
  updateOrder
} from "../controllers/OrdersController.js";

const orderRouter = express.Router();

orderRouter.post("/orders/createOrder", createOrder);
orderRouter.post("/orders/createOrderAsGuest", createOrderAsGuest);
orderRouter.post("/orders/updateOrder", updateOrder);
orderRouter.post("/orders/getAllOrdersForUser", getAllOrdersForUser);
orderRouter.post("/orders/trackOrder", trackOrder);

export default orderRouter;
