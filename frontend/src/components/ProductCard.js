import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const StarRating = ({ rating }) => {
  const stars = Math.round(rating);
  return (
    <div className="star-rating">
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
      <span className="rating-count">({Math.floor(Math.random() * 5000 + 100)})</span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card">
      {discount && <span className="badge-discount">-{discount}%</span>}
      {product.isPrime && <span className="badge-prime">prime</span>}

      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-wrapper">
          <img
            src={product.imageUrl || `https://picsum.photos/seed/${product.id}/300/300`}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </div>
        <div className="product-info">
          <p className="product-name">{product.name}</p>
          <StarRating rating={product.rating || 4} />
          <div className="product-price-row">
            <span className="product-price">₹{product.price?.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="product-original-price">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
            )}
          </div>
          {product.isPrime && (
            <div className="prime-badge">
              <span>⚡</span> FREE Delivery by Tomorrow
            </div>
          )}
        </div>
      </Link>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
