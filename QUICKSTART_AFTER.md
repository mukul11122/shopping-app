# Installation Complete! 🎉

## What Just Happened?

Your shopping app is now fully installed and ready to run!

## ⚡ Start Your App in 2 Steps

### Step 1: Start Backend (Terminal 1)
```bash
cd backend

# Mac/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate

python app.py
```

**Wait for:** `Running on http://localhost:5000`

### Step 2: Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```

**Wait for:** Browser opens to `http://localhost:3000`

---

## 🗄️ First Time Only: Initialize Database

```bash
cd backend
python
```

Then copy-paste this:
```python
from app import app, db
with app.app_context():
    db.create_all()
exit()
```

---

## 👤 Create Admin Account

```bash
cd backend
python
```

Copy-paste this:
```python
from app import app, db
from models import User

with app.app_context():
    admin = User(username='admin', email='admin@example.com', is_admin=True)
    admin.set_password('admin123')
    db.session.add(admin)
    db.session.commit()
    print('Admin created!')
exit()
```

**Login with:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 📤 Upload Products

1. Go to: `http://localhost:3000/admin`
2. Login as admin
3. Upload `sample_products.csv` (in root folder)
4. Products appear instantly! ✨

---

## 🎯 Quick Test Checklist

✅ Backend running? http://localhost:5000/api/health → Shows `{"status": "ok"}`
✅ Frontend running? http://localhost:3000 → Shows ShopHub homepage  
✅ Can register? Create test account  
✅ Can browse products? Should see items  
✅ Can add to cart? Add product, check navbar  
✅ Admin panel? Login as admin, upload CSV  

---

## 📚 Documentation

- **QUICKSTART.md** - This file (quick setup)
- **SETUP_GUIDE.md** - Detailed setup instructions
- **APP_PREVIEW.md** - UI mockups and preview
- **DEPLOYMENT.md** - How to deploy online

---

## 🚀 You're Ready!

**Your shopping app is now running locally!**

Start both servers and visit http://localhost:3000

Happy coding! 🎊
