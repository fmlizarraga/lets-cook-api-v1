import {Router} from 'express';
import {
    checkController,
    loginController,
    registerController,
} from '../controllers/auth';

const router = Router();

router.get('/', checkController);
router.post('/', loginController);
router.put('/', registerController);

export default router;