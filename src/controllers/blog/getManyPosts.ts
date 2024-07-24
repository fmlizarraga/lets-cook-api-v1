import {Request, Response, NextFunction} from 'express';
import { PostRes } from '../../interfaces/blogResponses';

interface ResObject {
    ok: boolean;
    message: string;
    posts: PostRes[];
};

const getManyPosts = async (req: Request, res: Response, next: NextFunction) => {
    const DEMO_POST: PostRes = {
        id: 'ABC123',
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
        likes: 0,
        comments: [],
        timeStamp: Date.now()
    };
    const resObj: ResObject = {
        ok: true,
        message: 'Succesfully retrieved posts.',
        posts: [DEMO_POST]
    }
    res.status( 200 ).json(resObj);
};

export default getManyPosts;