import React from "react";
import { IoStarSharp } from "react-icons/io5";

const ServiceTable = ({ table_service, handleTableServiceChange }) => {
  return (
    <div className="container mb-4">
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
        <li className="border border-gray-300 rounded-lg p-4  bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_service1"
            className=" h-4 w-4 text-blue-500"
            onChange={handleTableServiceChange}
            checked={table_service === "service et cadre simple"}
            value="service et cadre simple"
            readOnly
          />
          <label
            htmlFor="table_service1"
            className="text-slate-700 text-sm font-medium flex items-center">
            <IoStarSharp className="h-4 w-4 mr-2 text-blue-500" /> Service et
            cadre simple
          </label>
        </li>
        <li className="border border-gray-300 rounded-lg p-4  bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_service2"
            className=" h-4 w-4 text-blue-500"
            onChange={handleTableServiceChange}
            checked={table_service === "cadre et service confort"}
            value="cadre et service confort"
          />
          <label
            htmlFor="table_service2"
            className="text-slate-700 text-sm font-medium flex items-center">
            <IoStarSharp className="h-4 w-4 text-blue-500" />
            <IoStarSharp className="h-4 w-4 mr-2 text-blue-500" /> Cadre et
            service confort
          </label>
        </li>
        <li className="border border-gray-300 rounded-lg p-4   bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_service3"
            className=" h-4 w-4 text-blue-500"
            onChange={handleTableServiceChange}
            checked={table_service === "cadre luxe"}
            value="cadre luxe"
          />
          <label
            htmlFor="table_service3"
            className="text-slate-700 text-sm font-medium flex items-center">
            <IoStarSharp className="h-4 w-4 text-blue-500" />
            <IoStarSharp className="h-4 w-4 text-blue-500" />
            <IoStarSharp className="h-4 w-4 mr-2 text-blue-500" /> Cadre luxe
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ServiceTable;
