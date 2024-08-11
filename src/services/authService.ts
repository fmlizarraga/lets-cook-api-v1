import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { UserRes } from '../interfaces/authResponses';
require('dotenv').config();

class AuthService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    };

    async createUser(name: string, email: string, password: string): Promise<void> {
        const existingUser = await this.findUserByEmail(email);

        if (existingUser) {
            const error = new Error('The user already exists');
            error.name = 'UserExistsError';
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ name, email, password: hashedPassword });

        await this.userRepository.save(user);
        return;
    };

    async recoverUser({email, password}: {email: string, password: string}): Promise<UserRes> {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
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

    generateToken(user: UserRes): string {
        const payload = { id: user.id, email: user.email, group: user.group };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    };
};

export default new AuthService();
