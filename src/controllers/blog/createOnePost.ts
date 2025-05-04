import {Request, Response, NextFunction} from 'express';
import { PostRes } from '../../interfaces/blogResponses';
import { postService } from '../../services';
import { CreatePostReq } from '../../interfaces/blogRequests';

interface ResObject {
    message: string;
    post: PostRes;
};

const createOnePost = async (req: Request, res: Response, next: NextFunction) => {
    const postReqData: CreatePostReq = req.body;
    const userId = req.userId!;
    try {
        const post: PostRes = await postService.createPost(userId, postReqData);
        const resObj: ResObject = {
            message: 'Succesfully created post.',
            post
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default createOnePost;