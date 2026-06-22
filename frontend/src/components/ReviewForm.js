import React, { useState } from 'react';
import { reviewsAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/ReviewForm.css';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Please login to leave a review');
      return;
    }

    try {
      setSubmitting(true);
      await reviewsAPI.create(productId, rating, comment);
      setMessage('Review added successfully!');
      setRating(5);
      setComment('');
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to add review');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="review-form-container">
      <h3>Leave a Review</h3>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className="form-group">
          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            required
          />
        </div>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
