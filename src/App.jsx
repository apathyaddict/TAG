import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  redirect,
  Route,
  Routes,
} from "react-router-dom";
import DetailedPageResto from "./components/DetailedPageResto";
import Navbar from "./components/NavBar";
import CreatePage from "./Pages/CreatePage";
import ListPage from "./Pages/SearchPage";

import { doc, getDoc } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComp from "./components/Auth/RegisterComp";
import { auth, db } from "./firebase";
import EditForm from "./Pages/EditForm";
import HomePage from "./Pages/HomePage";
import Loginpage from "./Pages/Loginpage";
import ProfilePage from "./Pages/ProfilePage";

import Dashboard from "./components/Dashboard/Dashboard";
import Symbols from "./components/Form/Symbols";
import PdfExport from "./Pages/PdfExport";
import PrintPage from "./Pages/PrintPage";
import SearchPage from "./Pages/SearchPage";

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [isNew, setIsnew] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("User data not found");
          }
        } else {
          setUserDetails(null); // No user logged in
        }
        setLoading(false);
      });
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const editFunc = (restaurant) => {
    setIsEditing(true);

    setIsnew(restaurant);
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      redirect("/login");
      console.log("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  const shouldDisplayNavbar = () => {
    // Check if current path matches the PrintPage route
    return !location.pathname.startsWith("/to-print");
  };

  return (
    <BrowserRouter>
      {/* {shouldDisplayNavbar() && <Navbar {...{ handleLogout }} />} */}
      <Navbar {...{ handleLogout }} />
      <Routes>
        <Route path="/to-print/" element={<PrintPage />} />
        <Route path="/" element={<HomePage userDetails={userDetails} />} />
        <Route path="/secret/register" element={<RegisterComp />} />
        <Route path="/login" element={<Loginpage />} />
        {userDetails ? (
          <>
            <Route path="/new" element={<CreatePage />} />
            <Route
              path="/recherche"
              element={<SearchPage {...{ setIsEditing, setIsnew, editFunc }} />}
            />
            <Route
              path="/restaurants/:id"
              element={
                <DetailedPageResto user={userDetails} {...{ editFunc }} />
              }
            />
            <Route
              path="/edit-restaurant/:id"
              element={
                <EditForm {...{ selectedRestaurant, isNew, setIsEditing }} />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage {...{ userDetails, handleLogout }} />}
            />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/pdf" element={<PdfExport />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
