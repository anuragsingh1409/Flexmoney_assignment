const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUpUser = async ({ body }, res) => {
try{
    let { name, age, batch, email, password, paymentPrice } = body;
    password = await bcrypt.hash(password, 10);
    const newUser = new User({ name, age, batch, email, password, paymentPrice });
    const saveUser = await newUser.save();
    const token = jwt.sign({ _id: saveUser._id, name: saveUser.name, paymentPrice: saveUser.paymentPrice},
      process.env.JWT_SECRET);
   return res.status(201).json({success: true, message: "Data has been added.", data : token });
} catch (err) {
   return res.status(500).json({success: false, message: "Server error.", error: err.message });
} };

const signInUser = async ({ body }, res) => {
try{
   const { email, password } = body;
   const user = await User.findOne({ email });

   const verifyPassword = await bcrypt.compare(password, user.password);
   if(!verifyPassword) return res.status(401).json({success: false, message: "Invalid credentials." });

      const token = jwt.sign({ _id: user._id, name: user.name, paymentPrice: user.paymentPrice,
       age: user.age }, process.env.JWT_SECRET);
      return res.status(200).json({success: true, message: "Login successful.", data: token });
} catch (err) {
   return res.status(500).json({success: false, message: "Server error.", error: err.message });
} };

const batchUpdated = async ({ params, body }, res) => {
try{
    const { _id } = params;
    const { batch } = body;
    const user = await User.findById( _id );    
    const newDate = new Date();  
    if(newDate.getMonth() == user.createdAt.getMonth()) 
    return res.status(401).json({success: false, message: "You can't change batch in same month." });

    await User.findByIdAndUpdate( _id, {$set: { batch, createdAt: newDate }} );
    return res.status(200).json({success: true, message: "Batch has been updated." });
} catch (err) {
   return res.status(500).json({success: false, message: "Server error.", error: err.message });
} };

const paymentCompleted = async ({ params }, res) => {
try{
   const { _id } = params;
   await User.findByIdAndUpdate( _id , {$set: { paymentPrice: 500 }} );
   return res.status(200).json({success: true, message: "Payment has been completed.", data: true });
} catch (err) {
   return res.status(500).json({success: false, message: "Server error.", error: err.message });
} };

module.exports = { signUpUser, signInUser, batchUpdated, paymentCompleted };