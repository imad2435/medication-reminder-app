import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import medicationsRoutes from './routes/medication.route.js';
import historyRoutes from './routes/history.route.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js'; // <-- ADD THIS IMPORT

// Load environment variables immediately
dotenv.config();
console.log("✅ MONGODB_URI from .env:", process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/medications", medicationsRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // <-- ADD THIS LINE TO USE THE ROUTE

const port = process.env.PORT || 5001;

// --- Server Startup Logic ---
const startServer = async () => {
  // ... (existing startServer function remains here)
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database. Server is not starting.", error);
  }
};

startServer();