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
          <Route path="/new" element={<CreatePage />} />
          <Route
            path="/list"
            element={<ListPage {...{ editSelectedRestaurant }} />}
          />
          <Route path="/restaurants/:id" element={<DetailedPageResto />} />
          <Route
            path="/edit-restaurant/:id"
            element={<EditRestaurantForm {...{ isEditing, isNew }} />}
          />
          <Route path="/register" element={<RegisterComp />} />
          <Route
            path="/profile"
            element={<ProfilePage {...{ handlelogout, userDetails }} />}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
