import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import LocalProducts from './pages/LocalProducts';
import AlibabaProducts from './pages/AlibabaProducts';
import ProductDetail from './pages/ProductDetail';
import BoutiquePage from './pages/BoutiqueScreen';
import BoutiqueDetail from './pages/BoutiqueDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LocalProducts />} />
        <Route path="/local" element={<LocalProducts />} />
        <Route path="/alibaba" element={<AlibabaProducts />} />
        <Route path="/product/:type/:id" element={<ProductDetail />} />
        <Route path="/boutiques" element={<BoutiquePage />} />
        <Route path="/boutique/:id" element={<BoutiqueDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
