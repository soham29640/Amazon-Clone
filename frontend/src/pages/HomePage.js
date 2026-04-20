import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/api';
import './HomePage.css';

// Mock products for demo (replace with API call)
const mockProducts = [
  { id: 1, name: 'Apple iPhone 15 Pro (256GB) - Natural Titanium', price: 129900, originalPrice: 149900, rating: 5, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/phone/300/300' },
  { id: 2, name: 'Samsung 65" 4K QLED Smart TV', price: 89999, originalPrice: 120000, rating: 4, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/tv/300/300' },
  { id: 3, name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 24990, originalPrice: 34990, rating: 5, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/headphone/300/300' },
  { id: 4, name: 'The Alchemist - Paulo Coelho (Paperback)', price: 199, originalPrice: 350, rating: 4, category: 'Books', imageUrl: 'https://picsum.photos/seed/book1/300/300' },
  { id: 5, name: 'Atomic Habits by James Clear', price: 399, originalPrice: 599, rating: 5, category: 'Books', isPrime: true, imageUrl: 'https://picsum.photos/seed/book2/300/300' },
  { id: 6, name: 'Nike Air Max 270 Running Shoes', price: 7995, originalPrice: 11995, rating: 4, category: 'Clothing', isPrime: true, imageUrl: 'https://picsum.photos/seed/shoe/300/300' },
  { id: 7, name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker', price: 8499, originalPrice: 12999, rating: 4, category: 'Home', imageUrl: 'https://picsum.photos/seed/pot/300/300' },
  { id: 8, name: 'LEGO Technic Bugatti Chiron Set', price: 15999, originalPrice: 19999, rating: 5, category: 'Toys', isPrime: true, imageUrl: 'https://picsum.photos/seed/lego/300/300' },
  { id: 9, name: 'Kindle Paperwhite (16GB) - Ad-Free', price: 13999, originalPrice: 16999, rating: 5, category: 'Electronics', isPrime: true, imageUrl: 'https://picsum.photos/seed/kindle/300/300' },
  { id: 10, name: 'boAt Airdopes 141 TWS Earbuds', price: 999, originalPrice: 2990, rating: 4, category: 'Electronics', imageUrl: 'https://picsum.photos/seed/earbuds/300/300' },
  { id: 11, name: 'Prestige Electric Kettle 1.8L', price: 799, originalPrice: 1299, rating: 4, category: 'Home', imageUrl: 'https://picsum.photos/seed/kettle/300/300' },
  { id: 12, name: 'Fastrack Analog Men\'s Watch', price: 1295, originalPrice: 2295, rating: 4, category: 'Clothing', imageUrl: 'https://picsum.photos/seed/watch/300/300' },
];

const categories = [
  { name: 'Electronics', icon: '💻', color: '#e8f0fe' },
  { name: 'Books', icon: '📚', color: '#fef3e8' },
  { name: 'Clothing', icon: '👕', color: '#e8fef0' },
  { name: 'Home', icon: '🏠', color: '#fef8e8' },
  { name: 'Sports', icon: '⚽', color: '#f0e8fe' },
  { name: 'Toys', icon: '🎮', color: '#fee8e8' },
];

const bannerSlides = [
  { bg: 'linear-gradient(135deg, #131921 0%, #232f3e 100%)', title: 'Great Indian Festival', subtitle: 'Up to 80% off on top brands', cta: 'Shop Now', link: '/search?q=sale' },
  { bg: 'linear-gradient(135deg, #FF9900 0%, #e68900 100%)', title: 'Prime Deals', subtitle: 'Exclusive offers for Prime members', cta: 'Explore Prime', link: '/' },
  { bg: 'linear-gradient(135deg, #007185 0%, #005f73 100%)', title: 'Electronics Bonanza', subtitle: 'Best deals on gadgets & more', cta: 'Shop Electronics', link: '/search?q=electronics' },
];

const HomePage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch from API in production
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        if (res.data && res.data.length > 0) setProducts(res.data);
      } catch {
        // Use mock data if API is not available
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <div className="spinner" />;

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <div className="hero-banner" style={{ background: bannerSlides[currentSlide].bg }}>
        <div className="hero-content">
          <h1 className="hero-title">{bannerSlides[currentSlide].title}</h1>
          <p className="hero-subtitle">{bannerSlides[currentSlide].subtitle}</p>
          <Link to={bannerSlides[currentSlide].link} className="hero-cta">
            {bannerSlides[currentSlide].cta} →
          </Link>
        </div>
        <div className="hero-dots">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </div>

      <div className="container">
        {/* Categories */}
        <section className="section">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={`/search?q=${cat.name.toLowerCase()}`} key={cat.name} className="category-card" style={{ background: cat.color }}>
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Deals */}
        <section className="section deals-section">
          <div className="section-header">
            <h2 className="section-title">⚡ Today's Deals</h2>
            <Link to="/search?q=deals" className="see-all">See all deals →</Link>
          </div>
          <div className="products-grid">
            {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Prime Banner */}
        <div className="prime-banner">
          <div className="prime-banner-content">
            <span className="prime-logo">⚡ prime</span>
            <div>
              <h3>Join Prime for FREE</h3>
              <p>Fast delivery, exclusive deals, Prime Video & more</p>
            </div>
            <button className="prime-btn">Try Prime Free</button>
          </div>
        </div>

        {/* All Products */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Recommended for You</h2>
            <Link to="/search?q=all" className="see-all">See all →</Link>
          </div>
          <div className="products-grid">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
