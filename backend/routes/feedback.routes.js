const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  getAllFeedback,
} = require("../controllers/feedback.controller");

router.post("/submit", submitFeedback);
router.get("/all", getAllFeedback);

module.exports = router;
