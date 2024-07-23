import { UserRes } from "./authResponses";
import { PostStatus } from "./blog";

export interface CreatePostReq {
    author: UserRes;
    title: string;
    summary?: string;
    body: string;
    tags: TagReq[];
    featuredImage?: string;
    status: PostStatus;
}

export interface UpdatePostReq {
    title?: string;
    summary?: string;
    body?: string;
    tags?: TagReq[];
    featuredImage?: string;
    status?: PostStatus;
}

export interface TagReq {
    value: string;
    visualName?: string;
}

export interface CreateCommentReq {
    author: UserRes;
    body: string;
    status: PostStatus;
}

export interface UpdateCommentReq {
    body?: string;
    status?: PostStatus;
}
