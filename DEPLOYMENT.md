# Deployment Guide

## Backend Deployment (Heroku)

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps

1. **Create Procfile** in backend directory:
```
web: gunicorn app:app
```

2. **Update requirements.txt**:
```
Flask==2.3.2
Flask-SQLAlchemy==3.0.5
Flask-CORS==4.0.0
Flask-JWT-Extended==4.4.4
Flask-Bcrypt==1.0.1
Python-dotenv==1.0.0
Werkzeug==2.3.6
gunicorn==20.1.0
psycopg2-binary==2.9.6
```

3. **Deploy to Heroku**:
```bash
cd backend
heroku login
heroku create your-app-name
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')
heroku config:set JWT_SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

## Frontend Deployment (Vercel)

1. **Build React app**:
```bash
cd frontend
npm run build
```

2. **Deploy to Vercel**:
```bash
npm install -g vercel
vercel --prod
```

3. **Update .env.production**:
```
REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

## Frontend Deployment (Netlify)

1. **Connect to GitHub**
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Environment variables**:
   - `REACT_APP_API_URL`: Your backend URL

