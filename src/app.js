// import { glob } from 'glob';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRoutes from './auth/routes/index.js';

const app = express();

app.use(cors({
  origin: [ 'http://localhost:3000', 'https://nomadconnect-frontend.onrender.com/' ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(authRoutes);

export default app;