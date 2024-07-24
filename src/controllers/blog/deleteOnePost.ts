import {Request, Response, NextFunction} from 'express';

interface ResObject {
    ok: boolean;
    message: string;
};

const deleteOnePost = (req: Request, res: Response, next: NextFunction) => {
    const resObj: ResObject = {
        ok: true,
        message: 'Succesfully deleted post.'
    }
    res.status(200).json(resObj);
};

export default deleteOnePost;