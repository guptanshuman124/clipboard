import { Request, Response } from 'express';
import MessageModel from '../models/message';

const receiveController = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { code } = req.body;

        // Find the message with the given unique code
        const message = await MessageModel.findOne({ uniqueCode: code });

        if (!message) {
            res.status(404).json({ error: "Message not found" });
            return;
        }

        res.status(200).json({
            message: message.message,
            uniqueCode: message.uniqueCode
        });
    } catch (error) {
        console.error('Error receiving message:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default receiveController;