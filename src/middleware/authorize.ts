import { Request, Response, NextFunction } from 'express';
import { UserGroupTypes } from '../interfaces/auth';
import { authService } from '../services';
import { ApiError } from '../errors/ApiError';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return next(new ApiError('Unauthorized', 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = authService.verifyToken(token);

        req.userId = payload.id;
        req.userGroup = payload.group;

        next();
    } catch (err) {
        next(new ApiError('Invalid token', 401));
    }
};
