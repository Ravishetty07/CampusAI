import React, { useEffect, useState } from "react";
import axios from "../../utils/AxiosWrapper";
import toast from "react-hot-toast";

const FeedbackStudent = () => {
  const [message, setMessage] = useState("");
  const [regNo, setRegNo] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRegNo(parsed.regNo);
      } catch (err) {
        console.error("Failed to parse userData from localStorage:", err);
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return toast.error("Message required");
    if (!regNo) return toast.error("Student ID not found");

    try {
      await axios.post("/feedback/submit", {
        userType: "student",
        userId: regNo,
        message,
      });
      toast.success("Feedback submitted");
      setMessage("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Submit Feedback</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        placeholder="Write your feedback here..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
      >
        Submit
      </button>
    </div>
  );
};

export default FeedbackStudent;
