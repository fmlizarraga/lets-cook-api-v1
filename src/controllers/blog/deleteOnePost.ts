import {Request, Response, NextFunction} from 'express';
import { blogService } from '../../services';

interface ResObject {
    ok: boolean;
    message: string;
};

const deleteOnePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId: string = req.body.postId;
        await blogService.deletePost(postId);
        const resObj: ResObject = {
            ok: true,
            message: 'Succesfully deleted post.'
        }
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default deleteOnePost;