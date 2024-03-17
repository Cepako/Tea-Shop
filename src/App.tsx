import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './components/Navigation';
import Page from './components/pages/HomePage';
import Teas from './components/pages/Teas';
import Extras from './components/pages/Extras';
import About from './components/pages/About';
import Blog from './components/pages/Blog';
import Contact from './components/pages/Contact';
import PopUp from './components/PopUp';
import ProductDetails from './components/pages/ProductDetails';
import CartPage from './components/pages/CartPage';
import Info from './components/Info';
import Footer from './components/Footer';
import GoUpButton from './components/GoUpButton';

import ScrollToTop from './components/ScrollToTop';

import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className='App'>
        <Navigation />
        <Routes>
          <Route path='/' element={<Page />} />
          <Route path='/teas' element={<Teas />} />
          <Route path='/teas/:productLink' element={<ProductDetails />} />;
          <Route path='/extras/:productLink' element={<ProductDetails />} />;
          <Route path='/cart' element={<CartPage />} />;
          <Route path='/extras' element={<Extras />} />
          <Route path='/about' element={<About />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Info />
        <Footer />
        <GoUpButton />
        <PopUp />
      </div>
    </Router>
  );
};

export default App;
