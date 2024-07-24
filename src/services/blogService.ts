import { CreateCommentReq, CreatePostReq, UpdateCommentReq, UpdatePostReq } from "../interfaces/blogRequests";
import { CommentRes, PostRes } from "../interfaces/blogResponses";

class BlogService {
    async recoverPosts(userId?: string): Promise<PostRes[]> {
        try {
            // TODO if user id recover user
            // TODO fetch only posts visible to the user's gorup or status='Approved'
            return [
                {
                    id: 'ABC123',
                    status: 'Approved',
                    author: {
                        id: 'AAB123',
                        name: 'pepe',
                        email: 'pepe@mail.com',
                        group: 'Member',
                    },
                    title: 'A title',
                    body: 'lorem ipsum',
                    tags: [{value: 'tag', visualName: 'Tag'}],
                    likes: 0,
                    comments: [],
                    timeStamp: Date.now()
                }
            ];
        } catch (error) {
            throw new Error(error);
        }
    };

    async createPost(postData: CreatePostReq): Promise<PostRes> {
        try {
            // TODO create post on db and make PostRes from that
            return {
                id: 'ABC123',
                status: postData.status,
                author: postData.author,
                title: postData.title,
                summary: postData.summary,
                featuredImage: postData.featuredImage,
                body: postData.body,
                tags: postData.tags.map(t => ({value:t.value, visualName: t.visualName || t.value})),
                likes: 0,
                comments: [],
                timeStamp: Date.now()
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    async updatePost(postId: string, postData: UpdatePostReq): Promise<PostRes> {
        try {
            // TODO retrieve post from db, update fields and create PostRes
            return {
                id: postId, // required
                // these come from req
                status: postData.status,
                title: postData.title,
                summary: postData.summary,
                featuredImage: postData.featuredImage,
                body: postData.body,
                tags: postData.tags.map(t => ({value:t.value, visualName: t.visualName || t.value})),
                // These will be retrieved from db
                author: {
                    id: 'AAB123',
                    name: 'pepe',
                    email: 'pepe@mail.com',
                    group: 'Member',
                },
                likes: 0,
                comments: [],
                timeStamp: Date.now()
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    async deletePost(postId: string): Promise<void> {
        try {
            // TODO recover post, if it exists
            console.log(postId);
            // TODO set post.status to 'Deleted'
        } catch (error) {
            throw new Error(error);
        }
    };

    async createComment(postId: string, commentData: CreateCommentReq): Promise<CommentRes> {
        try {
            // TODO find post with id or throw error
            // TODO create comment on db and make CommentRes from that
            return {
                id: 'cmnt0001',
                author: {
                    id: 'abc001',
                    name: 'pepe',
                    email: 'pepe@mail.com',
                    group: 'Member',
                },
                body: 'this is a test',
                likes: 0,
                status: 'Pending',
                timeStamp: Date.now()
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    async updateComment({body, status}: UpdateCommentReq): Promise<CommentRes> {
        try {
            // TODO find comment on db and make CommentRes from that
            return {
                id: 'cmnt0001',
                author: {
                    id: 'abc001',
                    name: 'pepe',
                    email: 'pepe@mail.com',
                    group: 'Member',
                },
                likes: 0,
                timeStamp: Date.now(),
                body,
                status,
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    async deleteComment(commentId: string): Promise<void> {
        // TODO find the comment by id or throw an error
        // TODO change the state to 'Deleted'
    };
};

export default new BlogService();