import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../../pages/Home/Home';
import Catalog from '../../pages/Catalog/Catalog';
import Details from '../../pages/Details/Details'; // Import the Details component

import '../../styles/colors.module.css';  // Global styles

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        {/* <Route path="/details/:id" render={() => <Details campers={campers} />} /> */}
        <Route path="/details/:id" element={<Details />} />

        {/* <Route path="/details/:id" element={<Details />} /> Define the route for Details page */}
      </Routes>
    </Router>
  );
}

export default App;



