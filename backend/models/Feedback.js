const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userType: { type: String, enum: ['student', 'faculty'], required: true },
  userId: { type: String, required: true },  // Accepts regNo or employeeId
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
