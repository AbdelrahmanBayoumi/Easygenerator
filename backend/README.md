# Backend API Service

A NestJS-based backend service providing authentication and user management functionality.

## Prerequisites

-   Node.js (v16 or higher)
-   MongoDB
-   npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/AbdelrahmanBayoumi/backend.git

# Navigate to project directory
cd backend

# Install dependencies
npm install
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```properties
# App Config
NODE_ENV = dev
VERSION = 0.0.1

# Database Config
MONGO_URL = your_mongodb_connection_string

# JWT Config
JWT_SECRET = your_jwt_secret_key
JWT_EXPIRES = 15m
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The application will be available at:

-   API: `http://localhost:4000`
-   Swagger Documentation: `http://localhost:4000/docs`

## API Endpoints

### Authentication

-   `POST /auth/register` - Register new user
-   `POST /auth/login` - User login
-   `POST /auth/verify` - Verify JWT token

### API Documentation

The API documentation is available through Swagger UI at `/docs` endpoint when the application is running.

## Security Features

-   Password hashing
-   JWT authentication
-   Rate limiting (3 requests per second)
-   Helmet security headers
-   CORS enabled
-   Request validation
-   Global error handling

## Development

```bash
# Run tests
npm run test

# Run linter
npm run lint

# Format code
npm run format
```

## Environment Variables

| Variable    | Description               | Default |
| ----------- | ------------------------- | ------- |
| NODE_ENV    | Environment mode          | dev     |
| PORT        | Application port          | 4000    |
| MONGO_URL   | MongoDB connection string | -       |
| JWT_SECRET  | JWT secret key            | -       |
| JWT_EXPIRES | JWT token expiration      | 15m     |

## License

[MIT](LICENSE)
