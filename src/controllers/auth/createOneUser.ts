import {Request, Response, NextFunction} from 'express';
import { UserRes } from '../../interfaces/authResponses';
import { authService } from '../../services';

interface ResObject {
    ok: boolean;
    message: string;
    user: UserRes;
};

const createOneUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authService.createUser({name:"pepe", email:"pepe@mail.com", password:"1234"});
        const resObj: ResObject = {
            ok: true,
            message: 'Succesfully created user.',
            user: user
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default createOneUser;