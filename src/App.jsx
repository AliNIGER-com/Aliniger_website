import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import LocalProducts from './pages/LocalProducts.jsx';
import AlibabaProducts from './pages/AlibabaProducts.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import BoutiquePage from './pages/BoutiqueScreen.jsx';
import BoutiqueDetail from './pages/BoutiqueDetail.jsx';

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
