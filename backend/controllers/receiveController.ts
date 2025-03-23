import { Request, Response } from 'express';
import MessageModel from '../models/message';

const receiveController = async (req: Request, res: Response) => {
    const { code } = req.body;

    const message = await MessageModel.findOne({ uniqueCode: code});

    if (message) {
        res.status(200).json({
            message: message.message
        });
    }else{
        res.status(404).json({ error: 'Message not found' });
    }
};

export default receiveController;