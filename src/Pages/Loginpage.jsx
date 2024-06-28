import React from "react";
import SignInComp from "../components/Auth/SignInComp";

const Loginpage = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-200 bg-opacity-90 p-6 rounded-lg shadow-md">
        <SignInComp />
      </div>
    </div>
  );
};

export default Loginpage;
