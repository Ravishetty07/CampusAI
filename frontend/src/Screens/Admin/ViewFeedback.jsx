import React, { useEffect, useState } from "react";
import axios from "../../utils/AxiosWrapper";
import toast from "react-hot-toast";

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("/feedback/all")
      .then((res) => {
        console.log("Feedback response:", res.data);
        if (Array.isArray(res.data.data)) {
          setFeedbacks(res.data.data);
        } else {
          setFeedbacks([]);
          toast.error("Invalid feedback format from server");
        }
      })
      .catch(() => toast.error("Unable to fetch feedback"));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Feedbacks</h2>
      <ul className="space-y-3">
        {feedbacks.map((fb) => (
          <li
            key={fb._id}
            className="border rounded-lg p-3 shadow-sm bg-white"
          >
            <div className="text-sm text-gray-600">
              <strong>
                {fb.userType?.toUpperCase() || "STUDENT"}{" "}
                {fb.userId || fb.regNo || ""}
              </strong>
              {fb.name && ` - ${fb.name}`}
            </div>
            <div className="text-gray-800 mt-1">{fb.message}</div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(fb.timestamp || fb.date).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewFeedback;
