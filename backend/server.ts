import express, { Request, Response } from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Get port from environment variables

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route to test the server
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});