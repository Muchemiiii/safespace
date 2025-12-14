import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

import Home from './Pages/Home';
import Report from './Pages/Report';
import About from './Pages/About';
import Signin from './Pages/Signin';
import CounselorSignup from './Pages/CounselorSignup';
import SurvivorSignup from './Pages/SurvivorSignup';
import Chatbot from './Pages/Chatbot';
import Logout from './Pages/Logout';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/counselor-signup" element={<CounselorSignup />} />
          <Route path="/survivor-signup" element={<SurvivorSignup />} />
          <Route path="/about" element={<About />} />
          <Route path="/report" element={<Report />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;