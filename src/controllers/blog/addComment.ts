import {Request, Response, NextFunction} from 'express';
import { CommentRes } from '../../interfaces/blogResponses';
import { commentService } from '../../services';
import { CreateCommentReq } from '../../interfaces/blogRequests';

interface ResObject {
    message: string;
    comment: CommentRes;
}

const addComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentReqData: CreateCommentReq = req.body;
    const userId = req.userId!;
    const postId = req.params.postId;
    try {
        const newComment: CommentRes = await commentService.createComment(userId, postId, commentReqData);
        const resObj: ResObject = {
            message: 'Succesfully created comment.',
            comment: newComment
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default addComment;