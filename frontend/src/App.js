import React, { useState, useEffect } from 'react';
import FilterPanel from './components/FilterPanel';
import ProductList from './components/ProductList';
import LoadingSpinner from './components/LoadingSpinner';
import { getRecommendations } from './services/api';
import './styles/App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadInitialProducts();
  }, []);

  const loadInitialProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRecommendations({
        sort_by: 'score',
        limit: 20,
      });
      setProducts(data.products);
      setTotalCount(data.total);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyFilters = async (filters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRecommendations(filters);
      setProducts(data.products);
      setTotalCount(data.total);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to load recommendations. Please try again.');
      console.error('Error loading recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Electronics Product Recommender</h1>
          <p className="header-subtitle">Find the perfect product for your needs</p>
        </div>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <FilterPanel onApplyFilters={handleApplyFilters} isLoading={isLoading} />
        </aside>

        <main className="main-content">
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={loadInitialProducts} className="retry-btn">
                Retry
              </button>
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {!isLoading && !error && hasSearched && (
            <ProductList products={products} totalCount={totalCount} />
          )}

          {!isLoading && !error && !hasSearched && (
            <div className="welcome-message">
              <h2>Welcome to Electronics Recommender</h2>
              <p>Use the filters on the left to find your perfect product</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;