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

// Enable CORS for requests from your frontend
app.use(cors({
  origin: 'https://chat-app-lilac-one.vercel.app',  // Replace with your Vercel frontend URL
  credentials: true,  // If your requests include cookies, authorization headers, or TLS client certificates
}));

const PORT = process.env.PORT || 5000;
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
