require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).
then(() => console.log("Connection Successful")).
catch((err) => console.log(err));

module.exports = mongoose;