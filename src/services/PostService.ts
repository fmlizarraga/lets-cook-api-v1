import { In, Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Post } from "../entity/Post";
import { authService, commentService, tagService } from '.';
import { CreatePostReq, UpdatePostReq } from "../interfaces/blogRequests";
import { CommentRes, PostRes } from "../interfaces/blogResponses";
import { PostStatus, StatusValues } from '../interfaces/blog';
import { ApiError } from "../errors/ApiError";

class PostService {

    private postRepository: Repository<Post>;

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post);
    }

    private async postToResponse(
        post: Post,
        includeComments: boolean = false,
        commentsStatuses: PostStatus[] = [
            StatusValues.Approved,
            StatusValues.Pinned,
            StatusValues.Flagged
        ]
    ): Promise<PostRes> {
        let comments: CommentRes[] = [];
        if (includeComments) {
            comments = await commentService.getPaginatedCommentsByPostId(
                post.id, 10, 0, commentsStatuses
            ).then(r => r.comments);
        }
        return {
            id: post.id,
            title: post.title,
            summary: post.summary,
            body: post.body,
            author: post.author,
            status: post.status,
            timeStamp: post.timeStamp.getTime(),
            likes: post.likes,
            tags: post.tags,
            comments: comments,
            featuredImage: post.featuredImage
        };
    }

    async createPost(userId: string, data: CreatePostReq): Promise<PostRes> {
        const post = new Post();
        const author = await authService.findUserById(userId);

        if (!author) {
            throw new ApiError('User not found', 404);
        }

        if (data.tags) {
            const tags = await Promise.all(data.tags.map(tag => tagService.getOrCreateTag(tag)));
            post.tags = tags;
        }

        post.title = data.title;
        post.summary = data.summary;
        post.body = data.body;
        post.author = author;
        post.featuredImage = data.featuredImage;
        post.status = data.status ?? StatusValues.Pending;

        await this.postRepository.save(post);
        return this.postToResponse(post);
    }

    async findPostById(postId: string): Promise<Post | null> {
        return this.postRepository.findOne({ 
            where: { id: postId },
            relations: ['author', 'tags']
        });
    }

    async updatePost(post: Post, data: UpdatePostReq): Promise<PostRes> {
        if (data.tags) {
            const tags = await Promise.all(data.tags.map(tag => tagService.getOrCreateTag(tag)));
            post.tags = tags;
        }

        post.title = data.title ?? post.title;
        post.summary = data.summary ?? post.summary;
        post.body = data.body ?? post.body;
        post.featuredImage = data.featuredImage ?? post.featuredImage;
        post.status = data.status ?? post.status;

        await this.postRepository.save(post);
        return this.postToResponse(post);
    }

    async getOnePost(
        postId: string,
        statuses: PostStatus[] = [StatusValues.Approved]
    ): Promise<PostRes> {
        const post = await this.findPostById(postId);

        if (!post) {
            throw new ApiError('Post not found', 404);
        }

        if (!statuses.includes(post.status)) {
            throw new ApiError('Unauthorized', 401);
        }

        return this.postToResponse(post, true, statuses);
    }

    async getPaginatedPosts(
        limit: number,
        offset: number,
        statuses: PostStatus[] = [StatusValues.Approved]
    ): Promise<{posts: PostRes[], total: number}> {
        const [posts, total] = await this.postRepository.findAndCount({
            where: { status: In(statuses) },
            relations: ['author', 'tags'],
            take: limit,
            skip: offset,
            order: {
                timeStamp: 'DESC'
            }
        });

        const postsRes = await Promise.all(posts.map(
            p => this.postToResponse(p, false, statuses)
        ));

        return {posts: postsRes, total};
    }

    async deletePost(post: Post): Promise<void> {
        post.status = StatusValues.Deleted;
        await this.postRepository.save(post);
    }
};

export default new PostService();