// import { glob } from 'glob';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authorizeMiddleware from './middleware/authorize.js';
import authRoutes from './auth/routes/index.js';
import userRoutes from './users/routes/index.js';
import journeyPointRoutes from './journey-points/routes/index.js';
const app = express();

app.use(cors({
  origin: [ 'http://localhost:3000', 'https://nomadconnect-frontend.onrender.com/' ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '3mb' })); // Largest image size for profile picture is 2MB + buffer
app.use(authRoutes);
app.use(authorizeMiddleware, userRoutes);
app.use(authorizeMiddleware, journeyPointRoutes);

export default app;
