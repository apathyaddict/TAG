import React from "react";
import TAG from "../assets/TAG.png";

const HomePage = () => {
  return (
    <section className="relative flex flex-col items-center justify-center my-12 ">
      <div className="mx-auto w-full flex justify-center">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
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
            tag tag
          </div>
        </div>
        <img
          src={TAG}
          alt="main image of a cup of wine"
          className="items-center align-middle mx-auto z-10  lg:max-w-[500px] sm:max-w-[350px] max-w-[200px] rounded-full shadow-lg"
        />
      </div>
    </section>
  );
};

export default HomePage;
