import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  redirect,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import CreatePage from "./Pages/CreatePage";
import ListPage from "./Pages/ListPage";
import DetailedPageResto from "./components/DetailedPageResto";

import HomePage from "./Pages/HomePage";
import RegisterComp from "./components/Auth/RegisterComp";
import ProfilePage from "./Pages/ProfilePage";
import Loginpage from "./Pages/Loginpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import EditForm from "./Pages/EditForm";
import SidebarSearch from "./components/SidebarSearch";
import UploadImage from "./components/Form/UploadImage";

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

  return (
    <BrowserRouter>
      <Navbar {...{ handleLogout }} />
      <Routes>
        <Route path="/" element={<HomePage userDetails={userDetails} />} />
        <Route path="/secret/register" element={<RegisterComp />} />
        <Route path="/login" element={<Loginpage />} />
        {userDetails ? (
          <>
            <Route path="/new" element={<CreatePage />} />
            <Route
              path="/list"
              element={<ListPage {...{ setIsEditing, setIsnew, editFunc }} />}
            />
            <Route
              path="/restaurants/:id"
              element={
                <DetailedPageResto user={userDetails} {...{ editFunc }} />
              }
            />
            <Route
              path="/edit-restaurant/:id"
              // element={<CreatePage />}
              element={
                <EditForm {...{ selectedRestaurant, isNew, setIsEditing }} />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage {...{ userDetails, handleLogout }} />}
            />
            <Route path="/test" element={<UploadImage />} />
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
