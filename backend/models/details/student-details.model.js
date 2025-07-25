const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentDetailsSchema = new mongoose.Schema(
  {
    regNo: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    dob: {
      type: Date,
      required: true,
    },
    libraryId: {
      type: Number,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const studentDetails =
mongoose.models.StudentDetail ||
mongoose.model("StudentDetail", studentDetailsSchema);
// const studentDetails = mongoose.model("StudentDetail", studentDetailsSchema);
module.exports = studentDetails;
