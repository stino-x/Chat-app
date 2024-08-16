import express from 'express';
import path from "path";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';  // Import cors package
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToMongoDB from './db/connecttoDB.js';
import { app, server } from "./socket/socket.js";
import { fileURLToPath } from 'url';

dotenv.config();

app.use(express.json());
app.use(cookieParser());

// Update your CORS configuration to handle multiple origins
const allowedOrigins = [
  'https://chat-app-lilac-one.vercel.app',
  'https://chat-97jj4wuij-augustines-projects-0193fa04.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or Postman) or match against allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // If your requests include cookies, authorization headers, or TLS client certificates
}));

const PORT = process.env.PORT || 5000;

// Commented out because you're serving the frontend separately
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Commented out because you're serving the frontend separately
// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Commented out because you're serving the frontend separately
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
