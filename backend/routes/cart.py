from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import Cart, CartItem, Product

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('', methods=['GET'])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    cart = Cart.query.filter_by(user_id=user_id).first()
    
    if not cart:
        return jsonify({'error': 'Cart not found'}), 404
    
    return jsonify(cart.to_dict()), 200

@cart_bp.route('/items', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get('product_id') or not data.get('quantity'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return jsonify({'error': 'Cart not found'}), 404
    
    product = Product.query.get(data['product_id'])
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    if product.stock < data['quantity']:
        return jsonify({'error': 'Insufficient stock'}), 400
    
    # Check if item already in cart
    cart_item = CartItem.query.filter_by(
        cart_id=cart.id,
        product_id=data['product_id']
    ).first()
    
    if cart_item:
        cart_item.quantity += data['quantity']
    else:
        cart_item = CartItem(
            cart_id=cart.id,
            product_id=data['product_id'],
            quantity=data['quantity']
        )
        db.session.add(cart_item)
    
    db.session.commit()
    
    return jsonify({
        'message': 'Item added to cart',
        'cart': cart.to_dict()
    }), 200

@cart_bp.route('/items/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return jsonify({'error': 'Cart not found'}), 404
    
    cart_item = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first()
    if not cart_item:
        return jsonify({'error': 'Cart item not found'}), 404
    
    if data.get('quantity', 0) <= 0:
        return jsonify({'error': 'Quantity must be greater than 0'}), 400
    
    if cart_item.product.stock < data['quantity']:
        return jsonify({'error': 'Insufficient stock'}), 400
    
    cart_item.quantity = data['quantity']
    db.session.commit()
    
    return jsonify({
        'message': 'Cart item updated',
        'cart': cart.to_dict()
    }), 200

@cart_bp.route('/items/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(item_id):
    user_id = get_jwt_identity()
    
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        return jsonify({'error': 'Cart not found'}), 404
    
    cart_item = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first()
    if not cart_item:
        return jsonify({'error': 'Cart item not found'}), 404
    
    db.session.delete(cart_item)
    db.session.commit()
    
    return jsonify({
        'message': 'Item removed from cart',
        'cart': cart.to_dict()
    }), 200
