const Attendance = require("../models/attendanceModel");

exports.addOrUpdateAttendance = async (req, res) => {
  try {
    const { attendanceRecords } = req.body;

    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No attendance records provided" });
    }

    const results = [];

    for (const record of attendanceRecords) {
      const { regNo, subject, totalClasses, attendedClasses } = record;

      if (!regNo || !subject || totalClasses == null || attendedClasses == null) {
        console.warn("Skipping invalid record:", record);
        continue;
      }

      const total = Number(totalClasses);
      const attended = Number(attendedClasses);

      if (isNaN(total) || isNaN(attended) || total <= 0) {
        console.warn("Invalid numeric values for:", record);
        continue;
      }

      const percentage = ((attended / total) * 100).toFixed(2);

      const updated = await Attendance.findOneAndUpdate(
        { regNo, subject },
        {
          regNo,
          subject,
          totalClasses: total,
          attendedClasses: attended,
          percentage,
        },
        { upsert: true, new: true }
      );

      results.push(updated);
    }

    return res.json({ success: true, data: results });
  } catch (error) {
    console.error("Error in addOrUpdateAttendance:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const Subject = require("../models/subject.model");

exports.getAttendanceByRegNo = async (req, res) => {
  try {
    const { regNo } = req.params;

    if (!regNo) {
      return res
        .status(400)
        .json({ success: false, message: "Registration number is required" });
    }

    const records = await Attendance.find({ regNo });

    const subjects = await Subject.find({}).lean();
    const subjectMap = {};
    subjects.forEach((subj) => {
      subjectMap[subj._id] = subj;
    });

    const data = records.map((record) => {
      const subjectInfo = subjectMap[record.subject] || {};
      return {
        ...record.toObject(),
        subjectDetails: subjectInfo,
      };
    });

    return res.json({ success: true, data });
  } catch (error) {
    console.error("Error in getAttendanceByRegNo:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
