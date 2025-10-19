import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import medicationsRoutes from './routes/medication.route.js';
import historyRoutes from './routes/history.route.js';
import authRoutes from './routes/auth.route.js';

// Load environment variables immediately
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/medications", medicationsRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5001; // Using 5001 to be consistent

// --- CORRECTED STARTUP LOGIC ---
const startServer = async () => {
  try {
    // 1. Connect to the database
    await connectDB();

    // 2. Only if the DB connection is successful, start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

  } catch (error) {
    console.error("Failed to connect to the database. Server is not starting.", error);
  }
};

// --- RUN THE STARTUP LOGIC ---
startServer();