import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from './Routes/showRoutes.js';
import bookingRouter from './Routes/bookingRoutes.js';

const port = 3000;


const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => res.send('Server is Live!'));
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/shows', showRouter);
app.use('/api/bookings', bookingRouter);


// Connect to database
await connectDB();
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
}
export default app;
