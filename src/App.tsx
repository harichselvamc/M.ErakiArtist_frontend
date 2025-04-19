import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrderFormPage from './pages/OrderFormPage';
import ThankYouPage from './pages/ThankYouPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
            <Route path="/order/:productId" element={<OrderFormPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;