import {Request, Response, NextFunction} from 'express';

interface ResObject {
    ok: boolean;
    message: string;
    token: string;
};

const updateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = 'dummy_token';
    const resObj: ResObject = {
        ok: true,
        message: 'Succesfully updated token.',
        token
    };
    res.status(200).json(resObj);
};

export default updateToken;