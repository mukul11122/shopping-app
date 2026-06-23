#!/bin/bash

# Shopping App - One-Click Installation Script
# This script sets up both backend and frontend automatically

echo "🛒 Shopping App - Installation Started"
echo "======================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Python is installed
echo -e "${BLUE}Checking Python...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}Python 3 is not installed. Please install Python 3.8+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python found${NC}"

# Check if Node.js is installed
echo -e "${BLUE}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Please install Node.js 14+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found${NC}"

# Setup Backend
echo ""
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠ Please edit backend/.env and update SECRET_KEY and JWT_SECRET_KEY${NC}"
fi

echo -e "${GREEN}✓ Backend setup complete${NC}"

# Setup Frontend
echo ""
echo -e "${BLUE}Setting up Frontend...${NC}"
cd ../frontend

# Install npm dependencies
echo "Installing npm dependencies (this may take a few minutes)..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
    echo -e "${GREEN}✓ Frontend .env created${NC}"
fi

echo -e "${GREEN}✓ Frontend setup complete${NC}"

echo ""
echo "======================================"
echo -e "${GREEN}✓ Installation Complete!${NC}"
echo "======================================"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Initialize Database (run once):"
echo "   cd backend"
echo "   python"
echo "   >>> from app import app, db"
echo "   >>> with app.app_context():"
echo "   >>>     db.create_all()"
echo "   >>> exit()"
echo ""
echo "2. Start Backend Server:"
echo "   cd backend"
echo "   source venv/bin/activate  # or venv\\Scripts\\activate on Windows"
echo "   python app.py"
echo "   (runs on http://localhost:5000)"
echo ""
echo "3. Start Frontend Server (in new terminal):"
echo "   cd frontend"
echo "   npm start"
echo "   (opens http://localhost:3000)"
echo ""
echo "4. Admin Access:"
echo "   Create admin user in Python shell (see SETUP_GUIDE.md)"
echo "   Then upload CSV products via Admin Panel"
echo ""
echo -e "${GREEN}Happy Shopping! 🛒${NC}"
