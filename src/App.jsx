import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import CreatePage from "./Pages/CreatePage";
import ListPage from "./Pages/ListPage";
import DetailedPageResto from "./components/DetailedPageResto";
import EditRestaurantForm from "./Pages/EditRestaurantForm";
import HomePage from "./Pages/HomePage";
import RegisterComp from "./components/Auth/RegisterComp";
import ProfilePage from "./Pages/ProfilePage";
import Loginpage from "./Pages/Loginpage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            console.log("User not logged in");
          }
        } else {
          setUserDetails(null); // Ensure userDetails is null if no user is authenticated
        }
      });
    };

    fetchUserData();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage userDetails={userDetails} />} />
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
              <ListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants/:id"
          element={<DetailedPageResto user={userDetails} />}
        />
        <Route
          path="/edit-restaurant/:id"
          element={
            <ProtectedRoute user={userDetails}>
              <EditRestaurantForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={userDetails}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
