import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./Pages/CreatePage";
import ListPage from "./Pages/ListPage";
import "react-loading-skeleton/dist/skeleton.css";
import DetailedPageResto from "./components/DetailedPageResto";
import EditRestaurantForm from "./Pages/EditRestaurantForm";
import HomePage from "./Pages/HomePage";
import RegisterComp from "./components/Auth/RegisterComp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./Pages/ProfilePage";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Loginpage from "./Pages/Loginpage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  const [isNew, setIsnew] = useState("");
  const [isEditing, setisEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const editSelectedRestaurant = (restaurant) => {
    setisEditing(true);
    setIsnew(restaurant);
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("User not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handlelogout() {
    try {
      await auth.signOut();
      window.location.href = "/";
      console.log("log out sucessfull");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Navbar {...{ handlelogout }} />
        <Routes>
          <Route path="/" element={<HomePage {...{ userDetails }} />} />
          <Route path="/secret/register" element={<RegisterComp />} />
          <Route path="/login" element={<Loginpage />} />
          <Route
            path="/new"
            element={
              <ProtectedRoute user={userDetails}>
                <CreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRoute user={userDetails}>
                <ListPage {...{ editSelectedRestaurant }} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurants/:id"
            element={
              <ProtectedRoute user={userDetails}>
                <DetailedPageResto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-restaurant/:id"
            element={
              <ProtectedRoute user={userDetails}>
                <EditRestaurantForm {...{ isEditing, isNew }} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute user={userDetails}>
                <ProfilePage {...{ handlelogout, userDetails }} />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
