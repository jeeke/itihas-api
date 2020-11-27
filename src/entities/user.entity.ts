import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique} from "typeorm/index";
import {Course} from "./course.entity";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    hashed_password: string;

    @Column()
    user_type: string;

    @ManyToMany(type => Course, course => course.users)
    @JoinTable()
    enrolled_courses: Course[]

}
