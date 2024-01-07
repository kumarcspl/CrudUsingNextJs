Project Name
This project consists of a frontend and backend application for managing user data using Google Cloud Functions, Firestore, Next.js, Tailwind CSS, TypeScript, and Docker.

Frontend
Overview
The frontend of this application is built using Next.js, Tailwind CSS, and TypeScript. It interacts with a Google Cloud Functions API to perform CRUD operations for user data.

Features
Dashboard Page: Displays user data fetched from the Google Cloud Functions API.
CRUD Operations: Supports Create, Read, Update, and Delete operations for user data.
Styling with Tailwind CSS: Utilizes Tailwind CSS for styling to ensure responsiveness and a consistent design.
Type Safety: Implements TypeScript for improved code quality and type safety.
Docker Containerization: The frontend application is containerized using Docker for easier deployment.
Getting Started
To run the frontend application:

Clone this repository.
Navigate to the frontend directory.
Install dependencies using npm install.
Run the application using npm run dev.
Access the application on http://localhost:3000.
Usage
Use the dashboard page to view user data fetched from the Google Cloud Functions API.
Perform CRUD operations via the provided UI elements for managing user data.
Backend
Overview
The backend of this application is developed using Google Cloud Functions and Firestore as the database. It serves as the API layer for managing user data.

Features
Google Cloud Functions: Utilizes Google Cloud Functions for API development.
Firestore Database: Deploys user data on Firestore as the database.
Note: Use Firebase Emulator for local development.
Setup and Deployment
To deploy the backend:

Set up Google Cloud Functions for API development.
Use Firestore as the database for storing and managing user data.
Ensure to use the Firebase Emulator for local development and testing.
API Endpoints
GET /users: Retrieves a list of all users from the Firestore database.
POST /users: Adds a new user to the Firestore database.
PUT /users/:id: Updates an existing user's details based on the provided ID.
DELETE /users/:id: Deletes a user from the Firestore database based on the provided ID.