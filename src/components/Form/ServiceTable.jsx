import React from "react";
import { BsHouseFill } from "react-icons/bs";

const ServiceTable = ({ table_service, handleTableServiceChange }) => {
  return (
    <div className="container mb-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
            <BsHouseFill className="h-4 w-4 mr-2 text-blue-500" /> Service et
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
            <BsHouseFill className="h-4 w-4 text-blue-500" />
            <BsHouseFill className="h-4 w-4 mr-2 text-blue-500" /> Cadre et
            service confort
          </label>
        </li>
        <li className="border border-gray-300 rounded-lg p-4   bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_service3"
            className=" h-4 w-4 text-blue-500"
            onChange={handleTableServiceChange}
            checked={table_service === "cadre grand confort"}
            value="cadre grand confort"
          />
          <label
            htmlFor="table_service3"
            className="text-slate-700 text-sm font-medium flex items-center">
            <BsHouseFill className="h-4 w-4 text-blue-500" />
            <BsHouseFill className="h-4 w-4 text-blue-500" />
            <BsHouseFill className="h-4 w-4 mr-2 text-blue-500" /> Cadre grand
            confort
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
            htmlFor="table_service4"
            className="text-slate-700 text-sm font-medium flex items-center">
            <BsHouseFill className="h-4 w-4 text-blue-500" />
            <BsHouseFill className="h-4 w-4 text-blue-500" />
            <BsHouseFill className="h-4 w-4 text-blue-500" />
            <BsHouseFill className="h-4 w-4 mr-2 text-blue-500" /> Cadre luxe
          </label>
        </li>
        <li className="border border-gray-300 rounded-lg p-4   bg-white flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_service5"
            className=" h-4 w-4 text-blue-500"
            onChange={handleTableServiceChange}
            checked={table_service === "cadre grand luxe"}
            value="cadre grand luxe"
          />
          <label
            htmlFor="table_service5"
            className="text-slate-700 text-sm font-medium flex items-center">
            <BsHouseFill className="h-4 w-4 text-red-600" />
            <BsHouseFill className="h-4 w-4 text-red-500" />
            <BsHouseFill className="h-4 w-4 text-red-500" />
            <BsHouseFill className="h-4 w-4 text-red-500" />
            <BsHouseFill className="h-4 w-4 mr-2 text-red-500" /> Cadre grand
            luxe
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ServiceTable;
