import mongoose from 'mongoose'

const userSchema = new  mongoose.Schema({
  email: {
    type: String,
    required: [true,"Email required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true,"Name required"],
  },
  password: {
    type: String,
    required: [true,"Password required"],
  },
  phone: {
    type: String,
    default:null
  },
  address:{
    type: String,
    default:null
  }
  
 
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);

