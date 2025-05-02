import {Request, Response, NextFunction} from 'express';
import { UserRes } from '../../interfaces/authResponses';
import { authService } from '../../services';

interface ResObject {
    message: string;
    user: UserRes;
    token: string;
};

const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await authService.recoverUser({email, password});
        const token = authService.generateToken(user);
        const resObj: ResObject = {
            message: 'Succesfully created user.',
            user,
            token
        };
        res.status(200).json(resObj);
    } catch (err) {
        next(err);
    }
};

export default getOneUser;