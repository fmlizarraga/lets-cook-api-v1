import {Request, Response, NextFunction} from 'express';
import { postService } from '../../services';

interface ResObject {
    message: string;
};

const deleteOnePost = async (req: Request, res: Response, next: NextFunction) => {
    const post = req.post!;
    try {
        await postService.deletePost(post);
        const resObj: ResObject = {
            message: 'Succesfully deleted post.'
        }
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default deleteOnePost;