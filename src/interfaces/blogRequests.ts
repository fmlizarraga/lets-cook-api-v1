import { PostStatus } from "./blog";

export interface CreatePostReq {
    title: string;
    summary?: string;
    body: string;
    tags: TagReq[];
    featuredImage?: string;
    status?: PostStatus;
}

export interface UpdatePostReq {
    title?: string;
    summary?: string;
    body?: string;
    tags?: TagReq[];
    featuredImage?: string;
    status?: PostStatus;
    timestamp: number;
}

export interface TagReq {
    value: string;
    visualName?: string;
}

export interface CreateCommentReq {
    body: string;
    status?: PostStatus;
}

export interface UpdateCommentReq {
    body?: string;
    status?: PostStatus;
}
