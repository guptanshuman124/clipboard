import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import router  from './route/route';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Get port from environment variables

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api',router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});