import {Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CoursesService} from "./courses.service";
import {JwtAuthGuard, OptionalJwtAuthGuard} from "../auth/jwt-auth.guard";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../entities/user.entity";
import {ApiBearerAuth} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";

@Controller('courses')
export class CoursesController {
    constructor(private courseService: CoursesService) {
    }

    @Get('/')
    getAllCourses() {
        return this.courseService.getAllCourses()
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/enrolled')
    getEnrolledCourses(@GetUser() user: User) {
        return this.courseService.getEnrolledCourses(user)
    }

    @UseGuards(OptionalJwtAuthGuard)
    @ApiBearerAuth()
    @Get('/:course_id')
    getCourseDetails(@GetUser() user: User, @Param('course_id') id: number) {
        return this.courseService.getCourseDetails(user, id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('/:course_id/enroll')
    enrollInCourse(@GetUser() user: User, @Param('course_id') id: number) {
        return this.courseService.enrollInCourse(user, id)
    }
}
