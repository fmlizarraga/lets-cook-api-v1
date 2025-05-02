import { Request, Response, NextFunction } from 'express';
import { hasPermission, PermissionName } from "../permissions/permissions";
import { ApiError } from '../errors/ApiError';

export const authPermission = (permission: PermissionName) => 
    (req: Request, res: Response, next: NextFunction) => {
        const group = req.userGroup!;

        if (!group) {
            return next(new ApiError('Unauthorized', 401));
        }

        if (!hasPermission(group, permission)) {
            return next(new ApiError('Forbidden', 403));
        }

        next();
};