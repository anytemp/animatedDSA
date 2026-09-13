import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { ProblemProvider } from './context/ProblemContext';
import LandingPage from './pages/LandingPage';
import Blind75Library from './pages/Blind75Library';
import TwoSumPage from './pages/TwoSumPage';
import TwoSumVisualization from './pages/TwoSumVisualization';
import ProblemPlaceholder from './pages/ProblemPlaceholder';

export default function App() {
  return (
    <HashRouter>
      <ProblemProvider>
        <div className="relative min-h-screen bg-bg">
          {/* Grain texture overlay */}
          <div className="grain-overlay" />

          {/* Scroll to top on route change */}
          <ScrollToTop />

          {/* Header */}
          <Header />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/blind75" element={<Blind75Library />} />
            <Route path="/problem/1" element={<TwoSumPage />} />
            <Route path="/problem/1/visualize" element={<TwoSumVisualization />} />
            <Route path="/problem/:id" element={<ProblemPlaceholder />} />
          </Routes>
        </div>
      </ProblemProvider>
    </HashRouter>
  );
}
