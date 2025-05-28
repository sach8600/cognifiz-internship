import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>Home</Link>
        <Link to="/about" style={{ textDecoration: 'none', color: 'blue' }}>About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
