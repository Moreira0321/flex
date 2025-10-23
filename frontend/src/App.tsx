import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { PublicReviewDisplay } from './components/PublicReviewDisplay';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="nav-modern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-8">
                <Link to="/" className="nav-brand">
                  Flex Living
                </Link>
                <div className="flex space-x-6">
                  <Link 
                    to="/dashboard" 
                    className="nav-link"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/reviews" 
                    className="nav-link"
                  >
                    Public Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reviews" element={<PublicReviewDisplay />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const HomePage: React.FC = () => {
  return (
    <div className="hero-section">
      <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in-up">
          <h1 className="hero-title">
            Flex Living Reviews Dashboard
          </h1>
          <p className="hero-subtitle">
            Manage guest reviews and property performance with our beautiful, intuitive interface
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
            <Link 
              to="/dashboard"
              className="card-feature animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center mb-4">
                <div className="stat-icon primary mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Manager Dashboard</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Review and approve guest reviews, analyze property performance, and manage review settings with powerful analytics and insights.
              </p>
            </Link>
            
            <Link 
              to="/reviews"
              className="card-feature animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="flex items-center mb-4">
                <div className="stat-icon success mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Public Reviews</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                View approved guest reviews as they would appear on your property pages, showcasing your property's best features.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
