import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../utils/api';
import './CheckoutPage.css';

const steps = ['Address', 'Payment', 'Review'];

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [address, setAddress] = useState({ name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '' });
  const [payment, setPayment] = useState({ method: 'cod' });

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = { items: cartItems, address, payment, total: cartTotal + 40 };
      const res = await placeOrder(orderData);
      setOrderId(res.data?.id || 'ORD' + Date.now());
    } catch {
      setOrderId('ORD' + Date.now());
    }
    setOrderPlaced(true);
    clearCart();
    setLoading(false);
  };

  if (orderPlaced) {
    return (
      <div className="order-success container">
        <div className="success-box">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p className="order-id-text">Order ID: <strong>{orderId}</strong></p>
          <p>Thank you for your purchase! Your order will be delivered within 2–5 business days.</p>
          <div className="success-actions">
            <button className="btn-primary" onClick={() => navigate('/orders')}>View Orders</button>
            <button className="btn-orange" onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1 className="checkout-title">Checkout</h1>

      {/* Steps */}
      <div className="checkout-steps">
        {steps.map((s, i) => (
          <div key={s} className={`checkout-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <div className="step-circle">{i < step ? '✓' : i + 1}</div>
            <span>{s}</span>
            {i < steps.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-main">
          {/* Step 0: Address */}
          {step === 0 && (
            <div className="checkout-card">
              <h2>Delivery Address</h2>
              <form onSubmit={handleAddressSubmit} className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input required value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input required value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} placeholder="10-digit mobile number" maxLength={10} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address Line 1 *</label>
                  <input required value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} placeholder="House No., Building, Street, Area" />
                </div>
                <div className="form-group">
                  <label>Address Line 2</label>
                  <input value={address.line2} onChange={e => setAddress({ ...address, line2: e.target.value })} placeholder="Landmark (optional)" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input required value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} placeholder="City" />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <select required value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })}>
                      <option value="">Select State</option>
                      {['Andhra Pradesh','Delhi','Gujarat','Karnataka','Kerala','Maharashtra','Rajasthan','Tamil Nadu','Uttar Pradesh','West Bengal'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>PIN Code *</label>
                    <input required value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} placeholder="6-digit PIN" maxLength={6} />
                  </div>
                </div>
                <button type="submit" className="btn-continue">Deliver to this Address</button>
              </form>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="checkout-card">
              <h2>Payment Method</h2>
              <form onSubmit={handlePaymentSubmit} className="payment-form">
                {[
                  { id: 'cod', label: '💵 Cash on Delivery', desc: 'Pay when your order arrives' },
                  { id: 'upi', label: '📱 UPI', desc: 'Google Pay, PhonePe, Paytm, etc.' },
                  { id: 'card', label: '💳 Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                  { id: 'netbanking', label: '🏦 Net Banking', desc: 'All major banks supported' },
                ].map(opt => (
                  <label key={opt.id} className={`payment-option ${payment.method === opt.id ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value={opt.id} checked={payment.method === opt.id} onChange={() => setPayment({ method: opt.id })} />
                    <div className="pay-label">
                      <span className="pay-name">{opt.label}</span>
                      <span className="pay-desc">{opt.desc}</span>
                    </div>
                  </label>
                ))}
                <div className="step-buttons">
                  <button type="button" className="btn-back" onClick={() => setStep(0)}>← Back</button>
                  <button type="submit" className="btn-continue">Continue</button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="checkout-card">
              <h2>Review Your Order</h2>
              <div className="review-address">
                <h3>Delivering to:</h3>
                <p><strong>{address.name}</strong> | {address.phone}</p>
                <p>{address.line1}{address.line2 ? ', ' + address.line2 : ''}</p>
                <p>{address.city}, {address.state} - {address.pincode}</p>
              </div>
              <div className="review-items">
                {cartItems.map(item => (
                  <div key={item.id} className="review-item">
                    <img src={item.imageUrl || `https://picsum.photos/seed/${item.id}/60/60`} alt={item.name} />
                    <div className="review-item-info">
                      <p>{item.name}</p>
                      <p>Qty: {item.quantity} × ₹{item.price?.toLocaleString('en-IN')}</p>
                    </div>
                    <p className="review-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
              <div className="step-buttons">
                <button type="button" className="btn-back" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-place-order" onClick={handlePlaceOrder} disabled={loading}>
                  {loading ? 'Placing Order...' : '🛍️ Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name.slice(0, 30)}... × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
            <hr />
            <div className="summary-row"><span>Items Total:</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
            <div className="summary-row"><span>Delivery:</span><span className="free-delivery">FREE</span></div>
            <div className="summary-row tax"><span>GST (18%):</span><span>₹{Math.round(cartTotal * 0.18).toLocaleString('en-IN')}</span></div>
            <hr />
            <div className="summary-row total"><span>Order Total:</span><span>₹{(cartTotal + Math.round(cartTotal * 0.18)).toLocaleString('en-IN')}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
