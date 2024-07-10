import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BsFiletypePdf } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";

const PdfExport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let yPos = margin;

    // Define box dimensions
    const boxWidth = pageWidth - 2 * margin;
    const boxHeight = 60;

    // Add title
    doc.setFontSize(18);
    doc.text("Selected Items", margin, yPos);
    yPos += 15;

    // Add each selected item
    selectedItems.forEach((item, index) => {
      if (yPos + boxHeight > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      }

      // Draw box
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, yPos, boxWidth, boxHeight, "FD");

      // Item number and name
      yPos += 10;
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${item.name}`, margin + 5, yPos);

      // Details
      yPos += 12;
      doc.setFontSize(12);
      doc.text(`Category: ${item.category}`, margin + 10, yPos);
      yPos += 8;
      doc.text(
        `Ville: ${capitalizeFirstLetter(item.ville)}`,
        margin + 10,
        yPos
      );
      yPos += 8;
      doc.text(`Numéro: ${item.phone}`, margin + 10, yPos);
      yPos += 8;
      doc.text(`Table: ${item.table_grade}`, margin + 10, yPos);
      yPos += 8;
      doc.text(`Service: ${item.service_grade}`, margin + 10, yPos);
      yPos += 8;
      doc.text(`Texte: ${item.text_review}`, margin + 10, yPos);
      yPos += 8;
      doc.text(`Photo: ${item.imageUrl}`, margin + 10, yPos);

      yPos += boxHeight + 10;
    });

    // Save the PDF with a unique name
    doc.save("selected_items.pdf");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "fiches"),
        orderBy("ville", "asc"),
        orderBy("category", "asc")
      );
      const documentSnapshots = await getDocs(q);
      const results = documentSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents: ", error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    if (selectedItem) {
      if (selectedItems.some((item) => item.id === id)) {
        setSelectedItems(selectedItems.filter((item) => item.id !== id));
      } else {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    }
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return ""; // Handle cases where str is undefined or null
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <div className="max-w-full mx-auto mr-10 p-10">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col py-4 px-12 mt-10 mb-10">
      <div className="my-2 px-2">
        {" "}
        <h1 className=" text-2xl font-extrabold leading-[1.15] text-slate-700 sm:text-4xl ">
          Conversion PDF
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Selectionner les fiches et cliquer sur telecharger.
        </p>{" "}
      </div>

      <div className=" flex justify-end items-right p-2  gap-4 my-5 ">
        <button
          type="button"
          className="flex items-center justify-right  rounded-xl border border-solid  cursor-pointer pointer-events-auto uppercase border-stone-200 bg-white hover:bg-blue-200 py-4 px-4 "
          onClick={generatePDF}>
          Telecharger le PDF
          <FaDownload className="h-6 w-6 ml-4 text-slate-700" />
        </button>
      </div>
      <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                Sélectionner
              </th>
              <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                Nom
              </th>
              <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                Catégorie
              </th>
              <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                Ville
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-slate-100" : "bg-white"
                } hover:bg-blue-100`}>
                <td className="text-left py-2 px-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (selected) => selected.id === item.id
                    )}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td className="text-left py-2 px-4 uppercase font-semibold text-sm text-blue-900">
                  {item.name}
                </td>
                <td className="text-left py-2 px-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-200">
                    {item.category}
                  </span>
                </td>
                <td className="text-left py-2 px-2">
                  {capitalizeFirstLetter(item.ville)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PdfExport;
