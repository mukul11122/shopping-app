import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ordersAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, fetchCart, removeFromCart, updateCartItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    setLoading(false);
  }, [cart]);

  const handleCheckout = async () => {
    try {
      setCheckingOut(true);
      const res = await ordersAPI.create();
      alert('Order placed successfully!');
      navigate(`/orders/${res.data.order.id}`);
      fetchCart();
    } catch (error) {
      alert('Checkout failed: ' + (error.response?.data?.error || 'Unknown error'));
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) return <div className="loading">Loading cart...</div>;

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      {!cart || cart.items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.product.name}</h4>
                  <p>${item.product.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateCartItem(item.id, parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="item-total">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Total: ${cart.total.toFixed(2)}</h3>
            <button
              className="btn-success"
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              {checkingOut ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
