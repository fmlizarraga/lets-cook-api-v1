import { UserGroupTypes } from "./auth";

export interface UserRes {
    id: string;
    name: string;
    group: UserGroupTypes;
    email: string;
    picture?: string;
};
