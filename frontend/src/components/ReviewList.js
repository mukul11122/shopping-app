import React, { useState, useEffect } from 'react';
import { reviewsAPI } from '../api';
import '../styles/ReviewList.css';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await reviewsAPI.getByProductId(productId);
      setReviews(res.data.reviews);
      setAverageRating(res.data.average_rating);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading reviews...</div>;

  return (
    <div className="review-list-container">
      <h3>Customer Reviews</h3>
      {reviews.length > 0 && (
        <p className="average-rating">Average Rating: {averageRating.toFixed(1)}/5</p>
      )}
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <div className="reviews">
          {reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <strong>{review.user.username}</strong>
                <span className="rating">{'⭐'.repeat(review.rating)}</span>
              </div>
              <p>{review.comment}</p>
              <small>{new Date(review.created_at).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
