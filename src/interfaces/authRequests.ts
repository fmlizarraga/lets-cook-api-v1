export interface RegisterReq {
    name: string;
    email: string;
    password: string;
    picture?: string;
}

export interface LoginReq {
    email: string;
    password: string;
}
