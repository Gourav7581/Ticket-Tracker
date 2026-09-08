# Ticket Tracker

A full-stack ticket management application where users can securely create an account, sign in, and manage their own support tickets. The project demonstrates authentication, protected REST APIs, database relationships, responsive UI design, and complete CRUD operations using the MERN stack.

## Highlights

- Secure registration and login using JSON Web Tokens (JWT)
- Password hashing with bcrypt before database storage
- Protected ticket APIs using authentication middleware
- User-specific data access and ownership validation
- Create, view, update, and delete ticket workflows
- Ticket status and priority management
- Responsive interface for desktop, tablet, and mobile screens
- Loading, empty, confirmation, and success states

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, React Router, Axios, Bootstrap, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Development | Create React App, Nodemon, dotenv |

## Application Flow

1. A user registers or logs in through the React frontend.
2. The backend validates the credentials and returns a signed JWT.
3. The frontend stores the token and sends it as a bearer token with ticket requests.
4. Authentication middleware verifies the token and identifies the current user.
5. Ticket queries are scoped to that user, and ownership is checked before updates or deletion.

## Core Features

### Authentication

- New-user registration
- Existing-user login
- Hashed password storage
- JWT-based sessions with protected API routes
- Logout by removing the locally stored token

### Ticket Management

- Create a ticket with a title, description, status, and priority
- View tickets in newest-first order
- Edit ticket information from the dashboard
- Delete a ticket after confirmation
- Restrict every ticket to its owner

### Ticket Options

| Field | Available values |
| --- | --- |
| Status | Open, In Progress, Closed |
| Priority | Low, Medium, High |

## Project Structure

```text
ticket-tracker/
|-- ticket-tracker-backend/
|   |-- config/          # MongoDB connection
|   |-- controllers/     # Authentication and ticket business logic
|   |-- middleware/      # JWT authentication middleware
|   |-- models/          # Mongoose User and Ticket schemas
|   |-- routes/          # Express API routes
|   `-- server.js        # Backend entry point
|-- ticket-tracker-ui/
|   |-- public/          # Static assets
|   `-- src/
|       |-- Pages/       # Login, signup, list, and create screens
|       |-- Service/     # API base URL configuration
|       |-- App.js       # Client-side routing
|       `-- App.css      # Shared responsive styling
|-- LICENSE
`-- README.md
```

## REST API

### Authentication

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create an account and return a JWT |
| `POST` | `/api/auth/login` | Public | Authenticate a user and return a JWT |

### Tickets

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/tickets` | Protected | Get the current user's tickets |
| `POST` | `/api/tickets` | Protected | Create a ticket |
| `PUT` | `/api/tickets/:id` | Protected | Update an owned ticket |
| `DELETE` | `/api/tickets/:id` | Protected | Delete an owned ticket |

Protected endpoints expect the following header:

```http
Authorization: Bearer <token>
```

## Local Setup

### Prerequisites

- Node.js and npm
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone https://github.com/Gourav7581/ticket-tracker.git
cd ticket-tracker
```

### 2. Configure and run the backend

```bash
cd ticket-tracker-backend
npm install
```

Create a `.env` file inside `ticket-tracker-backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
```

Start the API server:

```bash
npx nodemon server.js
```

The backend runs at `http://localhost:5000` by default.

### 3. Configure and run the frontend

Open another terminal:

```bash
cd ticket-tracker-ui
npm install
npm start
```

The application opens at `http://localhost:3000`.

> The frontend API base URL is currently configured in `ticket-tracker-ui/src/Service/BaseUrl.jsx`.

## Data Models

### User

```text
name, email, password, createdAt, updatedAt
```

### Ticket

```text
user, title, description, status, priority, createdAt, updatedAt
```

The `user` field references the ticket owner, enabling account-level data isolation.

## Security Notes

- Passwords are hashed with bcrypt and are never returned by the API.
- Ticket endpoints require a valid signed JWT.
- Update and delete operations verify ticket ownership.
- Secrets and database credentials are loaded from environment variables.
- `.env` files are excluded from version control.

## Future Improvements

- Add client-side protected routes and automatic handling for expired sessions
- Add backend request validation and centralized error handling
- Add search, filtering, sorting, and pagination
- Add automated frontend and API tests
- Move the frontend API URL to an environment variable
- Add deployment configuration and a hosted demo

## License

This project is available under the [MIT License](LICENSE).
