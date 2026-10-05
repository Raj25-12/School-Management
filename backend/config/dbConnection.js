const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("DataBase Connected Successfully");
  } catch (error) {
    console.error("Cannot Connect to the Database:", error.message);
  }
};

module.exports = connectDB;