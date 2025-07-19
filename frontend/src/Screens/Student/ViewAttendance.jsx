import React, { useEffect, useState } from "react";
import axios from "../../utils/AxiosWrapper";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfileData(parsed);
      } catch (err) {
        console.error("Failed to parse userData from localStorage:", err);
      }
    }
  }, []);

  const userToken = localStorage.getItem("userToken");

  const fetchAttendance = async (regNo) => {
    try {
      const res = await axios.get(`/attendance/${regNo}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.data.success) {
        setAttendanceData(res.data.data);
        if (res.data.data.length === 0) {
          toast("No attendance records found.");
        }
      } else {
        toast.error(res.data.message || "Failed to fetch attendance.");
      }
    } catch (error) {
      console.error("Attendance fetch error:", error);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  const getPercentage = (attendedClasses, totalClasses) => {
    if (!totalClasses || totalClasses === 0) return "N/A";
    return `${((attendedClasses / totalClasses) * 100).toFixed(2)}%`;
  };

  useEffect(() => {
    if (profileData?.regNo) {
      fetchAttendance(profileData.regNo);
    } else if (profileData && !profileData.regNo) {
      toast.error("Student registration number missing.");
      setIsLoading(false);
    }
  }, [profileData]);

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10 relative">
      <Heading title="Your Attendance" />

      {isLoading ? (
        <p className="mt-4">Loading...</p>
      ) : attendanceData.length === 0 ? (
        <p className="mt-4 text-gray-500">No attendance data available.</p>
      ) : (
        <div className="mt-8 w-full max-w-3xl bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Subject-wise Attendance</h3>
          <table className="w-full table-auto text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Subject</th>
                <th className="px-4 py-2 border">Total Classes</th>
                <th className="px-4 py-2 border">Attended Classes</th>
                <th className="px-4 py-2 border">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item) => {
                const subjectName = item.subjectDetails?.name || item.subject || "N/A";
                const subjectCode = item.subjectDetails?._id || "";
                const percentage =
                  item.totalClasses > 0
                    ? item.attendedClasses / item.totalClasses
                    : null;

                return (
                  <tr key={item._id}>
                    <td className="px-4 py-2 border">
                      {subjectName} {subjectCode && `(${subjectCode})`}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.totalClasses}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.attendedClasses}
                    </td>
                    <td
                      className={`px-4 py-2 border text-center ${
                        percentage !== null && percentage < 0.75
                          ? "text-red-500 font-semibold"
                          : "text-green-600"
                      }`}
                    >
                      {getPercentage(item.attendedClasses, item.totalClasses)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewAttendance;
