import {Request, Response, NextFunction} from 'express';
import { UserRes } from '../../interfaces/authResponses';
import { authService } from '../../services';

interface ResObject {
    ok: boolean;
    message: string;
};

const createOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    try {
        await authService.createUser(userName, userEmail, userPassword);
        const resObj: ResObject = {
            ok: true,
            message: 'Succesfully created user.',
        };
        res.status(200).json(resObj);
    } catch (error) {
        next(error);
    }
};

export default createOneUser;