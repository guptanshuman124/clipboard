// filepath: /Users/grario/PERSONAL SPACE/CODING/PROJECT/online-clipboard/backend/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Get MongoDB URI from environment variables
    console.log(mongoURI);
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected...');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;