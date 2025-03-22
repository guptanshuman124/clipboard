import { Router } from 'express';
import sendController from '../controllers/sendController';
import receiveController from '../controllers/receiveController';


const router = Router();

router.post('/send',sendController);
router.post('/receive',receiveController as any);

export default router;