import React from "react";
import TAG from "../assets/TAG.png";
import SignInComp from "../components/Auth/SignInComp";

const HomePage = ({ userDetails }) => {
  return (
    <section className=" flex flex-col items-center justify-center m-4 h-screen ">
      {!userDetails ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="bg-gray-200 bg-opacity-90 p-6 rounded-lg shadow-md">
            <SignInComp />
          </div>
        </div>
      ) : null}
      <div className="mx-auto w-screen flex flex-1 justify-center">
        <div className="absolute md:max-h-full justify-center overflow-hidden">
          <div className="text-4xl font-bold text-stone-700 opacity-50 ">
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
            tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag tag
          </div>
        </div>
        <img
          src={TAG}
          alt="main image of a cup of wine"
          className="max-w-[500px] md:max-w-[600px] rounded-full shadow-lg mb-4 z-10"
        />
      </div>
    </section>
  );
};

export default HomePage;
