import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await cartAPI.getCart();
      setCart(res.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const res = await cartAPI.addItem(productId, quantity);
      setCart(res.data.cart);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const res = await cartAPI.updateItem(itemId, quantity);
      setCart(res.data.cart);
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await cartAPI.removeItem(itemId);
      setCart(res.data.cart);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, fetchCart, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
