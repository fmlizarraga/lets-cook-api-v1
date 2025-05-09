import { Request, Response, NextFunction } from 'express';
import { authService } from '../services';
import { ApiError } from '../errors/ApiError';
import { UserGroupValues } from '../interfaces/auth';

export const verifyUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId || req.userGroup === UserGroupValues.Guest) {
        return next(new ApiError('Unauthorized', 401));
    }
    try {
        const user = await authService.findUserById(req.userId);
    
        if (!user) {
            return next(new ApiError('User not found', 404));
        }
    
        if (user.group !== req.userGroup) {
            return next(new ApiError('Credentials mismatch', 401, {action: 'logout'}));
        }

        if (user.group === UserGroupValues.Limited) {
            return next(new ApiError('Account suspended', 403, {action: 'suspended'}));
        }

        next();
    } catch (err) {
        next(err);
    }
};