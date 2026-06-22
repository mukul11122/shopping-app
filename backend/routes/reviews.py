from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import Review, Product, Order, OrderItem

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/product/<int:product_id>', methods=['GET'])
def get_product_reviews(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    reviews = Review.query.filter_by(product_id=product_id).all()
    
    return jsonify({
        'product_id': product_id,
        'reviews': [review.to_dict() for review in reviews],
        'average_rating': sum(r.rating for r in reviews) / len(reviews) if reviews else 0
    }), 200

@reviews_bp.route('/product/<int:product_id>', methods=['POST'])
@jwt_required()
def add_review(product_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get('rating') or not data.get('comment'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if data['rating'] < 1 or data['rating'] > 5:
        return jsonify({'error': 'Rating must be between 1 and 5'}), 400
    
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # Check if user has purchased this product
    purchased = OrderItem.query.join(Order).filter(
        OrderItem.product_id=product_id,
        Order.user_id=user_id
    ).first()
    
    if not purchased:
        return jsonify({'error': 'You must purchase this product to leave a review'}), 403
    
    # Check if user already reviewed this product
    existing_review = Review.query.filter_by(
        user_id=user_id,
        product_id=product_id
    ).first()
    
    if existing_review:
        return jsonify({'error': 'You have already reviewed this product'}), 400
    
    review = Review(
        user_id=user_id,
        product_id=product_id,
        rating=data['rating'],
        comment=data['comment']
    )
    
    db.session.add(review)
    db.session.commit()
    
    return jsonify({
        'message': 'Review added successfully',
        'review': review.to_dict()
    }), 201
