import {Request, Response, NextFunction} from 'express';
import { PostRes } from '../../interfaces/blogResponses';
import { postService } from '../../services';
import { UpdatePostReq } from '../../interfaces/blogRequests';

interface ResObject {
    message: string;
    post: PostRes;
};

const updateOnePost = async (req: Request, res: Response, next: NextFunction) => {
    const postReqData: UpdatePostReq = req.body;
    const oldPost = req.post!;
    try {
        const post: PostRes = await postService.updatePost(oldPost, postReqData);
        const resObj: ResObject = {
            message: 'Succesfully updated post.',
            post
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default updateOnePost;