import dotenv from 'dotenv';
dotenv.config(); // MUST BE AT THE VERY TOP

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Import all routes
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import medicationsRoutes from './routes/medication.route.js';
import historyRoutes from './routes/history.route.js';
import reminderRoutes from './routes/reminder.route.js';

// Import the scheduler
import { startScheduler } from './utils/scheduler.js';

// Check for essential environment variables
if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/medications", medicationsRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/reminders", reminderRoutes);

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB();
    startScheduler();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
};

startServer();