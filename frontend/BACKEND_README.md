# SEA Backend Server

This is the backend server for the SEA tracking application.

## Setup Instructions

### 1. Install Dependencies

```bash
# Copy the backend package.json
cp package-backend.json package.json

# Install dependencies
npm install
```

### 2. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (requires authentication)
- `GET /api/auth/profile` - Get user profile (requires authentication)
- `PUT /api/auth/profile` - Update user profile (requires authentication)
- `POST /api/auth/verify` - Verify JWT token (requires authentication)

### Health Check

- `GET /api/health` - Server health check

## Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ CORS enabled for frontend integration
- ✅ Token-based logout (blacklisting)
- ✅ User profile management
- ✅ In-memory storage (replace with database for production)

## Security Notes

- Change the `JWT_SECRET` in production
- Replace in-memory storage with a proper database
- Add rate limiting for production use
- Use HTTPS in production

## Frontend Integration

The frontend is already configured to connect to this backend at `http://localhost:3000/api`. The logout functionality will now work properly with the backend server.
