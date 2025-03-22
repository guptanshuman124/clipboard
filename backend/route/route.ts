import { Router } from 'express';
import sendController from '../controllers/sendController';

const router = Router();

router.post('/send',sendController);

export default router;