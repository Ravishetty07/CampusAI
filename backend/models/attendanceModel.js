const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  regNo: { type: String, required: true },
  subject: { type: String, ref: "Subject", required: true },   totalClasses: { type: Number, default: 0 },
  attendedClasses: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
