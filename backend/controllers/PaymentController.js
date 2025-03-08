// controllers/PaymentController.js
const Payment = require("../models/payment");
const User = require("../models/user");
const Course = require("../models/course");
const { default: mongoose } = require("mongoose");

exports.getPurchaseHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate if user exists
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find all successful payments by the user
    const purchaseHistory = await Payment.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          status: "success",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      {
        $project: {
          _id: 1,
          amount: 1,
          paymentMethod: 1,
          createdAt: 1,
          course: {
            _id: 1,
            courseName: 1,
            courseDescription: 1,
            thumbnail: 1,
            price: 1,
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: purchaseHistory,
    });
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch purchase history",
      error: error.message,
    });
  }
};
