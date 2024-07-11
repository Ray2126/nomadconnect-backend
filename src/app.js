// import { glob } from 'glob';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authorizeMiddleware from './middleware/authorize.js';
import authRoutes from './auth/routes/index.js';
import userRoutes from './users/routes/index.js';
const app = express();

app.use(cors({
  origin: [ 'http://localhost:3000', 'https://nomadconnect-frontend.onrender.com/' ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(authRoutes);
app.use(authorizeMiddleware, userRoutes);

export default app;
