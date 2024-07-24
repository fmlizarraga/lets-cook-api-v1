import { UserRes } from "../interfaces/authResponses";
import { LoginReq, RegisterReq } from "../interfaces/authRequests";

class AuthService {
    async recoverUser({email, password}: LoginReq): Promise<UserRes> {
        try {
            // TODO get user from db with password
            // TODO check password
            return {
                id: 'abc123',
                name: 'pepe',
                email: email,
                group: 'Admin'
            };
        } catch (error) {
            throw new Error(error);
        }
    };

    async createUser({name, email, password, picture}: RegisterReq): Promise<UserRes> {
        // TODO check if user with that email already exists and throw error
        // TODO create user
        return {
            id: 'abc123',
            name: name,
            email: email,
            group: 'Member',
            picture: picture
        };
    };
}