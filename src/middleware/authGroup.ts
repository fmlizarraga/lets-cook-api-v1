import { Request, Response, NextFunction } from 'express';
import { UserGroupTypes } from '../interfaces/auth';
import { ApiError } from '../errors/ApiError';

export const authorize = (allowedGroups: UserGroupTypes[]) =>
    (req: Request, res: Response, next: NextFunction) => {

        if (!req.userGroup) {
            return next(new ApiError('Unauthorized', 401));
        }

        if (!allowedGroups.includes(req.userGroup)) {
            return next(new ApiError('Forbidden', 403));
        }

        next();
};