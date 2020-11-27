import {ResourceWithOptions} from "admin-bro";
import {Blog} from "../../entities/blog.entity";
import {Course} from "../../entities/course.entity";

const CourseResource: ResourceWithOptions = {
    resource: Course,
    options: {},
};

export default CourseResource;
