import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm/index";
import {Course} from "./course.entity";

@Entity()
export class CourseVideo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    title: string;

    @Column()
    duration: string;

    @Column()
    video_url: string;

    @ManyToOne(type => Course, course => course.videos)
    course: Course

}
