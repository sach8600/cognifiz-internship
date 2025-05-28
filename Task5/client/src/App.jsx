import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="navbar">
        <h1>My App</h1>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
