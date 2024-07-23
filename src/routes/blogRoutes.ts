import {Router} from 'express';
import { getPostsController } from '../controllers/blog';

const router = Router();

router.get('/', getPostsController);

export default router;