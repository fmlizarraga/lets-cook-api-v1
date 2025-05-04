import {Router} from 'express';
import {
    checkController,
    loginController,
    registerController,
} from '../controllers/auth';
import { authorize } from '../middleware/authorize';

const router = Router();

router.get('/', authorize, checkController);
router.post('/', loginController);
router.put('/', registerController);

export default router;