import { CouponModel } from "../models/CouponModel.js";
import { setMongoose } from "../utils/Mongoose.js";


export const verifyCouponAtCheckout = async (req,res,next) => {
  try {
    const {code,category,userId} = req.body;
    if( !code || !userId) throw new Error("All Fields Required");
    const coupon = await CouponModel.findOne({code:code});
    if (!coupon) throw new Error("Coupon Not Found");
    const checkCategory = coupon.categories.includes(category);
    if(!coupon.allProducts && !checkCategory)  throw new Error("Invalid coupon for this product category");
    if(coupon.uses_count === coupon.total_limit) throw new Error("Coupun Limit reached");
    const currentDate = Date.now();
    if(coupon.expiresAt <= currentDate || !coupon.isActive) throw new Error("Coupun Expired");
    const userIds = coupon.users.map(user => user.userId);
    const checkUserID = userIds.includes(userId);
    if(checkUserID) throw new Error("You have already used this code");
    return res.status(200).json({couponDiscountSuccess:true,discountAmount:coupon.discountAmount,message:"Coupon verified Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

