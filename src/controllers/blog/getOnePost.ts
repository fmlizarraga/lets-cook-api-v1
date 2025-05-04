import {Request, Response, NextFunction} from 'express';
import { postService } from '../../services';
import { PostRes } from '../../interfaces/blogResponses';
import { PostStatus } from '../../interfaces/blog';
import { getVisibleStatuses } from '../../permissions/getVisibleStatuses';

interface ResObject {
    message: string
    post: PostRes
}

const getOnePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    const userId = req.userId;
    const userGroup = req.userGroup!;
    const statuses: PostStatus[] = getVisibleStatuses(userId, userGroup, postId);
    try {
        const post = await postService.getOnePost(postId, statuses);
        const resObj: ResObject = {
            message: 'Succesfully retrieved post.',
            post
        }
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default getOnePost;