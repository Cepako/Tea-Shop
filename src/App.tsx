import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Page from './components/pages/HomePage';
import Teas from './components/pages/Teas';
import Extras from './components/pages/Extras';
import About from './components/pages/About';
import Blog from './components/pages/Blog';
import Contact from './components/pages/Contact';

import ScrollToTop from './components/ScrollToTop';

import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/teas" element={<Teas />} />
          <Route path="/extras" element={<Extras />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
