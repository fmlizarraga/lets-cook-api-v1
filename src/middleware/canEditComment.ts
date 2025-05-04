import { Request, Response, NextFunction } from 'express';
import { commentService } from '../services';
import { hasMinimumGroup, UserGroupValues } from '../interfaces/auth';
import { ApiError } from '../errors/ApiError';

export const canEditComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const userId = req.userId!;
    const userGroup = req.userGroup!;

    try {
        const myComment = await commentService.findCommentById(commentId);
        if (!myComment) {
            return next(new ApiError('Comment not found', 404));
        }

        const isOwner = myComment.author.id === userId;
        const isElevated = hasMinimumGroup(userGroup, UserGroupValues.Moderator);

        if (!isOwner && !isElevated) {
            return next(new ApiError('Forbidden', 403));
        }

        req.comment = myComment;

        next();
    }
    catch (err) {
        next(err);
    }
};
