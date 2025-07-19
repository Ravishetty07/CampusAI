const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const {
  addOrUpdateAttendance,
  getAttendanceByRegNo,
} = require("../controllers/attendanceController");


router.post("/", auth, addOrUpdateAttendance);
router.get("/:regNo", auth, getAttendanceByRegNo);

module.exports = router;
