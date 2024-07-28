import {Request, Response, NextFunction} from 'express';
import { PostRes } from '../../interfaces/blogResponses';
import { blogService } from '../../services';

interface ResObject {
    ok: boolean;
    message: string;
    post: PostRes;
};

const updateOnePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const DEMO_POST: PostRes = await blogService.updatePost('userid',{
            timestamp: Date.now()
        });
        const resObj: ResObject = {
            ok: true,
            message: 'Succesfully updated post.',
            post: DEMO_POST
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default updateOnePost;