import { Request, Response, NextFunction } from 'express';
import { authService } from '../services';
import { UserGroupValues } from '../interfaces/auth';

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        
        try {
            const payload = authService.verifyToken(token);
    
            req.userId = payload.id;
            req.userGroup = payload.group;
    
            next();
        } catch (err) {
            req.userId = undefined;
            req.userGroup = UserGroupValues.Guest;
            next();
        }
    }
};
