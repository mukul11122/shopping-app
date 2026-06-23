@echo off
REM Shopping App - One-Click Installation Script for Windows
REM This script sets up both backend and frontend automatically

echo 🛒 Shopping App - Installation Started
echo ======================================

REM Check if Python is installed
echo Checking Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python 3 is not installed. Please install Python 3.8+
    pause
    exit /b 1
)
echo ✓ Python found

REM Check if Node.js is installed
echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js 14+
    pause
    exit /b 1
)
echo ✓ Node.js found

REM Setup Backend
echo.
echo Setting up Backend...
cd backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo ⚠ Please edit backend\.env and update SECRET_KEY and JWT_SECRET_KEY
)

echo ✓ Backend setup complete

REM Setup Frontend
echo.
echo Setting up Frontend...
cd ..\frontend

echo Installing npm dependencies (this may take a few minutes)...
call npm install

if not exist .env (
    echo Creating .env file...
    echo REACT_APP_API_URL=http://localhost:5000/api > .env
    echo ✓ Frontend .env created
)

echo ✓ Frontend setup complete

echo.
echo ======================================
echo ✓ Installation Complete!
echo ======================================
echo.
echo Next Steps:
echo.
echo 1. Initialize Database (run once):
echo    cd backend
echo    python
echo    >>> from app import app, db
echo    >>> with app.app_context():
echo    >>>     db.create_all()
echo    >>> exit()
echo.
echo 2. Start Backend Server:
echo    cd backend
echo    venv\Scripts\activate
echo    python app.py
echo    (runs on http://localhost:5000)
echo.
echo 3. Start Frontend Server (in new terminal):
echo    cd frontend
echo    npm start
echo    (opens http://localhost:3000)
echo.
echo 4. Admin Access:
echo    Create admin user in Python shell (see SETUP_GUIDE.md)
echo    Then upload CSV products via Admin Panel
echo.
echo Happy Shopping! 🛒
echo.
pause
