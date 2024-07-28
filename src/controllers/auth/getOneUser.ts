import {Request, Response, NextFunction} from 'express';
import { UserRes } from '../../interfaces/authResponses';
import { authService } from '../../services';

interface ResObject {
    ok: boolean;
    message: string;
    user: UserRes;
    token: string;
};

const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const DEMO_USER: UserRes = await authService.recoverUser({email:"pepe@mail.com", password:"1234"});
        const resObj: ResObject = {
            ok: true,
            message: 'Succesfully created user.',
            user: DEMO_USER,
            token: 'dummy_token'
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default getOneUser;