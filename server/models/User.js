const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: [true,"Name is required"], minLength: 3, trim: true },
  email:{ type: String, required: [true,"Email is required"], trim: true, unique: true,
  validate: {
    validator: function(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); },
    message: "Invalid email format" } },
  paymentPrice: { type: Number, default: 0, enum:[ 0, 500 ]},
  age: { type: Number, required: [true,"Age is required"], min: 18, max: 65 },
  batch: { type: String, required: [true,"Select any batch"], 
   enum:[ "6-7AM", "7-8AM", "8-9AM", "5-6PM"] },
  password:{ type: String, required: [true, "Password is required"], trim: true} 
  }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
