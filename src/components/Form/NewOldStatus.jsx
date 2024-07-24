import React from "react";
import { TbSquareLetterNFilled } from "react-icons/tb";

const NewOldStatus = ({ status, handleStatus }) => {
  const options = [
    { id: "status1", label: "Nouveau", value: "nouveau" },
    { id: "status2", label: "Aucun", value: "aucun" },
    { id: "status3", label: "Retiré", value: "retire" },
  ];

  return (
    <div className="container mb-4">
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map(({ id, label, value }) => (
          <li
            key={id}
            className="border bg-white border-gray-300 rounded-lg p-4 flex items-center space-x-2">
            <input
              type="checkbox"
              id={id}
              className="h-4 w-4 text-blue-500"
              onChange={(e) => handleStatus(e.target.value)}
              checked={status === value}
              value={value}
            />
            <label
              htmlFor={id}
              className="text-slate-700 text-sm font-medium flex items-center">
              <TbSquareLetterNFilled className="h-4 w-4 mr-2 text-blue-500" />
              {label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewOldStatus;
