# Reporyx AI

AI-Powered Developer Onboarding Assistant for GitHub Repositories

## Overview

Reporyx AI is an intelligent developer onboarding assistant that helps you understand any GitHub repository quickly and efficiently. Whether you're joining a new team, exploring open-source projects, or analyzing codebases, Reporyx AI provides AI-powered insights to accelerate your understanding.

## Tech Stack

### Frontend
- **React.js** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Motor** - Async MongoDB driver
- **Python-JOSE** - JWT token handling
- **Passlib** - Password hashing
- **Pydantic** - Data validation

### Database
- **MongoDB** - NoSQL database for user data

## Project Structure

```
CodeGraph-AI/
├── backend/              # FastAPI backend
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic
│   ├── database/        # Database configuration
│   ├── schemas/         # Pydantic schemas
│   ├── models/          # Database models
│   ├── utils/           # Utility functions
│   ├── main.py          # FastAPI application
│   ├── requirements.txt # Python dependencies
│   └── .env.example     # Environment variables template
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── context/     # React Context
│   │   ├── App.jsx      # Main App component
│   │   └── main.jsx     # Entry point
│   ├── package.json     # Node dependencies
│   └── .env.example     # Environment variables template
│
└── README.md            # This file
```

## Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CodeGraph-AI
```

### 2. MongoDB Setup

Install and start MongoDB:

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

**Windows:**
Download and install from [MongoDB官网](https://www.mongodb.com/try/download/community)

Verify MongoDB is running:
```bash
mongosh
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
MONGODB_URL=mongodb://localhost:27017
JWT_SECRET_KEY=your-secret-key-change-this-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=30
```

### 4. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
VITE_API_URL=http://localhost:8000
```

## Running the Application

### Start the Backend

In the `backend` directory:

```bash
source venv/bin/activate  # Activate virtual environment
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at: `http://localhost:8000`

API Documentation:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Start the Frontend

In a new terminal, navigate to the `frontend` directory:

```bash
npm run dev
```

The frontend application will be available at: `http://localhost:3000`

## Authentication Flow

### Signup
1. Navigate to the signup page
2. Fill in name, email, and password
3. Password must be at least 8 characters
4. Upon success, redirect to login page

### Login
1. Navigate to the login page
2. Enter email and password
3. JWT token is generated and stored in localStorage
4. Redirect to dashboard

### Protected Routes
- JWT token is automatically attached to all API requests
- Protected routes require authentication
- Auto-redirect to login if not authenticated
- Auto-logout on 401 errors

## Features (Day 1)

### Implemented
- ✅ User authentication (signup/login)
- ✅ JWT token management
- ✅ Protected routes
- ✅ MongoDB integration
- ✅ Modern glassmorphism UI
- ✅ Responsive design
- ✅ Health check endpoint
- ✅ Auto-login after refresh

### Coming Soon (Future Days)
- 🔲 GitHub Repository Ingestion
- 🔲 ChromaDB Integration
- 🔲 LangChain Integration
- 🔲 Embeddings & RAG
- 🔲 Groq Integration
- 🔲 Repository Summary
- 🔲 Tech Stack Detection
- 🔲 Repository Chat

## API Endpoints

### Health
- `GET /api/health` - Health check endpoint

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

## Environment Variables

### Backend
- `MONGODB_URL` - MongoDB connection string
- `JWT_SECRET_KEY` - Secret key for JWT (use strong random string in production)
- `JWT_ALGORITHM` - JWT algorithm (default: HS256)
- `JWT_EXPIRE_MINUTES` - JWT token expiration time in minutes

### Frontend
- `VITE_API_URL` - Backend API URL (default: http://localhost:8000)

## Development

### Backend Development

The backend uses async/await patterns with Motor for MongoDB operations. All database operations are non-blocking.

### Frontend Development

The frontend uses Vite for fast development with hot module replacement. Tailwind CSS is used for styling with custom glassmorphism utilities.

## Security Notes

- Never commit `.env` files to version control
- Use strong JWT secret keys in production
- Implement rate limiting for production
- Use HTTPS in production
- Validate all input data
- Passwords are hashed using bcrypt

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongosh`
- Check MongoDB URL in `.env`
- Verify MongoDB is accessible on the specified port

### Backend Issues
- Ensure virtual environment is activated
- Check all dependencies are installed
- Verify environment variables are set correctly
- Check MongoDB connection

### Frontend Issues
- Ensure all dependencies are installed: `npm install`
- Verify `VITE_API_URL` is set correctly
- Check that backend is running on the specified port
- Clear browser cache and localStorage if needed

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on the repository.
