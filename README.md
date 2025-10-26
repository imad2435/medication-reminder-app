# MedTracker: Medication Reminder & Tracker

MedTracker is a full-stack web application designed to help users manage their medication schedules, set reminders, and track their adherence history. Built with the MERN stack (MongoDB, Express, React, Node.js) and Vite for a fast frontend experience, this application provides a secure and user-friendly interface for health management.

## ✨ Features

-   **Secure User Authentication**: Full registration and login system using JWT (JSON Web Tokens) for secure, stateless authentication.
-   **Medication Management (CRUD)**: Users can add, view, edit, and delete their medications. All data is user-specific and secure.
-   **Personalized Dashboard**: A home page that displays only the medications scheduled for the current day.
-   **Adherence Tracking**: Users can mark daily medications as "Taken," and all actions (create, update, delete, taken) are logged in a detailed history page.
-   **Reminder System**:
    -   **Frontend Notifications**: Simple in-browser notifications for upcoming medication times (requires the browser tab to be open).
    -   **Backend Notifications**: A robust backend scheduler (`node-cron`) checks for reminders every minute and sends email notifications via Nodemailer.
-   **Clean & Responsive UI**: A modern user interface built with React and styled with Tailwind CSS.

## 🛠️ Technology Stack

-   **Frontend**:
    -   React (with Vite)
    -   React Router for routing
    -   Axios for API requests
    -   Tailwind CSS for styling
-   **Backend**:
    -   Node.js
    -   Express.js
    -   MongoDB with Mongoose
    -   JSON Web Tokens (JWT) for authentication
    -   `bcryptjs` for password hashing
    -   `node-cron` for scheduling tasks
    -   `nodemailer` for sending email reminders

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm (Node Package Manager)
-   MongoDB (either a local instance or a free cluster on MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/medication-reminder-app.git
    cd medication-reminder-app
    ```

2.  **Setup the Backend:**
    -   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    -   Install the required dependencies:
        ```bash
        npm install
        ```
    -   Create a `.env` file in the `backend` directory by copying the example:
        ```bash
        cp .env.example .env
        ```
    -   Open the `.env` file and add your configuration variables:
        ```
        MONGO_URI=<your_mongodb_connection_string>
        PORT=5001
        JWT_SECRET=<your_super_secret_jwt_key>
        
        # For Email Notifications
        EMAIL_USER=<your_gmail_address>
        EMAIL_PASS=<your_16_character_gmail_app_password>
        ```

3.  **Setup the Frontend:**
    -   Navigate to the frontend directory from the root folder:
        ```bash
        cd frontend
        ```
    -   Install the required dependencies:
        ```bash
        npm install
        ```

### Running the Application

You will need to run the backend and frontend servers in two separate terminals.

-   **To run the Backend Server:**
    -   Navigate to the `backend` directory.
    -   Run the command:
        ```bash
        npm run dev
        ```
    -   The server will start on `http://localhost:5001`.

-   **To run the Frontend Development Server:**
    -   Navigate to the `frontend` directory.
    -   Run the command:
        ```bash
        npm run dev
        ```
    -   The application will be available at `http://localhost:5173`.

## ⚙️ API Endpoints

All data-related endpoints (except for login/register) are protected and require a JWT Bearer Token in the Authorization header.

-   `POST /api/auth/register` - Register a new user.
-   `POST /api/auth/login` - Log in a user and get a token.
-   `GET /api/medications` - Get all medications for the logged-in user.
-   `POST /api/medications` - Add a new medication.
-   `GET /api/medications/:id` - Get a single medication by ID.
-   `PUT /api/medications/:id` - Update a medication.
-   `DELETE /api/medications/:id` - Delete a medication.
-   `POST /api/medications/:id/log` - Log a medication's status (e.g., "Taken").
-   `GET /api/history` - Get the medication history for the user.
-   *(...and more for reminders and user profiles)*