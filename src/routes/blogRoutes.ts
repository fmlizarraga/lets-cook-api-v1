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
import { verifyUserStatus } from '../middleware/verifyUserStatus';

const router = Router();

router.get(
    '/',
    optionalAuth,
    authPermission('readPost'),
    getPostsController
);
router.get(
    '/:postId',
    optionalAuth,
    authPermission('readPost'),
    getPostController
);
router.post(
    '/',
    authorize,
    verifyUserStatus,
    authPermission('createPost'),
    createPostController
);
router.put(
    '/:postId',
    authorize,
    verifyUserStatus,
    canEditPost,
    updatePostController
);
router.delete(
    '/:postId',
    authorize,
    verifyUserStatus,
    canEditPost,
    deletePostController
);

router.post(
    '/comments/:postId',
    authorize,
    verifyUserStatus,
    authPermission('comment'),
    addCommentController
);
router.put(
    '/comments/:commentId',
    authorize,
    verifyUserStatus,
    canEditComment,
    updateCommentController
);
router.delete(
    '/comments/:commentId',
    authorize,
    verifyUserStatus,
    canEditComment,
    deleteCommentController
);

export default router;