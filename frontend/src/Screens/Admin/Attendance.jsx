import React, { useState, useEffect } from "react";
import axiosWrapper from "../../utils/AxiosWrapper";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Attendance = () => {
  const reduxToken = useSelector((state) => state.auth?.userToken);
  const userToken = reduxToken || localStorage.getItem("userToken");

  const [branches, setBranches] = useState([]);
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false);

  // Load branches on mount
  useEffect(() => {
    const getBranchHandler = async () => {
      try {
        const response = await axiosWrapper.get(`/branch`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (response.data.success) {
          setBranches(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching branches");
      }
    };
    getBranchHandler();
  }, [userToken]);

  // Load subjects when branch changes
  useEffect(() => {
    if (!branch) return;

    const getSubjectHandler = async () => {
      try {
        const response = await axiosWrapper.get(`/subject?branch=${branch}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        console.log("Subjects response:", response.data);
        if (response.data.success) {
          setSubjects(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching subjects");
      }
    };

    getSubjectHandler();
  }, [branch, userToken]);

  const handleSearch = async () => {
    if (!branch || !semester || !selectedSubject) {
      toast.error("Please select branch, semester, and subject");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Searching students...");
      const response = await axiosWrapper.post(
        `/student/search`,
        { branch, semester },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      toast.dismiss();
      if (response.data.success) {
        setStudents(response.data.data);
        toast.success("Students loaded");
      } else {
        toast.error(response.data.message);
        setStudents([]);
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (regNo, field, value) => {
  setAttendanceData((prev) => {
    const prevData = prev[regNo] || {};
    const newValue = parseInt(value);

    if (field === "attendedClasses") {
      const total = parseInt(prevData.totalClasses) || 0;
      if (newValue > total) {
        toast.error("Attended classes cannot exceed total classes");
        return prev;
      }
    }

    return {
      ...prev,
      [regNo]: {
        ...prevData,
        [field]: newValue,
      },
    };
  });
};


  const submitAttendance = async () => {
    if (!selectedSubject) {
      toast.error("Please select a subject before submitting");
      return;
    }

    const attendanceRecords = students.map((student) => ({
      regNo: student.regNo,
      subject: selectedSubject,
      totalClasses: attendanceData[student.regNo]?.totalClasses || 0,
      attendedClasses: attendanceData[student.regNo]?.attendedClasses || 0,
    }));

    try {
      const response = await axiosWrapper.post(
        "/attendance",
        { attendanceRecords },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (response.data.success) {
        toast.success("Attendance marked successfully!");
        setAttendanceData({});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error submitting attendance");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          <option value="">Select Branch</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search Students
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : students.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Reg No</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Total Classes</th>
                <th className="p-2 border">Attended</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.regNo}>
                  <td className="p-2 border">{student.regNo}</td>
                  <td className="p-2 border">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      className="border px-2 py-1 w-20"
                      value={
                        attendanceData[student.regNo]?.totalClasses || ""
                      }
                      onChange={(e) =>
                        handleAttendanceChange(
                          student.regNo,
                          "totalClasses",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      className="border px-2 py-1 w-20"
                      value={
                        attendanceData[student.regNo]?.attendedClasses || ""
                      }
                      onChange={(e) =>
                        handleAttendanceChange(
                          student.regNo,
                          "attendedClasses",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={submitAttendance}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Attendance
          </button>
        </div>
      ) : (
        <p className="mt-4 text-red-500">No students to display</p>
      )}
    </div>
  );
};

export default Attendance;
