import {Request, Response, NextFunction} from 'express';
import { CommentRes } from '../../interfaces/blogResponses';
import { blogService } from '../../services';

interface ResObject {
    ok: boolean;
    message: string;
    comment: CommentRes;
}
const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const DEMO_COMMENT: CommentRes = await blogService.createComment('postId', {
            author: {
                id: 'AAB123',
                name: 'pepe',
                email: 'pepe@mail.com',
                group: 'Member',
            },
            body: 'this is a test',
            status: 'Pending',
        })
        const resObj: ResObject = {
            ok: true,
            message: 'Succesfully created comment.',
            comment: DEMO_COMMENT
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default addComment;