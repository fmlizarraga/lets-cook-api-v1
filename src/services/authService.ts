import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../config/data-source';
import { UserRes } from '../interfaces/authResponses';
import { ApiError } from '../errors/ApiError';
import { jwtSecret } from '../config/env';
import { TokenPayload, UserGroupTypes } from '../interfaces/auth';
import { LoginReq } from '../interfaces/authRequests';

class AuthService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    };

    async createUser(name: string, email: string, password: string): Promise<void> {
        const existingUser = await this.findUserByEmail(email);

        if (existingUser) {
            throw new ApiError('User already exists', 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ name, email, password: hashedPassword });

        await this.userRepository.save(user);
    };

    async recoverUser({email, password}: LoginReq): Promise<UserRes> {
        const user = await this.findUserByEmail(email);

        if (!user) {
            throw new ApiError('User not found', 404);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new ApiError('Invalid password', 401);
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            group: user.group,
            picture: user.picture
        };
    };

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    };

    async findUserById(id: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    };

    generateToken(user: UserRes): string {
        const payload = { id: user.id, group: user.group };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
        return token;
    };

    verifyToken(token: string): TokenPayload {
        try {
            return jwt.verify(token, jwtSecret) as TokenPayload;
        } catch (err) {
            throw new ApiError('Invalid token', 401);
        }
    };

    refreshToken(payload: TokenPayload): string {
        const newToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
        return newToken;
    };
};

export default new AuthService();
