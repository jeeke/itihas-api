import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm/index";
import {User} from "./user.entity";
import {CourseVideo} from "./course_video.entity";

@Entity()
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    title: string;

    @Column()
    des: string;

    @Column()
    price: number;

    @ManyToMany(type => User, user => user.enrolled_courses)
    users: User[]

    @OneToMany(type => CourseVideo, video => video.course)
    @JoinTable()
    videos: CourseVideo[]

    async isEnrolled(user: User) {
        const isEnrolled = await User.createQueryBuilder("course")
            .leftJoinAndSelect("course.user", "user")
            .where("user.id = :userId", {userId: user.id})
            .getCount()

        return Boolean(isEnrolled)
    }
}
