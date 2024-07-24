import {Request, Response, NextFunction} from 'express';
import { UserRes } from '../../interfaces/authResponses';

interface ResObject {
    ok: boolean;
    message: string;
    user: UserRes;
};

const createOneUser = (req: Request, res: Response, next: NextFunction) => {
    const DEMO_USER: UserRes = {
        id: 'AAB123',
        name: 'pepe',
        email: 'pepe@mail.com',
        group: 'Member',
    };
    const resObj: ResObject = {
        ok: true,
        message: 'Succesfully created user.',
        user: DEMO_USER
    };
    res.status(200).json(resObj);
};

export default createOneUser;