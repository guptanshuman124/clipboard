import { Request, Response } from 'express';
import MessageModel from '../models/message';

// Generate a unique 4-digit code
const generateUniqueCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendController = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        var uniqueCode = generateUniqueCode();
        while(await MessageModel.findOne({ uniqueCode: uniqueCode })!==null){
            uniqueCode = generateUniqueCode();
        }

        const newMessage = new MessageModel({
            message,
            uniqueCode,
        });

        newMessage.save();

        res.status(201).json({
            uniqueCode: uniqueCode
        });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default sendController;
