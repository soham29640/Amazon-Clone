import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrders } from '../utils/api';
import './OrdersPage.css';

const mockOrders = [
  { id: 'ORD001', date: '2024-11-15', status: 'Delivered', total: 24990, items: [{ name: 'Sony WH-1000XM5 Headphones', qty: 1, price: 24990, imageUrl: 'https://picsum.photos/seed/headphone/80/80' }] },
  { id: 'ORD002', date: '2024-11-20', status: 'Shipped', total: 598, items: [{ name: 'Atomic Habits', qty: 1, price: 399, imageUrl: 'https://picsum.photos/seed/book2/80/80' }, { name: 'The Alchemist', qty: 1, price: 199, imageUrl: 'https://picsum.photos/seed/book1/80/80' }] },
  { id: 'ORD003', date: '2024-11-22', status: 'Processing', total: 129900, items: [{ name: 'Apple iPhone 15 Pro', qty: 1, price: 129900, imageUrl: 'https://picsum.photos/seed/phone/80/80' }] },
];

const statusColors = { Delivered: '#007600', Shipped: '#0066c0', Processing: '#FF9900', Cancelled: '#B12704' };

const OrdersPage = () => {
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch {
        setOrders(mockOrders);
      } finally {
        setLoading(false);
      }
    };
    if (isLoggedIn) fetch();
    else setLoading(false);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="orders-login container">
        <div className="orders-login-box">
          <h2>Your Orders</h2>
          <p>Please sign in to view your orders.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page container">
      <h1 className="orders-title">Your Orders</h1>
      {loading ? <div className="spinner" /> : (
        orders.length === 0 ? (
          <div className="no-orders">
            <p>You have no orders yet.</p>
            <Link to="/" className="btn-orange">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-meta">
                    <div>
                      <span className="meta-label">ORDER PLACED</span>
                      <span className="meta-value">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div>
                      <span className="meta-label">TOTAL</span>
                      <span className="meta-value">₹{order.total?.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="meta-label">SHIP TO</span>
                      <span className="meta-value address-link">Your Address ▾</span>
                    </div>
                  </div>
                  <div className="order-id-section">
                    <span className="meta-label">ORDER # {order.id}</span>
                    <div className="order-actions">
                      <button className="order-action-btn">View order details</button>
                      <button className="order-action-btn">Invoice</button>
                    </div>
                  </div>
                </div>

                <div className="order-body">
                  <div className="order-status-bar">
                    <span className="status-text" style={{ color: statusColors[order.status] || '#333' }}>
                      ● {order.status}
                    </span>
                  </div>
                  <div className="order-items">
                    {(order.items || []).map((item, i) => (
                      <div key={i} className="order-item">
                        <img src={item.imageUrl || `https://picsum.photos/seed/${i}/80/80`} alt={item.name} />
                        <div className="order-item-info">
                          <p className="order-item-name">{item.name}</p>
                          <p className="order-item-qty">Qty: {item.qty}</p>
                          <div className="order-item-btns">
                            <button className="order-item-btn">Buy it again</button>
                            <Link to={`/product/${i + 1}`} className="order-item-btn">View item</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default OrdersPage;
