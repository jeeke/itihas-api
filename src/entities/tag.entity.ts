import {BaseEntity, Entity, ManyToMany, PrimaryColumn} from "typeorm/index";
import {Blog} from "./blog.entity";

@Entity()
export class Tag extends BaseEntity {

    @PrimaryColumn()
    title: string;

    @ManyToMany(type => Blog, blog => blog.tags)
    blogs: Blog[]

}
