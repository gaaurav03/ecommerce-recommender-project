import React from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

const ProductList = ({ products, totalCount }) => {
  if (!products || products.length === 0) {
    return (
      <div className="product-list-empty">
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try adjusting your filters to see more results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Recommended Products</h2>
        <span className="product-count">{totalCount} products found</span>
      </div>
      <div className="product-list-grid">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;