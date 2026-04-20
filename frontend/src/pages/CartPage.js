import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) { navigate('/login?redirect=checkout'); return; }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty container">
        <div className="empty-cart-box">
          <div className="empty-icon">🛒</div>
          <h2>Your Amazon Clone Cart is empty</h2>
          <p>Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items-section">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <button className="deselect-all" onClick={clearCart}>Deselect all items</button>
          </div>

          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.imageUrl || `https://picsum.photos/seed/${item.id}/120/120`}
                alt={item.name}
                className="cart-item-img"
              />
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                <p className="cart-item-stock">In Stock</p>
                {item.isPrime && <p className="cart-prime">⚡ Prime eligible</p>}
                <div className="cart-item-actions">
                  <div className="qty-selector">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <span className="action-sep">|</span>
                  <button className="delete-btn" onClick={() => removeFromCart(item.id)}>Delete</button>
                  <span className="action-sep">|</span>
                  <button className="save-btn">Save for later</button>
                </div>
              </div>
              <div className="cart-item-price">
                <p className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                {item.quantity > 1 && (
                  <p className="item-unit-price">₹{item.price?.toLocaleString('en-IN')} each</p>
                )}
              </div>
            </div>
          ))}

          <div className="cart-subtotal-bottom">
            Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items):
            <strong> ₹{cartTotal.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-card">
            {cartItems.some(i => i.isPrime) && (
              <p className="summary-prime">✓ Your order qualifies for FREE Delivery</p>
            )}
            <p className="summary-subtotal">
              Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items):{' '}
              <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
            </p>
            <div className="gift-check">
              <input type="checkbox" id="gift" />
              <label htmlFor="gift">This order contains a gift</label>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>

          <div className="emi-card">
            <p className="emi-title">EMI Available</p>
            <p className="emi-text">Starting ₹{Math.round(cartTotal / 12).toLocaleString('en-IN')}/mo for 12 months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
