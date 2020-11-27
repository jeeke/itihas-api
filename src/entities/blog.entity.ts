import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm/index";
import {Tag} from "./tag.entity";
import {Comment} from "./comment.entity";

@Entity()
export class Blog extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    title: string;

    @Column()
    body: string;

    @ManyToMany(() => Tag, tag => tag.blogs, {
        eager: true,
        cascade: true
    })
    @JoinTable()
    tags: Tag[];

    @OneToMany(type => Comment, comment => comment.blog)
    @JoinTable()
    comments: Comment[]

}
