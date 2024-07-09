import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PdfExport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const generatePDF = () => {
    const doc = new jsPDF();
    // Example: Adding selected items to PDF
    doc.text("Selected Items:", 10, 10);
    selectedItems.forEach((item, index) => {
      const yPos = 20 + index * 10;
      doc.text(`${item.category} - ${item.name}`, 10, yPos);
    });
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
    <div className=" flex justify-center flex-col py-4 px-12 mt-10 mb-10">
      <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                Nom
              </th>
              <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                Catégorie
              </th>
              <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                Ville
              </th>
              <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                Sélectionner
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-blue-100">
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
                <td className="text-left py-2 px-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (selected) => selected.id === item.id
                    )}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export button */}
      <div className="mt-4">
        <button
          onClick={generatePDF}
          className="uppercase bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Exporter en PDF
        </button>
      </div>
    </div>
  );
};

export default PdfExport;
