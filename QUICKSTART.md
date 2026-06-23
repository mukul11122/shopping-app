# 🚀 Quick Start Installation

## ⚡ Super Easy Setup (Automatic)

### For Mac/Linux:
```bash
bash install.sh
```

### For Windows:
```bash
install.bat
```

This will automatically:
- ✅ Check Python & Node.js
- ✅ Create virtual environments
- ✅ Install all dependencies
- ✅ Create .env files
- ✅ Get everything ready!

---

## 📋 What the Script Does

1. **Checks System Requirements**
   - Python 3.8+
   - Node.js 14+

2. **Sets Up Backend**
   - Creates Python virtual environment
   - Installs Flask & dependencies
   - Creates .env configuration

3. **Sets Up Frontend**
   - Installs React & dependencies (may take 2-3 minutes)
   - Creates .env configuration

---

## 🎯 After Installation

### Step 1: Initialize Database (Run Once)

```bash
cd backend
python
```

Then in Python shell:
```python
from app import app, db
with app.app_context():
    db.create_all()
exit()
```

### Step 2: Start Backend Server

**Mac/Linux:**
```bash
cd backend
source venv/bin/activate
python app.py
```

**Windows:**
```bash
cd backend
venv\Scripts\activate
python app.py
```

✅ Backend runs on: `http://localhost:5000`

### Step 3: Start Frontend Server (New Terminal)

```bash
cd frontend
npm start
```

✅ Frontend opens at: `http://localhost:3000`

---

## 👥 Create Admin User

**To access Admin Panel and upload products:**

```bash
cd backend
python
```

Paste this code:
```python
from app import app, db
from models import User

with app.app_context():
    admin = User(username='admin', email='admin@example.com', is_admin=True)
    admin.set_password('admin123')
    db.session.add(admin)
    db.session.commit()
    print('✓ Admin user created!')
```

**Login Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 📤 Upload Products via CSV

1. **Go to Admin Panel:** `http://localhost:3000/admin`
2. **Scroll to "Upload Inventory via CSV"**
3. **Select CSV file** (see `sample_products.csv` as template)
4. **Click "Upload CSV"** ✅

**CSV Format:**
```
name,description,price,stock,image_url
Laptop,High performance laptop,999.99,50,https://example.com/laptop.jpg
Mouse,Wireless mouse,29.99,100,https://example.com/mouse.jpg
```

---

## 🛠️ Manual Installation (If Script Doesn't Work)

### Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Copy .env file
cp .env.example .env

# Run server
python app.py
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

---

## ⚠️ Troubleshooting

### "Python not found"
- Install Python from https://python.org
- Make sure to check "Add Python to PATH" during installation

### "Node not found"
- Install Node.js from https://nodejs.org
- Download the LTS version

### "Port 5000 already in use"
- Change port in `backend/app.py`:
  ```python
  app.run(debug=True, port=5001)  # Change 5000 to 5001
  ```

### "Port 3000 already in use"
- Run with different port:
  ```bash
  PORT=3001 npm start
  ```

### Database errors
- Delete `shopping_app.db` from backend folder
- Run the database initialization again

---

## ✅ Success Checklist

- [ ] Ran installation script (or manual commands)
- [ ] Initialized database
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] Created admin user
- [ ] Logged in as admin
- [ ] Uploaded CSV products
- [ ] Can browse products
- [ ] Can add items to cart
- [ ] Can checkout

---

## 🎯 Common Features to Try

1. **Register as new user**
   - Go to Register page
   - Create account

2. **Browse products**
   - Home page shows all products
   - Click product for details
   - Click reviews to see customer feedback

3. **Shop**
   - Add items to cart
   - View cart
   - Checkout

4. **Admin Features**
   - Go to Admin Panel (top navbar if admin)
   - Upload CSV for bulk products
   - Add individual products via form
   - Delete products

---

## 📞 Need Help?

Check `SETUP_GUIDE.md` for detailed instructions or create an issue on GitHub!

**You're all set! Happy shopping! 🛒**
