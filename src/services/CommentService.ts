import { In, Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { CommentRes } from '../interfaces/blogResponses';
import { Comment } from '../entity/Comment';
import { authService, postService } from '.';
import { ApiError } from '../errors/ApiError';
import { CreateCommentReq, UpdateCommentReq } from '../interfaces/blogRequests';
import { StatusValues, PostStatus } from '../interfaces/blog';

class CommentService {
    private commentRepository: Repository<Comment>

    constructor() {
        this.commentRepository = AppDataSource.getRepository(Comment);
    }

    private commentToResponse(comment: Comment): CommentRes {
        return {
            id: comment.id,
            body: comment.body,
            author: comment.author,
            timeStamp: comment.timeStamp.getTime(),
            status: comment.status,
            likes: comment.likes
        };
    }

    async getCommentsByUserId(
        userId: string,
        limit: number,
        offset: number,
        statuses: PostStatus[] = [StatusValues.Approved],
    ): Promise<CommentRes[]> {
        const comments = await this.commentRepository.find({
            where: { author: { id: userId }, status: In(statuses) },
            relations: ['author'],
            take: limit,
            skip: offset,
            order: {
                timeStamp: 'DESC'
            }
        });
        return comments.map(c => this.commentToResponse(c));
    }

    async getPaginatedCommentsByPostId(
            postId: string,
            limit: number,
            offset: number,
            statuses: PostStatus[] = [StatusValues.Approved],
        ): Promise<{comments: CommentRes[], total: number}> {
        const [comments, total] = await this.commentRepository.findAndCount({
            where: { post: { id: postId }, status: In(statuses) },
            relations: ['author'],
            take: limit,
            skip: offset,
            order: {
                timeStamp: 'DESC'
            }
        });

        return {comments: comments.map(c => this.commentToResponse(c)), total};
    }

    async createComment(userId: string, postId: string, data: CreateCommentReq): Promise<CommentRes> {
        const comment = new Comment();
        const post = await postService.findPostById(postId);
        const author = await authService.findUserById(userId);

        if (!author) {
            throw new ApiError('User not found', 404);
        }

        if (!post) {
            throw new ApiError('Post not found', 404);
        }

        comment.body = data.body;
        comment.author = author;
        comment.post = post;
        comment.status = data.status ?? StatusValues.Pending;

        await this.commentRepository.save(comment);
        return this.commentToResponse(comment);
    }

    async findCommentById(commentId: string): Promise<Comment | null> {
        return this.commentRepository.findOne({
            where: { id: commentId },
            relations: ['author', 'post']
        });
    }

    async updateComment(commentId: string, data: UpdateCommentReq): Promise<CommentRes> {
        const comment = await this.findCommentById(commentId);

        if (!comment) {
            throw new ApiError('Comment not found', 404);
        }

        comment.body = data.body ?? comment.body;
        comment.status = data.status ?? comment.status;

        await this.commentRepository.save(comment);
        return this.commentToResponse(comment);
    }

    async deleteComment(commentId: string): Promise<void> {
        await this.updateComment(commentId, { status: StatusValues.Deleted });
    }
}

export default new CommentService();