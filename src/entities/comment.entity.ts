import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm/index";
import {Blog} from "./blog.entity";
import {User} from "./user.entity";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @ManyToOne(type => Blog, blog => blog.comments)
    blog: Blog

    @ManyToOne(type => User, {
        cascade: true,
        eager: true
    })
    user: User
}
