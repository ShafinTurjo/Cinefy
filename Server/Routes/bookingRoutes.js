import express from 'express';
import { createBooking } from '../controllers/BookingController';
import { get } from 'mongoose';

const bookingRouter = express.Router();
bookingRouter.post('/create',createBooking);
bookingRouter.post('/seats/:showId',getOccupiedSeats);
export default bookingRouter;