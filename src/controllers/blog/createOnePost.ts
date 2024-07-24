import {Request, Response, NextFunction} from 'express';
import { PostRes } from '../../interfaces/blogResponses';
import { blogService } from '../../services';

interface ResObject {
    ok: boolean;
    message: string;
    post: PostRes;
};

const createOnePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const DEMO_POST: PostRes = await blogService.createPost({
            status: 'Pending',
            author: {
                id: 'AAB123',
                name: 'pepe',
                email: 'pepe@mail.com',
                group: 'Member',
            },
            title: 'A title',
            body: 'lorem ipsum',
            tags: [{value: 'tag', visualName: 'Tag'}],
        });
        const resObj: ResObject = {
            ok: true,
            message: 'Succesfully created post.',
            post: DEMO_POST
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default createOnePost;