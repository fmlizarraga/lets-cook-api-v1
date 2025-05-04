import {Request, Response, NextFunction} from 'express';
import { CommentRes } from '../../interfaces/blogResponses';
import { commentService } from '../../services';
import { UpdateCommentReq } from '../../interfaces/blogRequests';

type ResObject = {
    message: string,
    comment: CommentRes
};
const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentReqData: UpdateCommentReq = req.body;
    const oldComment = req.comment!;
    try {
        const updatedComment: CommentRes = await commentService.updateComment(oldComment, commentReqData);
        const resObj: ResObject = {
            message: 'Succesfully updated comment.',
            comment: updatedComment
        }
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default updateComment;