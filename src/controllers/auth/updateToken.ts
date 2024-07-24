import {Request, Response, NextFunction} from 'express';

interface ResObject {
    ok: boolean;
    message: string;
    token: string;
};

const updateToken = (req: Request, res: Response, next: NextFunction) => {
    const resObj: ResObject = {
        ok: true,
        message: 'Succesfully created user.',
        token: 'dummy_token'
    };
    res.status(200).json(resObj);
};

export default updateToken;