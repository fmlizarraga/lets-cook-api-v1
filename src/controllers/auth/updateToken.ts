import {Request, Response, NextFunction} from 'express';
import { authService } from '../../services';

interface ResObject {
    message: string;
    token: string;
};

const updateToken = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId!;
    const userGroup = req.userGroup!;
    const token = authService.refreshToken({id: userId, group: userGroup});
    const resObj: ResObject = {
        message: 'Succesfully updated token.',
        token
    };
    res.status(200).json(resObj);
};

export default updateToken;