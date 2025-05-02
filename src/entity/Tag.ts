import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Tag {
    @PrimaryColumn()
    value!: string;

    @Column()
    visualName!: string;

    @ManyToMany(() => Post, post => post.tags)
    posts!: Post[];
}
