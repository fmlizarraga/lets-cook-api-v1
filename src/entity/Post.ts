import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { PostStatus, StatusValues } from "../interfaces/blog";
import { Tag } from "./Tag";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    summary?: string;

    @Column({ nullable: true })
    featuredImage?: string;

    @Column('text')
    body: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timeStamp: Date;

    @Column('int', { default: 0 })
    likes: number;

    @Column({ type: 'enum', enum: StatusValues, default: StatusValues.Pending })
    status: PostStatus;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'authorId' })
    author: User;

    @ManyToMany(() => Tag, tag => tag.posts, { cascade: true })
    @JoinTable({
        name: 'post_tags',
        joinColumn: {
            name: 'postId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'tagValue',
            referencedColumnName: 'value'
        }
    })
    tags: Tag[];
}
