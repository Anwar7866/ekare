const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected succcessfully");
    })
    .catch((error) => {
      console.log(`Error while connecting server with Database`);
      console.log(error);
      process.exit(1);
    });
};
