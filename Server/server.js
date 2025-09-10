import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from './Routes/showRoutes.js';
import bookingRouter from './Routes/bookingRoutes.js';
const app = express();
const port = process.env.PORT||5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => res.send('Server is Live!'));
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);

const startServer = async () => {
  try {
// Connect to database
await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
}catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
export default app;
