import {Request, Response, NextFunction} from 'express';
import { PostRes } from '../../interfaces/blogResponses';
import { blogService } from '../..//services';

interface ResObject {
    ok: boolean;
    message: string;
    posts: PostRes[];
};

const getManyPosts = async (req: Request, res: Response, next: NextFunction) => {
    const DEMO_POSTS: PostRes[] = await blogService.recoverPosts('userid');
    const resObj: ResObject = {
        ok: true,
        message: 'Succesfully retrieved posts.',
        posts: DEMO_POSTS
    }
    res.status( 200 ).json(resObj);
};

export default getManyPosts;