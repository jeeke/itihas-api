import {Injectable} from '@nestjs/common';
import {Course} from "../entities/course.entity";
import {User} from "../entities/user.entity";

@Injectable()
export class CoursesService {

    getAllCourses() {
        return Course.find()
    }

    async getEnrolledCourses(user: User) {
        const u = await User.findOne({
            where: {
                id: user.id
            },
            relations: ['enrolled_courses']
        })
        return u.enrolled_courses
    }

    async getCourseDetails(user: User, courseId: number) {
        const c = await Course.findOne({
            where: {
                id: courseId
            },
            relations: ['videos']
        })
        const isEnrolled = await c.isEnrolled(user)
        if (!isEnrolled) {
            c.videos.forEach(v => delete v.video_url)
        }
        return c
    }

    async enrollInCourse(user: User, courseId: number) {
        const c = await Course.findOne({
            where: {
                id: courseId
            },
            relations: ['users']
        })
        c.users.push(user)
        await c.save()
    }
}
