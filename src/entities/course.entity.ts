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
        const u = await User.findOne({
            where: {
                id: user.id
            },
            relations: ["enrolled_courses"]
        });
        let enrolled = false;
        u.enrolled_courses.forEach(c => {
            if(c.id === this.id) enrolled = true;
        })
        return enrolled
    }
}
