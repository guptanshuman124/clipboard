import { Request, Response } from 'express';
import MessageModel from '../models/message';

// Generate a unique 4-digit code
const generateUniqueCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendController = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const uniqueCode = generateUniqueCode();

        const newMessage = new MessageModel({
            message,
            uniqueCode,
        });

        const savedMessage = await newMessage.save();

        res.status(201).json({
            message: "message saved successfully",
            data: savedMessage,
            uniqueCode: uniqueCode
        });

        // res.send(uniqueCode);
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default sendController;
