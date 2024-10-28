import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../../pages/Home/Home";
import Catalog from "../../pages/Catalog/Catalog";
import Details from "../../pages/Details/Details";
import MainLayout from "../MainLayout/MainLayout";

import "../../styles/main.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
