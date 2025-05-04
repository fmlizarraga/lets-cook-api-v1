import { Request, Response, NextFunction } from 'express';
import { postService } from '../services';
import { hasMinimumGroup, UserGroupValues } from '../interfaces/auth';
import { ApiError } from '../errors/ApiError';

export const canEditPost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    const userId = req.userId!;
    const userGroup = req.userGroup!;

    try {
        const myPost = await postService.findPostById(postId);
        if (!myPost) {
            return next(new ApiError('Post not found', 404));
        }

        const isOwner = myPost.author.id === userId;
        const isElevated = hasMinimumGroup(userGroup, UserGroupValues.Moderator);

        if (!isOwner && !isElevated) {
            return next(new ApiError('Forbidden', 403));
        }

        req.post = myPost;

        next();
    }
    catch (err) {
        next(err);
    }
};