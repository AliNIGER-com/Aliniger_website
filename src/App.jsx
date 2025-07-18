import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import LocalProducts from './pages/LocalProducts.jsx';
import AlibabaProducts from './pages/AlibabaProducts.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import AlibabaProductDetailsScreen from './pages/AlibabaProductDetailsScreen.jsx';
import AlibabaPaiement from './pages/AlibabaPaiement.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LocalProducts />} />
        <Route path="/local" element={<LocalProducts />} />
        <Route path="/alibaba" element={<AlibabaProducts />} />
        <Route path="/product/:type/:id" element={<ProductDetails />} />
        <Route path="/alibaba/product/:id" element={<AlibabaProductDetailsScreen />} />
        <Route path="/paiement" element={<AlibabaPaiement />} />
      </Routes>
    </Router>
  );
}

export default App;
