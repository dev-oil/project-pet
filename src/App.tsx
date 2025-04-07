import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';
import { ShelterPage } from './pages/ShelterPage';

import './App.css';
import { Layout } from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/result' element={<ResultPage />} />
          <Route path='/shelters' element={<ShelterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
