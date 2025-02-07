import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = ({ handleLogout, userDetails }) => {
  return (
    <section className="h-screen flex items-center justify-center">
      {userDetails ? (
        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800 bg-white">
          <FaUserCircle className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square text-blue-950" />
          <div className="space-y-4 text-center divide-y dark:divide-gray-300">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl text-slate-800">
                {userDetails.firstName} {userDetails.lastName}
              </h2>
              <p className="px-5 text-xs sm:text-base text-blue-800 dark:text-slate-600">
                {userDetails.email}
              </p>
            </div>
            <div className="flex justify-center pt-10 space-x-4 align-center">
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-medium text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default ProfilePage;
