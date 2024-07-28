import {Router} from 'express';
import {
    getPostsController,
    createPostController,
    updatePostController,
    deletePostController,
    addCommentController,
    updateCommentController,
    deleteCommentController
} from '../controllers/blog';

const router = Router();

router.get('/', getPostsController);
router.post('/', createPostController);
router.put('/:postId', updatePostController);
router.delete('/:postId', deletePostController);

router.post('/comments/:postId', addCommentController);
router.put('/comments/:commentId', updateCommentController);
router.delete('/comments/:commentId', deleteCommentController);

export default router;