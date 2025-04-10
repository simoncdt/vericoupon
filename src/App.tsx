import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './components/LoadingProvider';
import HomePage from './pages/HomePage';
import VerificationPage from './pages/VerificationPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <LoadingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verify/:provider" element={<VerificationPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </LoadingProvider>
    </Router>
  );
}

export default App;