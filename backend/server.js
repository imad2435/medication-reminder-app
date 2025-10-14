// Import required packages
const connectDB = require('./config/db');

const express = require('express');
const cors = require('cors');
 // Import the database connection function

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
  res.json({ message: "Hello from the backend server!" });
});

// Define Port
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});