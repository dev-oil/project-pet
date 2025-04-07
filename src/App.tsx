import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';
import { ShelterPage } from './pages/ShelterPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='/shelters' element={<ShelterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
