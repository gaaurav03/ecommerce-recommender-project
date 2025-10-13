import React, { useState, useEffect } from 'react';
import { getCategories, getBrands, getPriceRange } from '../services/api';
import '../styles/FilterPanel.css';

const FilterPanel = ({ onApplyFilters, isLoading }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('score');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadBrands(selectedCategory);
      loadPriceRange(selectedCategory);
    } else {
      loadBrands();
      loadPriceRange();
    }
    setSelectedBrands([]);
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadBrands = async (category = null) => {
    try {
      const data = await getBrands(category);
      setBrands(data.brands);
    } catch (error) {
      console.error('Error loading brands:', error);
    }
  };

  const loadPriceRange = async (category = null) => {
    try {
      const data = await getPriceRange(category);
      setPriceRange(data);
      setMinPrice(data.min);
      setMaxPrice(data.max);
    } catch (error) {
      console.error('Error loading price range:', error);
    }
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategory || undefined,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      min_price: minPrice,
      max_price: maxPrice,
      min_rating: minRating > 0 ? minRating : undefined,
      sort_by: sortBy,
      limit: 50,
    };

    onApplyFilters(filters);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setMinRating(0);
    setSortBy('score');
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <button onClick={handleReset} className="reset-btn">
          Reset All
        </button>
      </div>

      <div className="filter-section">
        <label className="filter-label">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Brands</label>
        <div className="brand-list">
          {brands.length === 0 && <p className="no-data">No brands available</p>}
          {brands.map((brand) => (
            <label key={brand} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="checkbox-input"
              />
              <span className="checkbox-text">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">
          Price Range: ${minPrice.toFixed(0)} - ${maxPrice.toFixed(0)}
        </label>
        <div className="range-inputs">
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="range-slider"
          />
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="range-slider"
          />
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Minimum Rating: {minRating}</label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="range-slider"
        />
        <div className="rating-labels">
          <span>0</span>
          <span>2.5</span>
          <span>5</span>
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="score">Best Match</option>
          <option value="rating">Highest Rating</option>
          <option value="reviews">Most Reviews</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <button
        onClick={handleApplyFilters}
        disabled={isLoading}
        className="apply-btn"
      >
        {isLoading ? 'Loading...' : 'Apply Filters'}
      </button>
    </div>
  );
};

export default FilterPanel;