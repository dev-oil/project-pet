import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { MbtiProvider } from './contexts/MbtiContext';
import { AboutPage } from './pages/About/AboutPage';
import { AnimalsPageWrapper } from './pages/Animals/AnimalsPageWrapper';
import { AnimalsDetailPageWrapper } from './pages/AnimalsDetail/AnimalsDetailPageWrapper';
import { FavoritePageWrapper } from './pages/Favorite/FavoritePageWrapper';
import { HomePage } from './pages/Home/HomePage';
import { ResultPage } from './pages/Result/ResultPage';
import { TestPage } from './pages/Test/TestPage';

import './App.css';

function App() {
  return (
    <MbtiProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/test' element={<TestPage />} />
            <Route path='/result' element={<ResultPage />} />
            <Route path='/animals' element={<AnimalsPageWrapper />} />
            <Route path='/animals/:id' element={<AnimalsDetailPageWrapper />} />
            <Route path='/favorites' element={<FavoritePageWrapper />} />
          </Routes>
        </Layout>
      </Router>
    </MbtiProvider>
  );
}

export default App;
