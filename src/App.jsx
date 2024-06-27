import React from "react";
import Navbar from "./components/NavBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./Pages/CreatePage";
import ListPage from "./Pages/ListPage";
import "react-loading-skeleton/dist/skeleton.css";
import DetailedPageResto from "./components/DetailedPageResto";
import EditRestaurantForm from "./Pages/EditRestaurantForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/new" element={<CreatePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/restaurants/:id" element={<DetailedPageResto />} />
          <Route path="/edit-restaurant/:id" element={<EditRestaurantForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
