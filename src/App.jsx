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

function App() {
  const [isNew, setIsnew] = useState("");
  const [isEditing, setisEditing] = useState(false);

  const editSelectedRestaurant = (restaurant) => {
    setisEditing(true);

    setIsnew(restaurant);
    // setCreateBookValues(restaurant);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
