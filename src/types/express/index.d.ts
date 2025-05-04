import { Request } from 'express';
import { UserGroupTypes } from '../../interfaces/auth';
import { Post } from '../../entity/Post';
import { Comment } from '../../entity/Comment';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            userGroup?: UserGroupTypes;
            post?: Post;
            comment?: Comment;
        }
    }
}