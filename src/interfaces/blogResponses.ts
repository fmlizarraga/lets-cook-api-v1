import { UserRes } from "./authResponses";
import { PostStatus } from "./blog";

export interface PostRes {
    id: string;
    author: UserRes;
    title: string;
    summary?: string;
    body: string;
    timeStamp: number;
    tags: TagRes[];
    likes: number;
    featuredImage?: string;
    comments: CommentRes[];
    status: PostStatus;
}

export interface TagRes {
    value: string;
    visualName: string;
}

export interface CommentRes {
    id: string;
    author: UserRes;
    body: string;
    status: PostStatus;
    likes: number;
    timeStamp: number;
}
