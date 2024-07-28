import { NextFunction, Request, Response } from "express";
import { blogService } from "../../services";

type ResObject = {
    ok: boolean;
    message: string;
};

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await blogService.deleteComment('commentId')
        const resObj: ResObject = {
            ok: true,
            message: 'Succesfully deleted comment.',
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default deleteComment;