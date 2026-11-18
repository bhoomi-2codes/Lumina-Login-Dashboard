# Lumina – Login & Dashboard Application

## 1. Project Overview

Lumina is a web-based login and dashboard application developed using React.js and Spring Boot.

The application provides user registration, login authentication, session management, and a personalised dashboard with a clean and minimal interface. It also includes light and dark theme options.

## Live Demo

Frontend: https://lumina-login-dashboard.vercel.app/

Backend: https://lumina-login-dashboard.onrender.com

The frontend is deployed on Vercel and the backend
is deployed on Render.

## 2. Features

- User registration with form validation
- User login and authentication
- Password hashing using BCrypt
- Duplicate email prevention
- Session-based authentication
- Protected dashboard API
- Dashboard with four information cards
- Sidebar navigation
- Light and dark mode
- Logout functionality
- Error handling and validation

## 3. Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Java 21
- Spring Boot 4.1.2
- Spring Web
- Spring Security
- Spring Validation
- Maven

### API Communication
- REST APIs
- HTTP methods (GET and POST)
- JSON
- Fetch API

## 4. REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/logout` | End the user session |
| GET | `/api/dashboard` | Retrieve dashboard information |

## 5. Dashboard Information

The dashboard displays four information cards:

1. Total Users
2. Active Sessions
3. Notifications
4. Account Status

It also displays the logged-in user's name and email address.

## 6. Project Structure

```text
Lumina-Login-Dashboard/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   └── login-dashboard/
│       ├── src/
│       ├── pom.xml
│       └── ...
│
├── screenshots/
│
└── README.md
```

## 7. How to Run the Project

### Step 1: Start the Backend

1. Open the backend project in Eclipse.
2. Run `LoginDashboardApplication.java` as a Spring Boot App.
3. The backend runs at:

`http://localhost:8080`

### Step 2: Start the Frontend

1. Open the `frontend` folder in VS Code.
2. Open the terminal.
3. Run the following commands:

```bash
npm install
npm run dev
```

4. Open the local URL displayed in the terminal.

The current development setup uses:

`http://localhost:5173`

### Step 3: Use the Application

- Create an account using the Sign Up page.
- Log in using your registered credentials.
- Explore the dashboard.
- Switch between light and dark themes.
- Log out when finished.

## 8. Current Implementation Notes

- User accounts are stored in an in-memory data structure.
- Passwords are hashed using BCrypt before storage.
- User accounts are cleared when the backend restarts.
- Dashboard statistics are demonstration values.
- Frontend is deployed on Vercel.
- Backend is deployed on Render.

## 9. Author

Developed as a Login and Dashboard Application project.
