const express = require("express");
const router = express.Router();

const { capturePayment, verifyPayment } = require("../controllers/payments");
const {
  auth,
  isAdmin,
  isInstructor,
  isStudent,
} = require("../middleware/auth");
const { getPurchaseHistory } = require("../controllers/PaymentController");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.get("/getPurchaseHistory", auth, isStudent, getPurchaseHistory);

module.exports = router;
