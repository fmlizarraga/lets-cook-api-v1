import { Request, Response, NextFunction } from 'express';
import { hasMinimumGroup, UserGroupTypes } from '../interfaces/auth';
import { ApiError } from '../errors/ApiError';

export const authMinReqGroup = (minReqGroup: UserGroupTypes) =>
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.userGroup || !hasMinimumGroup(req.userGroup, minReqGroup)) {
            return next(new ApiError('Forbidden', 403));
        }
        next();
    };