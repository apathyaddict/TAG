import React from "react";
import TAG from "../assets/TAG.png";

const HomePage = () => {
  return (
    <section className=" flex flex-col items-center justify-center m-4 ">
      <div className="mx-auto w-screen flex justify-center">
        <div className="absolute md:max-h-full justify-center overflow-hidden">
          <div className="text-4xl font-bold text-stone-700 opacity-70 ">
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
          className="items-center md:mt-10  mx-auto z-10 lg:max-w-[500px] max-w-[400px] rounded-full shadow-lg"
        />
      </div>
    </section>
  );
};

export default HomePage;
