import { CouponModel } from "../models/CouponModel.js";
import { OrdersModel } from "../models/OrdersModel.js";
import { ProductsModel } from "../models/Products.Model.js";
import { setMongoose } from "../utils/Mongoose.js";
import { sendEmail } from "../utils/nodemailer.js";

export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      name,
      userID,
      address,
      phone,
      totalAmount,
      orderProgress,
      couponUsed,
      postal_code
    } = req.body;
    if (items.length === 0) {
      throw new Error("No Items In Cart");
    }
    if (!userID || !address || !phone || !totalAmount || !name || !postal_code) {
      throw new Error("Please provide All Fields");
    };
    if (couponUsed) {
      const coupon = await CouponModel.findOne({ code: couponUsed.code });
      if (!coupon) throw new Error("Coupon Not Found");
      const updatedUseCount = coupon.uses_count + 1;
      coupon.uses_count = updatedUseCount;
      coupon.users.push({ userId: userID });
      await coupon.save();
    };
    const ids = items.map((data)=>data._id);
    if(ids.length > 0){
      await ProductsModel.updateMany(
        { _id: { $in: ids } },
        { $inc: { stock: -1 } }
        );
   
  };
   await OrdersModel.create({
      items,
      userID,
      name,
      address,
      phone,
      postal_code,
      totalAmount,
      couponUsed,
      orderProgress,
    });

    await sendEmail({ name, phone , address , postal_code , totalAmount , subject:"New Order" });

   
    return res.status(201).json({ message: "Order PLaced Succcessfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllOrdersForUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("You must provide an Id");
    const orders = await OrdersModel.find({ userID: id }).sort({
      createdAt: -1,
    });
    setMongoose();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id, orderProgress } = req.body;
    if (!id) {
      throw new Error("No ID Provided");
    }
    const order = await OrdersModel.findById(id);
    if (!order) {
      throw new Error("No Order Data Found");
    }
    //Remove It For Admin
    if (order.status === "Dispatched") {
      throw new Error("This Order has been already been Dispatched");
    }
    await OrdersModel.findByIdAndUpdate(id, {orderProgress:orderProgress});
    return res.status(200).json({ message: "Order Data Updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
