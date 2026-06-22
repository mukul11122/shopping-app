import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../api';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await ordersAPI.getAll();
      setOrders(res.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h4>Order #{order.id}</h4>
                <span className="status">{order.status}</span>
              </div>
              <div className="order-details">
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                <p>Total: ${order.total_amount.toFixed(2)}</p>
              </div>
              <div className="order-items">
                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.product.name} x {item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
