import { Support } from "../models/ContactModel.js";

export const createSupport = async (req, res) => {
  try {
    const { name, message, phone , email } = req.body;
    if(!name || !message  || !email) throw new Error("Please Fill All Fields")
    await Support.create({
      name,
      message,
      email,
      phoneNumber:phone
    });
    return res.status(201).json({msg: "Successfully Submitted"});
  } catch (error) {
    return res.status(400).json({msg:error.message});
  }
};



