import { NextFunction, Request, Response } from "express";
import { commentService } from "../../services";

type ResObject = {
    message: string;
};

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const comment = req.comment!;
    try {
        await commentService.deleteComment(comment);
        const resObj: ResObject = {
            message: 'Succesfully deleted comment.',
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default deleteComment;