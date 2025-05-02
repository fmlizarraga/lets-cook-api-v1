import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { PostStatus, StatusValues } from "../interfaces/blog";
import { Post } from "./Post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    body!: string;

    @Column('int', { default: 0 })
    likes!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timeStamp!: Date;

    @Column({ type: 'enum', enum: StatusValues, default: StatusValues.Pending })
    status!: PostStatus;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'authorId' })
    author!: User;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'postId' })
    post!: Post;
}
