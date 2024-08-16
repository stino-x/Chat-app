import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToMongoDB from './db/connecttoDB.js';
import { app, server } from "./socket/socket.js";

dotenv.config();  // Load environment variables

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Remove or comment out static file serving
// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Remove or comment out the catch-all route for frontend
// app.get("*", (req, res) => {
//    res.send("Not Found"); // or handle it differently for API-only server
// });

// Start the server and connect to MongoDB
server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
