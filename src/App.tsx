import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { AnimalsDetailPage } from './pages/AnimalsDetailPage';
import { AnimalsPage } from './pages/AnimalsPage';
import { HomePage } from './pages/HomePage';
import { ResultPageWrapper } from './pages/ResultPageWrapper';
import { TestPage } from './pages/TestPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/result' element={<ResultPageWrapper />} />
          <Route path='/animals' element={<AnimalsPage />} />
          <Route path='/animals/:id' element={<AnimalsDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
