import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { ProblemProvider } from './context/ProblemContext';
import LandingPage from './pages/LandingPage';
import Blind75Library from './pages/Blind75Library';
import TwoSumPage from './pages/TwoSumPage';
import TwoSumWorkspace from './pages/TwoSumWorkspace';
import StockPage from './pages/StockPage';
import StockWorkspace from './pages/StockWorkspace';
import ContainsDuplicatePage from './pages/ContainsDuplicatePage';
import ContainsDuplicateWorkspace from './pages/ContainsDuplicateWorkspace';
import ProductOfArrayExceptSelfPage from './pages/ProductOfArrayExceptSelfPage';
import ProductOfArrayExceptSelfWorkspace from './pages/ProductOfArrayExceptSelfWorkspace';
import MaximumSubarrayPage from './pages/MaximumSubarrayPage';
import MaximumSubarrayWorkspace from './pages/MaximumSubarrayWorkspace';
import MaximumProductSubarrayPage from './pages/MaximumProductSubarrayPage';
import MaximumProductSubarrayWorkspace from './pages/MaximumProductSubarrayWorkspace';
import FindMinInRotatedArrayPage from './pages/FindMinInRotatedArrayPage';
import FindMinInRotatedArrayWorkspace from './pages/FindMinInRotatedArrayWorkspace';
import SearchInRotatedArrayPage from './pages/SearchInRotatedArrayPage';
import SearchInRotatedArrayWorkspace from './pages/SearchInRotatedArrayWorkspace';
import ThreeSumPage from './pages/ThreeSumPage';
import ThreeSumWorkspace from './pages/ThreeSumWorkspace';
import ContainerWithMostWaterPage from './pages/ContainerWithMostWaterPage';
import ContainerWithMostWaterWorkspace from './pages/ContainerWithMostWaterWorkspace';
import ContainerWithMostWaterLearningPage from './pages/ContainerWithMostWaterLearningPage';
import AuthPage from './pages/AuthPage';
import ProblemPlaceholder from './pages/ProblemPlaceholder';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
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
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/problem/1" element={<TwoSumPage />} />
            <Route path="/problem/1/visualize" element={<TwoSumWorkspace />} />
            <Route path="/problem/2" element={<StockPage />} />
            <Route path="/problem/2/visualize" element={<StockWorkspace />} />
            <Route path="/problem/3" element={<ContainsDuplicatePage />} />
            <Route path="/problem/3/visualize" element={<ContainsDuplicateWorkspace />} />
            <Route path="/problem/4" element={<ProductOfArrayExceptSelfPage />} />
            <Route path="/problem/4/visualize" element={<ProductOfArrayExceptSelfWorkspace />} />
            <Route path="/problem/5" element={<MaximumSubarrayPage />} />
            <Route path="/problem/5/visualize" element={<MaximumSubarrayWorkspace />} />
            <Route path="/problem/6" element={<MaximumProductSubarrayPage />} />
            <Route path="/problem/6/visualize" element={<MaximumProductSubarrayWorkspace />} />
            <Route path="/problem/7" element={<FindMinInRotatedArrayPage />} />
            <Route path="/problem/7/visualize" element={<FindMinInRotatedArrayWorkspace />} />
            <Route path="/problem/8" element={<SearchInRotatedArrayPage />} />
            <Route path="/problem/8/visualize" element={<SearchInRotatedArrayWorkspace />} />
            <Route path="/problem/9" element={<ThreeSumPage />} />
            <Route path="/problem/9/visualize" element={<ThreeSumWorkspace />} />
            <Route path="/problem/10" element={<ContainerWithMostWaterPage />} />
            <Route path="/problem/10/learn" element={<ContainerWithMostWaterLearningPage />} />
            <Route path="/problem/10/visualize" element={<ContainerWithMostWaterWorkspace />} />
            <Route path="/problem/:id" element={<ProblemPlaceholder />} />
          </Routes>          </div>
        </ProblemProvider>
      </AuthProvider>
    </HashRouter>
  );
}
