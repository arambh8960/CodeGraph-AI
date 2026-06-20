# Reporyx AI - Frontend

AI-Powered Developer Onboarding Assistant for GitHub Repositories

## Tech Stack

- **React.js** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `VITE_API_URL` - Backend API URL (default: http://localhost:8000)

## Running the Frontend

1. Start the development server:
```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

2. Build for production:
```bash
npm run build
```

3. Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Loader.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AuthLayout.jsx
│   │   └── DashboardCard.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Dashboard.jsx
│   ├── services/       # API services
│   │   ├── api.js
│   │   └── authService.js
│   ├── context/        # React Context
│   │   └── AuthContext.jsx
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Features

### Authentication
- User signup with validation
- User login with JWT tokens
- Protected routes
- Auto-login after page refresh
- Token management with localStorage

### Pages
- **Home**: Landing page with hero section and features
- **Login**: User authentication
- **Signup**: User registration
- **Dashboard**: Protected dashboard with status cards

### UI Components
- Modern glassmorphism design
- Gradient backgrounds
- Responsive layout
- Loading states
- Error handling
- Smooth animations

## Authentication Flow

1. **Signup**: User fills registration form
   - Form validation (name, email format, password length)
   - Password confirmation
   - API call to backend
   - Success message and redirect to login

2. **Login**: User enters credentials
   - Email and password validation
   - API call to backend
   - JWT token stored in localStorage
   - Redirect to dashboard

3. **Protected Routes**: 
   - JWT token attached to all API requests
   - Token validation on protected routes
   - Auto-redirect to login if not authenticated
   - Auto-logout on 401 errors

## API Integration

The frontend uses Axios for API communication with the following features:
- Base URL configuration
- Request interceptor for JWT token attachment
- Response interceptor for 401 error handling
- Automatic token management

## Environment Variables

- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

## Development

The frontend uses Vite for fast development with:
- Hot module replacement
- Optimized builds
- ES modules support

## Styling

Tailwind CSS is used for styling with custom configurations:
- Custom color palette
- Glassmorphism utilities
- Gradient utilities
- Custom animations

## Browser Support

Modern browsers that support:
- ES6+ JavaScript
- CSS Grid
- CSS Flexbox
- CSS Custom Properties
