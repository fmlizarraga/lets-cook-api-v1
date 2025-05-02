import { Request } from 'express';
import { UserGroupTypes } from '../../interfaces/auth';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            userGroup?: UserGroupTypes;
        }
    }
}