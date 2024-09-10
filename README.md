# Password Manager

A full-stack Password Manager built using **React**, **MongoDB**, and **Express** that provides a secure way to store and manage passwords. With a clean, responsive UI, users can effortlessly add, view, edit, and delete passwords. The application is designed with best practices in password management and provides a user-friendly experience with real-time notifications.

## Features

### 1. **Add New Passwords**
   - Store credentials including website URL, username, and password.
   - Each password entry is assigned a unique ID for easy management.
   
### 2. **Edit Passwords**
   - Modify existing passwords or update username and website information.
   - Instant form population when editing, ensuring seamless updates.

### 3. **Delete Passwords**
   - Permanently remove passwords from the database with a single click.
   - A confirmation prompt ensures safe deletion.

### 4. **View and Copy Passwords**
   - Easily toggle the visibility of passwords in the form.
   - Quickly copy website URLs, usernames, or passwords to the clipboard using a copy icon.

### 5. **Toast Notifications**
   - Real-time toast notifications provide feedback for every action: password saved, edited, deleted, or copied.
   - Different notification types (success, error, warning) keep the user informed.

### 6. **Responsive Design**
   - Optimized for both mobile and desktop devices using **Tailwind CSS**.
   - Clean, modern UI with an intuitive layout for managing passwords.

### 7. **Persistent Storage**
   - Passwords are stored in a **MongoDB** database, ensuring they remain available even after closing the app.
   - Automatically fetch and display stored passwords on page load.

### 8. **Password Security**
   - Passwords are handled securely on the server-side using **Express**.
   - Users can toggle password visibility, ensuring sensitive information is protected.

## Tech Stack

### **Frontend**
   - **React**: Handles the UI, components, and interactions with the backend.
   - **Tailwind CSS**: Provides a modern and responsive design.
   - **React-Toastify**: Delivers real-time toast notifications for user actions.
   - **UUID**: Generates unique identifiers for each password entry.

### **Backend**
   - **Express**: Handles the server-side logic, API routing, and interaction with the database.
   - **MongoDB**: Stores and manages user passwords securely.
   - **Node.js**: Provides the environment for running the backend server.

### **Middleware**
   - **Body-parser**: Parses incoming request bodies to JSON format.
   - **CORS**: Enables secure cross-origin requests between the frontend and backend.

## Installation and Setup

### 1. Clone the Repository

   ```bash
   git clone https://github.com/Ujjwal132/password-manager.git
   ```

### 2. Navigate to the Project Directory

   ```bash
   cd password-manager
   ```

### 3. Install Dependencies

   Install all required dependencies for both the backend and frontend:

   ```bash
   npm install
   ```

### 4. Set up the `.env` File

   Create a `.env` file in the root directory and add your MongoDB connection details:

   ```env
   MONGO_URI=<your_mongo_db_connection_string>
   DB_NAME=<your_database_name>
   ```

### 5. Start the Backend Server

   Start the Express server to handle API requests and connect to MongoDB:

   ```bash
   node server.js
   ```

### 6. Run the Frontend

   Start the React development server:

   ```bash
   npm start
   ```

### 7. Access the Application

   Open your browser and navigate to:

   ```bash
   http://localhost:3000
   ```

## Project Structure

```bash
password-manager/
├── backend/
│   ├── server.js         # Express server setup and API routes
│   ├── .env              # Environment variables for database connection
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Manager.js  # Main Password Manager component
│   │   └── App.js          # Main entry point for the frontend
│   ├── public/
│   │   ├── icons/          # Eye and GitHub icons for the UI
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## API Endpoints

### 1. **GET /**
   Fetch all stored passwords.

### 2. **POST /**
   Add a new password to the database.
   - Request body should contain `site`, `username`, and `password`.

### 3. **DELETE /**
   Delete a password by ID.
   - Request body should contain the password ID.

### 4. **PUT /:id**
   Update an existing password by ID.
   - URL parameter `:id` is the unique identifier of the password.
   - Request body should contain the updated `site`, `username`, and `password`.

## Future Enhancements

- **Encryption**: Implement password encryption for secure storage.
- **User Authentication**: Add user login and registration to allow personalized password storage.
- **Search Functionality**: Implement a search bar to quickly find saved passwords.
- **Password Strength Meter**: Add a feature to evaluate password strength when users input a new password.

## License

This project is licensed under the MIT License.
