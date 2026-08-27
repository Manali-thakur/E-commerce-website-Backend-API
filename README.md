# E-Commerce Backend API

Node.js and Express backend for the E-Commerce Website project. It provides user registration and login, JWT-protected product APIs, product ratings, and cart operations.

## Features

- User registration and login
- JWT authentication for product and cart routes
- Product listing, lookup, filtering, creation, and rating
- Cart item creation, listing, and deletion
- CORS support for the local frontend
- Interactive Swagger API documentation
- Request logging and application error handling

## Requirements

- Node.js 18 or newer
- npm

## Installation

From this directory, install the dependencies:

```bash
npm install
```

## Start the Server

```bash
node server.js
```

The API starts on:

```text
http://localhost:3200
```

The existing npm script is also available:

```bash
npm test
```

Despite its name, the current `test` script starts the server and does not run automated tests.

## API Documentation

Open the Swagger UI in a browser after starting the server:

```text
http://localhost:3200/api-docs
```

The OpenAPI definition is stored in [`swagger.json`](swagger.json).

## Authentication

Register or log in through the user API. Login returns a JWT in the `Token` property.

The JWT must be sent directly in the `Authorization` header for protected routes:

```http
Authorization: <token>
```

The current middleware expects the token directly and does not remove a `Bearer ` prefix.

### Development users

| Type     | Email                | Password |
| -------- | -------------------- | -------- |
| Seller   | `seller@gmail.com`   | `1234`   |
| Customer | `customer@gmail.com` | `1234`   |

These credentials are stored as development seed data and must not be used in production.

## API Routes

### User routes

These routes do not require authentication.

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| `POST` | `/api/user/register` | Register a new user      |
| `POST` | `/api/user/login`    | Log in and receive a JWT |

Register request:

```json
{
  "name": "New Customer",
  "email": "customer@example.com",
  "password": "password123",
  "type": "customer"
}
```

Login request:

```json
{
  "email": "customer@gmail.com",
  "password": "1234"
}
```

### Product routes

All product routes require a valid JWT.

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| `GET`  | `/api/product`        | Get all products |
| `GET`  | `/api/product/:id`    | Get one product  |
| `GET`  | `/api/product/filter` | Filter products  |
| `POST` | `/api/product`        | Add a product    |
| `POST` | `/api/product/rate`   | Rate a product   |

Filter query example:

```text
GET /api/product/filter?minPrice=10&maxPrice=30&category=beauty
```

Rating query example:

```text
POST /api/product/rate?userId=2&productId=1&rating=4
```

Product request body:

```json
{
  "title": "Sample Product",
  "description": "A product description",
  "category": "beauty",
  "price": 24.99,
  "rating": 4,
  "stock": 20,
  "image": "https://example.com/product.jpg",
  "returnPolicy": "7 days return policy",
  "shippingInformation": "Ships in 3-5 business days",
  "availabilityStatus": "In Stock"
}
```

### Cart routes

All cart routes require a valid JWT. The authenticated user is read from the JWT payload.

| Method   | Endpoint        | Description                       |
| -------- | --------------- | --------------------------------- |
| `POST`   | `/api/cart`     | Add an item to the cart           |
| `GET`    | `/api/cart`     | Get the authenticated user's cart |
| `DELETE` | `/api/cart/:id` | Remove a cart item                |

Add-to-cart query example:

```text
POST /api/cart?productId=1&quantity=2
```

## Project Structure

```text
backend API/
├── server.js                 # Starts the server on port 3200
├── index.js                  # Express app, middleware, and route registration
├── package.json
├── swagger.json              # OpenAPI definition
├── src/
│   ├── error-handler/
│   ├── features/
│   │   ├── cart/
│   │   ├── order/
│   │   ├── product/
│   │   └── user/
│   └── middleware/
└── uploads/
```

The `order` feature directory is present, but no order routes are currently registered in `index.js`.

## Data Storage and Limitations

- Products, users, and cart items are stored in JavaScript arrays in memory.
- Data changes are lost when the server restarts.
- The JWT secret is currently hardcoded in the source code. It should be moved to an environment variable before deployment.
- There is no automated test suite configured yet.
- CORS currently allows `http://127.0.0.1:5500`, the usual VS Code Live Server origin. Update the CORS configuration in `index.js` if the frontend uses another origin.

## License

This project is licensed under the ISC license.
