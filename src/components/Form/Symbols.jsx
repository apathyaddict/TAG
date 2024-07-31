import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { PiForkKnifeFill } from "react-icons/pi";

const Symbols = ({ table_grade, handleTableGradeChange }) => {
  return (
    <div className="container mb-4">
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <li className="border bg-white border-gray-300 rounded-lg p-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_grade1"
            className="h-4 w-4 text-blue-500"
            onChange={handleTableGradeChange}
            checked={table_grade === "Bonne Table"}
            value="Bonne Table"
          />
          <label
            htmlFor="table_grade1"
            className="text-slate-700 text-sm font-medium flex items-center">
            <FaRegCircle className="h-4 w-4 mr-2  text-blue-500" /> Bonne Table
          </label>
        </li>
        <li className="border  bg-white border-gray-300 rounded-lg p-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_grade2"
            className="h-4 w-4 text-blue-500"
            onChange={handleTableGradeChange}
            checked={table_grade === "Très bonne table"}
            value="Très bonne table"
          />
          <label
            htmlFor="table_grade2"
            className="text-slate-700 text-sm font-medium flex items-center">
            <FaRegCircle className="h-4 w-4 text-blue-500" />
            <FaRegCircle className="h-4 w-4   text-blue-500 mr-2" /> Très bonne
            table
          </label>
        </li>
        <li className=" bg-white border border-gray-300 rounded-lg p-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_grade3"
            className="h-4 w-4 text-blue-500"
            onChange={handleTableGradeChange}
            checked={table_grade === "Table d'exception"}
            value="Table d'exception"
          />
          <label
            htmlFor="table_grade3"
            className="text-slate-700 text-sm font-medium flex items-center">
            <FaRegCircle className="h-4 w-4   text-blue-500" />
            <FaRegCircle className="h-4 w-4 text-blue-500" />
            <FaRegCircle className="h-4 w-4 mr-2  text-blue-500" /> Table
            d'exception
          </label>
        </li>

        <li className="border bg-white border-gray-300 rounded-lg p-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_grade4"
            className="h-4 w-4 text-blue-500"
            onChange={handleTableGradeChange}
            checked={table_grade === "Simple"}
            value="Simple"
          />
          <label
            htmlFor="table_grade4"
            className="text-slate-700 text-sm font-medium flex items-center">
            <PiForkKnifeFill className="h-4 w-4 mr-2  text-blue-500" /> Simple
          </label>
        </li>
        <li className="border bg-white border-gray-300 rounded-lg p-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_grade5"
            className="h-4 w-4 text-blue-500"
            onChange={handleTableGradeChange}
            checked={table_grade === "Bon confort"}
            value="Bon confort"
          />
          <label
            htmlFor="table_grade5"
            className="text-slate-700 text-sm font-medium flex items-center">
            <PiForkKnifeFill className="h-4 w-4 mr-2  text-blue-500" />
            <PiForkKnifeFill className="h-4 w-4 mr-2  text-blue-500" /> Bon
            confort
          </label>
        </li>
        <li className="border bg-white border-gray-300 rounded-lg p-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="table_grade6"
            className="h-4 w-4 text-blue-500"
            onChange={handleTableGradeChange}
            checked={table_grade === "Trés confortable"}
            value="Trés confortable"
          />
          <label
            htmlFor="table_grade6"
            className="text-slate-700 text-sm font-medium flex items-center">
            <PiForkKnifeFill className="h-4 w-4 mr-2  text-blue-500" />
            <PiForkKnifeFill className="h-4 w-4 mr-2  text-blue-500" />
            <PiForkKnifeFill className="h-4 w-4 mr-2  text-blue-500" />
            Trés confortable
          </label>
        </li>
      </ul>
    </div>
  );
};

export default Symbols;
