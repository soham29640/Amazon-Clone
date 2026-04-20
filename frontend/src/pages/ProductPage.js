import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProduct } from '../utils/api';
import './ProductPage.css';

const mockProducts = {
  1: { id: 1, name: 'Apple iPhone 15 Pro (256GB) - Natural Titanium', price: 129900, originalPrice: 149900, rating: 5, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/phone/500/500', description: 'The iPhone 15 Pro features a strong and light aerospace-grade titanium design. The back is textured matte glass. The titanium band around the frame is fine-brushed. The new corner cap design adds strength and durability. Comes with A17 Pro chip, 48MP main camera, and USB 3 support.', brand: 'Apple', stock: 15, reviews: [{ user: 'Rahul K', rating: 5, comment: 'Amazing phone! The camera is superb.' }, { user: 'Priya S', rating: 4, comment: 'Great build quality, slightly expensive.' }] },
  2: { id: 2, name: 'Samsung 65" 4K QLED Smart TV', price: 89999, originalPrice: 120000, rating: 4, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/tv/500/500', description: 'Experience stunning 4K QLED picture quality with vibrant colors and deep contrast. Smart TV with built-in Alexa, Wi-Fi, and Bluetooth connectivity.', brand: 'Samsung', stock: 8, reviews: [{ user: 'Amit M', rating: 4, comment: 'Great picture quality, setup was easy.' }] },
  3: { id: 3, name: 'Sony WH-1000XM5 Wireless Headphones', price: 24990, originalPrice: 34990, rating: 5, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/headphone/500/500', description: 'Industry-leading noise cancellation with 8 microphones. 30-hour battery life. Multipoint connection for two devices simultaneously.', brand: 'Sony', stock: 22, reviews: [] },
};

const StarRating = ({ rating, interactive, onRate }) => (
  <div className="stars-row">
    {[1,2,3,4,5].map(s => (
      <span
        key={s}
        className={`star-icon ${s <= rating ? 'filled' : ''} ${interactive ? 'clickable' : ''}`}
        onClick={() => interactive && onRate && onRate(s)}
      >★</span>
    ))}
  </div>
);

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState('');
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch {
        setProduct(mockProducts[id] || mockProducts[1]);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="spinner" />;
  if (!product) return <div className="not-found">Product not found. <Link to="/">Go Home</Link></div>;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const thumbnails = [product.imageUrl, ...Array(3).fill(null).map((_, i) => `https://picsum.photos/seed/${product.id + i + 10}/100/100`)];

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedMsg('✓ Added to cart!');
    setTimeout(() => setAddedMsg(''), 2500);
  };

  return (
    <div className="product-page container">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link> › <Link to={`/search?q=${product.category}`}>{product.category}</Link> › <span>{product.name.slice(0, 40)}...</span>
      </nav>

      <div className="product-detail">
        {/* Images */}
        <div className="product-images">
          <div className="thumb-list">
            {thumbnails.map((img, i) => (
              <img key={i} src={img} alt="" className={`thumb ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)} />
            ))}
          </div>
          <div className="main-image-box">
            <img src={thumbnails[activeImg]} alt={product.name} className="main-image" />
            {discount && <span className="img-badge">-{discount}%</span>}
          </div>
        </div>

        {/* Info */}
        <div className="product-details-info">
          <p className="product-brand">Visit the {product.brand || 'Brand'} Store</p>
          <h1 className="product-title">{product.name}</h1>
          <div className="rating-row">
            <StarRating rating={product.rating || 4} />
            <span className="rating-label">{product.rating || 4}.0 out of 5</span>
            <span className="rating-count-link">({(product.reviews || []).length + 127} ratings)</span>
          </div>
          <hr className="divider" />

          <div className="price-block">
            {product.originalPrice && (
              <p className="orig-price-label">M.R.P.: <s>₹{product.originalPrice?.toLocaleString('en-IN')}</s></p>
            )}
            <p className="deal-price">
              Deal Price: <span className="big-price">₹{product.price?.toLocaleString('en-IN')}</span>
            </p>
            {discount && <p className="save-label">You save: ₹{(product.originalPrice - product.price)?.toLocaleString('en-IN')} ({discount}%)</p>}
            {product.isPrime && <div className="prime-tag">⚡ prime — FREE delivery tomorrow</div>}
          </div>
          <hr className="divider" />

          <div className="about-item">
            <h3>About this item</h3>
            <p>{product.description}</p>
          </div>
        </div>

        {/* Buy Box */}
        <div className="buy-box">
          <p className="buy-price">₹{product.price?.toLocaleString('en-IN')}</p>
          {product.isPrime && <div className="buy-prime">⚡ FREE Delivery Tomorrow</div>}
          <p className="in-stock">In Stock.</p>

          <div className="qty-row">
            <label>Qty:</label>
            <select value={qty} onChange={e => setQty(Number(e.target.value))}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <button className="add-cart-big" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now-big">Buy Now</button>
          {addedMsg && <p className="added-msg">{addedMsg}</p>}

          <div className="buy-meta">
            <p>🔒 <strong>Secure transaction</strong></p>
            <p>Ships from: <strong>Amazon Clone</strong></p>
            <p>Sold by: <strong>{product.brand || 'Amazon Clone'}</strong></p>
            <p>Returns: <strong>Eligible for Return, Refund or Replacement</strong></p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="overall-rating">
          <StarRating rating={product.rating || 4} />
          <span>{product.rating || 4} out of 5</span>
        </div>
        {(product.reviews || []).map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <span className="reviewer-name">{r.user}</span>
              <StarRating rating={r.rating} />
            </div>
            <p>{r.comment}</p>
          </div>
        ))}
        {(!product.reviews || product.reviews.length === 0) && (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
      </section>
    </div>
  );
};

export default ProductPage;
