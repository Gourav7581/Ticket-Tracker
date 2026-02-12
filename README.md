#  Ticket Tracker Application

A full-stack Ticket Tracker application built using React for the frontend and Node.js + Express for the backend.  

 Project Structure
 
ticket-tracker/
│
├── ticket-tracker-backend/ # Backend (Node.js, Express)
├── ticket-tracker-ui/ # Frontend (React)
├── .gitignore
├── LICENSE
└── README.md

##  Backend – Setup & Run Instructions

### Navigate to backend directory
```bash
cd ticket-tracker-backend

# Install dependencies
npm install

# Start backend server
npx nodemon server.js

# Backend will run on
http://localhost:5000

Backend Packages Used:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- nodemon (dev dependency)


# Navigate to frontend directory
cd ticket-tracker-ui

# Start frontend application
npm start

# Frontend will be available at
http://localhost:3000

Frontend Packages Used:
- react
- react-dom
- react-router-dom
- axios
- bootstrap
- react-scripts
- @testing-library/*

