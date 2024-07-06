import React from "react";
import { FaGhost } from "react-icons/fa";

const EmptyState = ({ title, search }) => {
  return (
    <section className="flex justify-center items-center flex-col my-10 gap-8 ">
      <FaGhost className="text-blue-400 h-16 w-16 opacity-50" />
      <div className="flex-center w-full flex-col gap-3 text-slate-400">
        <h1 className="text-lg text-center font-medium text-white-1">
          {title}
        </h1>
        {search && (
          <p className=" text-center text-sm text-white-2 mt-6">
            Il y a rien qui correspond à votre recherche.
          </p>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
