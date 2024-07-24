import {Router} from 'express';
import {
    getPostsController,
    createPostController,
    updatePostController,
    deletePostController
} from '../controllers/blog';

const router = Router();

router.get('/', getPostsController);

router.post('/', createPostController);

router.put('/:postId', updatePostController);

router.delete('/:postId', deletePostController);

export default router;