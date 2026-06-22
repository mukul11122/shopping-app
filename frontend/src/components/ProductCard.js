import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      setAddingToCart(true);
      await addToCart(product.id, 1);
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      {product.image_url && <img src={product.image_url} alt={product.name} />}
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p className="description">{product.description?.substring(0, 50)}...</p>
        <div className="product-card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <button
            className="btn-primary"
            onClick={handleAddToCart}
            disabled={addingToCart || product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : addingToCart ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
