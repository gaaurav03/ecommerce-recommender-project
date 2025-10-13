import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  const getColorClass = (color) => {
    return color ? color.toLowerCase() : 'default';
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <h3 className="product-title">{product.model}</h3>
        <span className="product-brand">{product.brand}</span>
      </div>

      <div className="product-category">
        <span className="category-badge">{product.category}</span>
      </div>

      <div className="product-rating">
        <div className="stars">
          {renderRating(product.rating)}
        </div>
        <span className="rating-value">{product.rating}</span>
        <span className="reviews-count">({product.num_reviews} reviews)</span>
      </div>

      <div className="product-price">
        <span className="currency">{product.currency}</span>
        <span className="price">${product.price.toFixed(2)}</span>
      </div>

      {product.specs && (
        <div className="product-specs">
          {product.specs.ram && (
            <div className="spec-item">
              <span className="spec-label">RAM:</span>
              <span className="spec-value">{product.specs.ram}</span>
            </div>
          )}
          {product.specs.storage && (
            <div className="spec-item">
              <span className="spec-label">Storage:</span>
              <span className="spec-value">{product.specs.storage}</span>
            </div>
          )}
          {product.specs.display && (
            <div className="spec-item">
              <span className="spec-label">Display:</span>
              <span className="spec-value">{product.specs.display}</span>
            </div>
          )}
          {product.specs.battery && (
            <div className="spec-item">
              <span className="spec-label">Battery:</span>
              <span className="spec-value">{product.specs.battery}</span>
            </div>
          )}
          {product.specs.connectivity && (
            <div className="spec-item">
              <span className="spec-label">Connectivity:</span>
              <span className="spec-value">{product.specs.connectivity}</span>
            </div>
          )}
          {product.specs.color && (
            <div className="spec-item">
              <span className="spec-label">Color:</span>
              <span className={`spec-value color-${getColorClass(product.specs.color)}`}>
                {product.specs.color}
              </span>
            </div>
          )}
        </div>
      )}

      {product.sample_review && (
        <div className="product-review">
          <p className="review-text">{product.sample_review.split('||')[0].trim()}</p>
        </div>
      )}

      {product.recommendation_score && (
        <div className="recommendation-score">
          <span className="score-label">Match Score:</span>
          <span className="score-value">{(product.recommendation_score * 100).toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;