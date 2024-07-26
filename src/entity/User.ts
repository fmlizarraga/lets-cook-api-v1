import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { UserGroupTypes, UserGroupValues } from "../interfaces/auth";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: UserGroupValues, default: UserGroupValues.Member })
    group: UserGroupTypes;

    @Column()
    email: string;

    @Column({ nullable: true })
    picture?: string;

    @OneToMany(() => Post, post => post.author)
    posts: Post[];

    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[];
}
