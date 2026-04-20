import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const { cartCount } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const categories = ['All', 'Electronics', 'Books', 'Clothing', 'Home', 'Sports', 'Toys'];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="navbar">
      {/* Top Bar */}
      <div className="navbar-top">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">amazon</span>
          <span className="logo-dot">clone</span>
        </Link>

        {/* Deliver To */}
        <div className="navbar-deliver">
          <span className="deliver-icon">📍</span>
          <div>
            <span className="deliver-label">Deliver to</span>
            <span className="deliver-location">India</span>
          </div>
        </div>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <select
            className="search-category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <input
            type="text"
            className="search-input"
            placeholder="Search Amazon Clone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        {/* Account */}
        <div className="navbar-account">
          {isLoggedIn ? (
            <div className="account-dropdown">
              <div className="account-info">
                <span className="account-label">Hello, {user?.name || 'User'}</span>
                <span className="account-main">Account & Lists ▾</span>
              </div>
              <div className="dropdown-menu">
                <Link to="/orders">Your Orders</Link>
                <Link to="/profile">Your Account</Link>
                <button onClick={logout}>Sign Out</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="account-info">
              <span className="account-label">Hello, Sign in</span>
              <span className="account-main">Account & Lists ▾</span>
            </Link>
          )}
        </div>

        {/* Orders */}
        <Link to="/orders" className="navbar-orders">
          <span className="account-label">Returns</span>
          <span className="account-main">& Orders</span>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="navbar-cart">
          <div className="cart-icon-wrapper">
            <span className="cart-emoji">🛒</span>
            <span className="cart-count">{cartCount}</span>
          </div>
          <span className="cart-text">Cart</span>
        </Link>
      </div>

      {/* Bottom Nav */}
      <div className="navbar-bottom">
        <button className="nav-all">☰ All</button>
        <nav className="nav-links">
          <Link to="/">Today's Deals</Link>
          <Link to="/">Customer Service</Link>
          <Link to="/search?q=electronics">Electronics</Link>
          <Link to="/search?q=books">Books</Link>
          <Link to="/search?q=fashion">Fashion</Link>
          <Link to="/search?q=home">Home & Garden</Link>
          <Link to="/search?q=toys">Toys</Link>
          <Link to="/" className="prime-link">Prime</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
