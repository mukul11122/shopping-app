# Shopping App - Complete Setup Guide

A full-stack e-commerce application with React frontend and Python Flask backend.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

## Backend Setup (Python Flask)

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Create .env file
```bash
cp .env.example .env
# Edit .env and update SECRET_KEY and JWT_SECRET_KEY
```

### 5. Initialize database
```bash
python
>>> from app import app, db
>>> with app.app_context():
>>>     db.create_all()
>>> exit()
```

### 6. Run backend server
```bash
python app.py
```

Backend will run on `http://localhost:5000`

## Frontend Setup (React)

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 4. Start development server
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## ✨ Features

### User Features
- ✅ User Registration & Login
- ✅ Product Browsing with Search
- ✅ Product Details Page
- ✅ Shopping Cart Management
- ✅ Checkout & Order Placement
- ✅ Order History
- ✅ Product Reviews & Ratings

### Admin Features
- ✅ Admin Panel (Protected)
- ✅ Add Products via Form
- ✅ Upload Products via CSV
- ✅ Delete Products
- ✅ View All Products

## 📋 CSV Upload Format

Create a CSV file with the following columns:
```
name,description,price,stock,image_url
Laptop,High performance laptop,999.99,50,https://example.com/laptop.jpg
Mouse,Wireless mouse,29.99,100,https://example.com/mouse.jpg
```

### Upload Steps:
1. Go to Admin Panel (http://localhost:3000/admin)
2. Click "Upload Inventory via CSV"
3. Select your CSV file
4. Click "Upload CSV"
5. Products will be added automatically

## 🔐 Authentication

### Create Admin User

```bash
python
>>> from app import app, db
>>> from models import User
>>> with app.app_context():
>>>     admin = User(username='admin', email='admin@example.com', is_admin=True)
>>>     admin.set_password('admin123')
>>>     db.session.add(admin)
>>>     db.session.commit()
>>>     print('Admin user created')
>>> exit()
```

Admin Login:
- Email: admin@example.com
- Password: admin123

## 📁 Project Structure

```
shopping-app/
├── backend/
│   ├── app.py              # Flask app initialization
│   ├── models.py           # Database models
│   ├── requirements.txt    # Python dependencies
│   ├── routes/             # API endpoints
│   │   ├── auth.py
│   │   ├── products.py
│   │   ├── cart.py
│   │   ├── orders.py
│   │   └── reviews.py
│   └── .env.example        # Environment variables template
│
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML entry point
│   ├── src/
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # React entry point
│   │   ├── api.js          # API client
│   │   ├── context/        # React context providers
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/          # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Orders.js
│   │   │   └── AdminPanel.js
│   │   ├── components/     # Reusable components
│   │   │   ├── ProductCard.js
│   │   │   ├── SearchBar.js
│   │   │   ├── ReviewList.js
│   │   │   └── ReviewForm.js
│   │   ├── styles/         # CSS files
│   │   └── index.css       # Global styles
│   ├── package.json        # Node dependencies
│   └── .env                # Environment variables
│
└── README.md               # This file
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Products
- `GET /api/products` - Get all products
- `GET /api/products?search=keyword&page=1&per_page=10` - Search products
- `GET /api/products/<id>` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/<id>` - Update product (admin only)
- `DELETE /api/products/<id>` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/<item_id>` - Update cart item
- `DELETE /api/cart/items/<item_id>` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order from cart
- `GET /api/orders/<id>` - Get order details

### Reviews
- `GET /api/reviews/product/<product_id>` - Get product reviews
- `POST /api/reviews/product/<product_id>` - Add review (requires purchase)

## 🛠️ Troubleshooting

### CORS Issues
If you get CORS errors, make sure the backend is running on `http://localhost:5000`

### Database Errors
Delete `shopping_app.db` and reinitialize the database

### Port Already in Use
- Backend: Change port in `app.py` (default 5000)
- Frontend: Change port with `PORT=3001 npm start`

## 📝 Example CSV for Products

```csv
name,description,price,stock,image_url
iPhone 13,Latest Apple smartphone,999,50,https://example.com/iphone13.jpg
Samsung Galaxy S21,Premium Android phone,899,45,https://example.com/galaxy.jpg
AirPods Pro,Wireless earbuds,249,100,https://example.com/airpods.jpg
Apple Watch,Smart watch,399,30,https://example.com/watch.jpg
```

## 🚀 Deployment

### Backend (Heroku)
```bash
heroku create your-app-name
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=your-secret-key
git push heroku main
```

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the build folder
```

## 📄 License

MIT License - Feel free to use this project

## 🤝 Support

For issues or questions, please create an issue in the repository.
