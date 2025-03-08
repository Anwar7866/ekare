const Rajorpay = require("razorpay");
require("dotenv").config();

exports.instance = new Rajorpay({
  key_id: 454545445,
  key_secret: "NLqKqodpptUHpH2d9DaXAvPLK9A",
});
