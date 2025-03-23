import { Request, Response } from 'express';
import MessageModel from '../models/message';

const receiveController = async (req: Request, res: Response) => {
    const { code } = req.body;

    const message = await MessageModel.findOne({ uniqueCode: code});

    if (message) {
        res.status(200).json({
            message: message.message,
            success: true
        });
    }else{
        res.status(404).json({
            message: 'Message not found',
            success: false
         });
    }
};

export default receiveController;