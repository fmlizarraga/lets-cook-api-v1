import {Request, Response, NextFunction} from 'express';
import { PostRes } from '../../interfaces/blogResponses';
import { postService } from '../..//services';
import { PostStatus } from '../../interfaces/blog';
import { getVisibleStatuses } from '../../permissions/getVisibleStatuses';

interface ResObject {
    message: string;
    posts: PostRes[];
    page: number;
    limit: number;
    offset: number;
    total: number
};

const getManyPosts = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userId = req.userId;
    const userGroup = req.userGroup!;
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const offset = (page - 1) * limit;
    const statuses: PostStatus[] = getVisibleStatuses(
        userId,
        userGroup,
        id
    );
    try {
        const {posts, total} = await postService.getPaginatedPosts(limit, offset, statuses);
        const resObj: ResObject = {
            message: 'Succesfully retrieved posts.',
            posts,
            page,
            limit,
            offset,
            total
        }
        res.status( 200 ).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default getManyPosts;