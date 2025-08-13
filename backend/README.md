# Express Backend API

A modern Express.js backend server with security middleware, logging, and RESTful API endpoints.

## Features

- 🚀 Express.js server with modern middleware
- 🔒 Security headers with Helmet
- 🌐 CORS enabled for cross-origin requests
- 📝 Request logging with Morgan
- 🔧 Environment variable configuration
- 📊 Health check endpoint
- 🛣️ RESTful API routes
- ⚡ Hot reloading with Nodemon (development)

## Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── config.env         # Environment variables
├── .gitignore         # Git ignore rules
├── README.md          # Project documentation
└── routes/
    └── api.js         # API routes
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Copy the example config file
   cp config.env .env
   # Edit .env with your configuration
   ```

4. Start the server:
   ```bash
   # Development mode (with hot reload)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Base URLs
- **Server**: `http://localhost:3000`
- **API Base**: `http://localhost:3000/api`

### Available Endpoints

#### Health Check
- `GET /health` - Server health status

#### API Status
- `GET /api/status` - API status and available endpoints

#### Users API
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Example Requests

#### Get all users
```bash
curl http://localhost:3000/api/users
```

#### Create a new user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

#### Get user by ID
```bash
curl http://localhost:3000/api/users/1
```

## Environment Variables

Create a `.env` file based on `config.env`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (for future use)
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=mydatabase
# DB_USER=myuser
# DB_PASSWORD=mypassword

# JWT Configuration (for future use)
# JWT_SECRET=your-super-secret-jwt-key
# JWT_EXPIRES_IN=24h

# API Configuration
API_VERSION=v1
CORS_ORIGIN=http://localhost:3000
```

## Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with hot reload
- `npm test` - Run tests (placeholder)

## Dependencies

### Production
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `helmet` - Security headers
- `morgan` - HTTP request logger
- `dotenv` - Environment variable loader

### Development
- `nodemon` - Auto-restart server on file changes

## Security Features

- **Helmet**: Adds various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: JSON body parsing with size limits
- **Error Handling**: Centralized error handling middleware

## Development

### Adding New Routes

1. Create new route files in the `routes/` directory
2. Import and use them in `server.js`:

```javascript
app.use('/api/new-route', require('./routes/new-route'));
```

### Adding Middleware

Add middleware in `server.js` before routes:

```javascript
app.use(yourMiddleware);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

If you encounter any issues or have questions, please open an issue on the repository.
