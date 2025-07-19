import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import CustomButton from "./CustomButton";
import ChatBot from "./ChatBot";

const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();

  const [showBot, setShowBot] = useState(false); // new state to control ChatBot visibility

  const logouthandler = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <>
      <div className="shadow-md px-6 py-4 mb-6">
        <div className="max-w-7xl flex justify-between items-center mx-auto">
          <p
            className="font-semibold text-2xl flex justify-center items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="mr-2">
              <RxDashboard />
            </span>{" "}
            {router.state && router.state.type} Dashboard
          </p>

          <CustomButton variant="secondary" onClick={() => setShowBot(true)}>
            Chatbot
          </CustomButton>

          <CustomButton variant="danger" onClick={logouthandler}>
            Logout
            <span className="ml-2">
              <FiLogOut />
            </span>
          </CustomButton>
        </div>
      </div>

      {/* Conditionally render the ChatBot */}
{showBot && <ChatBot onClose={() => setShowBot(false)} />}    </>
  );
};

export default Navbar;
