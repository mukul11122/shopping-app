# Shopping App Backend

Python Flask backend for the shopping app with JWT authentication and SQLAlchemy ORM.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```
FLASK_ENV=development
FLASK_APP=app.py
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=sqlite:///shopping_app.db
```

4. Initialize the database:
```bash
python
>>> from app import app, db
>>> with app.app_context():
>>>     db.create_all()
>>> exit()
```

5. Run the server:
```bash
python app.py
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/<id>` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/<id>` - Update product (admin)
- `DELETE /api/products/<id>` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/<item_id>` - Update cart item
- `DELETE /api/cart/items/<item_id>` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/<id>` - Get order details

### Reviews
- `GET /api/products/<id>/reviews` - Get product reviews
- `POST /api/products/<id>/reviews` - Add review
