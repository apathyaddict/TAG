import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { FaDownload, FaInfoCircle } from "react-icons/fa";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  StyleSheet,
  PDFDownloadLink,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { redirect, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

const capitalizeFirstLetter = (str) => {
  if (!str) return ""; // Handle cases where str is undefined or null
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10, // Smaller font size
    fontFamily: "Courier",
    margin: 10,
    width: "60%",
  },

  header: {
    fontSize: 18,
    marginBottom: 2, // Reduced spacing below header
    textAlign: "left",
    color: "#8B0000", // Dark Red color
    fontFamily: "Courier-Bold",
    fontWeight: 800,
    textTransform: "uppercase",
  },
  city: {
    fontSize: 12,
    color: "#8B0000",
    textAlign: "left",
    marginBottom: 10,
    textTransform: "uppercase",
    fontFamily: "Courier-Bold",
  },
  item: {
    marginBottom: 15,
    padding: 0, // Removed padding
    borderRadius: 0, // Removed border radius
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a202c", // Darker text color for item title
    marginBottom: 2,
    textAlign: "center",
  },
  itemText: {
    marginVertical: 3,
    color: "#1a202c",
    fontSize: 8,
    textAlign: "left",
    lineHeight: 1.3,
  },
  contactInfo: {
    marginTop: 10,
    fontSize: 8,
    fontFamily: "Courier-Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  linkSection: {
    marginTop: 10,
    fontSize: 8,
    textAlign: "left",
  },
  link: {
    color: "#1a202c", // Darker text color

    textAlign: "left",
  },
  divider: {
    borderBottom: "1px solid #ccc", // Grey line divider
    marginVertical: 10,
    marginTop: 15,
  },
});

//   const starPaths = {
//     1: "M19.704 8.375l-6.359-.551-2.736-6.092L9.376 2.05 6.77 2.732l-.517 2.57-6.462.554 4.979 4.442L2.3 17.685l5.313-3.22 5.296 3.227-1.57-6.904 4.979-4.44z",
//     2: "M9.377 17.686l-6.462.555 4.979-4.442L2.3 6.357l5.313-3.221 5.296 3.227-1.57-6.906 4.979 4.442L19.705 8.375l-6.359-.551-2.736-6.093L9.377 2.05z",
//     3: "M2.301 6.356l5.313-3.22 5.296 3.227-1.57-6.904 4.979-4.44L19.705 8.374l-6.36-.551-2.735-6.092L9.377 2.05l-2.607.683-.517 2.569-6.462.554z",
//   };

//   return Array(numStars)
//     .fill(0)
//     .map((_, index) => <Svg key={index} src={{ path: starPaths[numStars] }} />);
// };

// const getForks = (grade) => {
//   switch (grade) {
//     case "service et cadre simple":
//       return 1;
//     case "cadre et service confort":
//       return 2;
//     case "cadre luxe":
//       return 3;
//     default:
//       return 0;
//   }
// };

// Create the PDF document component
const PdfDocument = ({ items }) => (
  <Document>
    <Page style={styles.page}>
      {items.map((item, index) => (
        <View key={index}>
          <Text style={styles.header}>{item.name}</Text>
          <Text style={styles.city}>{item.ville}</Text>

          <View style={styles.item}>
            <Text style={styles.itemText}>{item.text_review}</Text>

            <View style={styles.starForkContainer}>
              <Text style={styles.itemText}>Table: {item.table_service} </Text>

              {/* <ForkSvg /> */}
            </View>

            <View style={styles.starForkContainer}>
              <Text style={styles.itemText}>Service: {item.table_grade} </Text>
            </View>
          </View>

          <View style={styles.starForkContainer}>
            {item.detailsData &&
              Object.keys(item.detailsData).map(
                (key, i) =>
                  item.detailsData[key] && (
                    <Text key={i} style={styles.itemText}>
                      {key}
                    </Text>
                  )
              )}
          </View>

          <Text style={styles.contactInfo}>
            {item.rue} {item.code_postal}{" "}
            {item.ville.charAt(0).toUpperCase() + item.ville.slice(1)} |{" "}
            {item.phone} | {item.website}
          </Text>

          <View style={styles.linkSection}>
            {item.imagesUrl &&
              item.imagesUrl.map((url, i) => (
                <Link key={i} src={url}>
                  <Text style={styles.link}>Cliquer ici pour lien: photo</Text>
                </Link>
              ))}
          </View>

          <View style={styles.divider} />
        </View>
      ))}
    </Page>
  </Document>
);

const PdfExport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  const fetchData = useCallback(async () => {
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
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const handlePrintButtonClick = () => {
    navigate("/to-print", {
      state: { selectedItems },
    });
  };

  const handleEdit = (id) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="flex justify-center flex-col py-4 px-12 mt-10 mb-10">
      <div className="my-2 px-2">
        <h1 className=" text-2xl font-extrabold leading-[1.15] text-slate-700 sm:text-4xl ">
          Conversion PDF
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Selectionner les fiches et cliquer sur telecharger.
        </p>
      </div>

      <div className=" flex justify-end items-right p-2  gap-4 my-5 ">
        <PDFDownloadLink
          document={<PdfDocument items={selectedItems} />}
          fileName="selected_items.pdf">
          {({ blob, url, loading, error }) => (
            <button
              type="button"
              className="flex items-center justify-right  rounded-xl border border-solid text-sm cursor-pointer pointer-events-auto uppercase border-stone-200 bg-white hover:bg-blue-200 py-4 px-4 ">
              Telecharger le PDF (simplifié)
              <FaDownload className="h-6 w-6 ml-4 text-slate-700" />
            </button>
          )}
        </PDFDownloadLink>

        <button
          type="button"
          targer="_blank"
          className="flex items-center justify-right  rounded-xl border border-solid  text-sm cursor-pointer pointer-events-auto uppercase border-stone-200 bg-white hover:bg-blue-200 py-4 px-4 "
          onClick={handlePrintButtonClick}>
          PDF(stylisé)
          <FaDownload className="h-6 w-6 ml-4 text-slate-700" />
        </button>
        <div className="flex justify-center items-center mt-4 tooltip-container">
          <FaInfoCircle className="text-2xl  text-slate-700/50 hover:text-slate-700" />
          <span className="tooltip-text">
            cliquer sur imprimer, puis selectionner "sauvergarder en pdf"
          </span>
        </div>
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
              <th className="text-left py-2 px-2 uppercase font-semibold text-xs">
                détails
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
                  <span className="px-2 py-1 text-red-900 font-bold">
                    {item.category}
                  </span>
                </td>
                <td className="text-left py-2 px-2">
                  {capitalizeFirstLetter(item.ville)}
                </td>
                <td className="text-left py-2 px-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-emerald-400 text-white p-2 hover:bg-emerald-200 rounded-lg">
                    <MdEdit />
                  </button>
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
