const Feedback = require("../models/Feedback");
const ApiResponse = require("../utils/ApiResponse");

// Submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { userType, userId, message } = req.body;
    console.log("Received feedback:", req.body);

    if (!userType || !userId || !message) {
      return ApiResponse.badRequest("All fields are required").send(res);
    }

    const feedbacks = await Feedback.create({ userType, userId, message });
    return ApiResponse.success(feedbacks,"All feedback retrieved").send(res);
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return ApiResponse.serverError("Error submitting feedback").send(res);
  }
};


exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 });
    console.log("Retrieved feedbacks:", feedbacks);

    return ApiResponse.success(feedbacks, "All feedback retrieved").send(res); // ✅ Swapped args
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return ApiResponse.internalServerError("Error fetching feedback").send(res); // ✅ use internalServerError
  }
};