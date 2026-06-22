import React, { useState, useEffect } from 'react';
import { productsAPI, ordersAPI } from '../api';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await productsAPI.getById(id);
      setProduct(res.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product.id, quantity);
      alert('Added to cart!');
      setQuantity(1);
    } catch (error) {
      alert('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image">
          {product.image_url && <img src={product.image_url} alt={product.name} />}
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="stock">In Stock: {product.stock}</p>
          
          {product.stock > 0 ? (
            <div className="add-to-cart-section">
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button
                className="btn-success"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          ) : (
            <p className="out-of-stock">Out of Stock</p>
          )}
        </div>
      </div>
      
      <ReviewList productId={id} />
      <ReviewForm productId={id} onReviewAdded={fetchProduct} />
    </div>
  );
};

export default ProductDetail;
