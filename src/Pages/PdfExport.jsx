import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { FaDownload } from "react-icons/fa";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { GiKnifeFork } from "react-icons/gi";
import { MdTableRestaurant } from "react-icons/md";

// const capitalizeFirstLetter = (str) => {
//   if (!str) return ""; // Handle cases where str is undefined or null
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#e63946",
  },
  item: {
    marginBottom: 15,
    padding: 10,
    border: "1pt solid #e63946",
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "semibold",
    color: "#1d3557",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  category: {
    color: "#9b2226",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "right",
    padding: "2px",
  },
  itemText: {
    marginVertical: 5,
    color: "black",
    fontSize: 10,
  },
  itemImage: {
    width: "100%",
    height: 100,
    objectFit: "cover",
    marginBottom: 5,
  },
  starForkContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
});

// Functions to get the number of stars and forks based on grades
const getStars = (grade) => {
  switch (grade) {
    case "Bonne Table":
      return 1;
    case "Très bonne table":
      return 2;
    case "Table d'exception":
      return 3;
    default:
      return 0;
  }
};

const renderStars = (numStars) => {
  return Array(numStars)
    .fill(0)
    .map((_, index) => (
      <MdTableRestaurant key={index} className="h-6 w-6 text-blue-500" />
    ));
};

const getForks = (grade) => {
  switch (grade) {
    case "service et cadre simple":
      return 1;
    case "cadre et service confort":
      return 2;
    case "cadre luxe":
      return 3;
    default:
      return 0;
  }
};

const renderForks = (numForks) => {
  return Array(numForks)
    .fill(0)
    .map((_, index) => (
      <GiKnifeFork key={index} className="h-6 w-6 text-blue-500" />
    ));
};

// Create the PDF document component
const PdfDocument = ({ items }) => (
  <Document>
    <Page style={styles.page}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          {item.imagesUrl &&
            item.imagesUrl.map((url, i) => (
              <Image
                key={i}
                src={{
                  uri: `https://firebasestorage.googleapis.com/v0/b/tag-eric.appspot.com/o/files%2Fdad9fbaa-9477-4b2b-9e2e-16a9ac0b600b?alt=media&token=172b7dd2-741f-4f42-9b61-8075ee3f6047`,
                  method: "GET",
                  headers: {},
                  body: "",
                }}
                style={styles.itemImage}
              />
            ))}

          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.itemText}>{item.ville}</Text>
          <Text style={styles.itemText}>Numéro: {item.phone}</Text>
          <View style={styles.starForkContainer}>
            <Text style={styles.itemText}>Table: </Text>
            {renderStars(getStars(item.table_grade))}
          </View>
          <View style={styles.starForkContainer}>
            <Text style={styles.itemText}>Service: </Text>
            {renderForks(getForks(item.table_service))}
          </View>
          <Text style={styles.itemText}> {item.text_review}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const PdfExport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

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
              className="flex items-center justify-right  rounded-xl border border-solid  cursor-pointer pointer-events-auto uppercase border-stone-200 bg-white hover:bg-blue-200 py-4 px-4 ">
              Telecharger le PDF
              <FaDownload className="h-6 w-6 ml-4 text-slate-700" />
            </button>
          )}
        </PDFDownloadLink>
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
                  <span className="px-2 py-1 text-red-900 font-bold">
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
