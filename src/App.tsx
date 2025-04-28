import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { AnimalsPageWrapper } from './pages/Animals/AnimalsPageWrapper';
import { AnimalsDetailPageWrapper } from './pages/AnimalsDetail/AnimalsDetailPageWrapper';
import { HomePage } from './pages/HomePage';
import { ResultPage } from './pages/ResultPage';
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
          <Route path='/result' element={<ResultPage />} />
          <Route path='/animals' element={<AnimalsPageWrapper />} />
          <Route path='/animals/:id' element={<AnimalsDetailPageWrapper />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
