import {Request, Response, NextFunction} from 'express';
import { CommentRes } from '../../interfaces/blogResponses';
import { blogService } from '../../services';

type ResObject = {
    ok: boolean,
    message: string,
    comment: CommentRes
};
const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const DEMO_COMMENT: CommentRes = await blogService.updateComment('commentId', {
            body: 'this is a test'
        })
        const resObj: ResObject = {
            ok: true,
            message: 'Succesfully updated comment.',
            comment: DEMO_COMMENT
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default updateComment;