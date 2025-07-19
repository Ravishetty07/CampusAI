const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Using subject code as the _id
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
