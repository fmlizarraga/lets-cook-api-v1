import {Router} from 'express';
import {
    getPostsController,
    getPostController,
    createPostController,
    updatePostController,
    deletePostController,
    addCommentController,
    updateCommentController,
    deleteCommentController
} from '../controllers/blog';
import { authorize } from '../middleware/authorize';
import { canEditPost } from '../middleware/canEditPost';
import { authPermission } from '../middleware/authPermission';
import { canEditComment } from '../middleware/canEditComment';
import { optionalAuth } from '../middleware/optionalAuth';

const router = Router();

router.get('/', optionalAuth, authPermission('readPost'), getPostsController);
router.get('/:postId', optionalAuth, authPermission('readPost'), getPostController);
router.post('/', authorize, authPermission('createPost'), createPostController);
router.put('/:postId', authorize, canEditPost, updatePostController);
router.delete('/:postId', authorize, canEditPost, deletePostController);

router.post('/comments/:postId', authorize, authPermission('comment'), addCommentController);
router.put('/comments/:commentId', authorize, canEditComment, updateCommentController);
router.delete('/comments/:commentId', authorize, canEditComment, deleteCommentController);

export default router;