const express = require("express");
const router = express.Router();
const { getPurchaseHistory } = require("../controllers/PaymentController");

const { auth, isStudent } = require("../middleware/auth");

router.get("/getPurchaseHistory", auth, isStudent, getPurchaseHistory);

module.exports = router;
