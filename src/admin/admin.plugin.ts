import {INestApplication} from "@nestjs/common";
import {Database, Resource} from "admin-bro-typeorm";

import AdminBro from "admin-bro";

import * as AdminBroExpress from "admin-bro-expressjs";
import * as bcrypt from "bcryptjs"
import UserResource from "./resources/user.resource";
import BookResource from "./resources/book.resource";
import BlogResource from "./resources/blog.resource";
import CommentResource from "./resources/comment.resource";
import ContactFormResource from "./resources/contact-form.resource";
import CourseResource from "./resources/course.resource";
import CourseVideoResource from "./resources/course_video.resource";
import TagResource from "./resources/tag.resource";
import {User} from "../entities/user.entity";
import {UserType} from "../auth/jwt-payload.interface";

export async function setupAdminPanel(app: INestApplication): Promise<void> {

    /**
     * Register TypeORM adapter for using
     */
    AdminBro.registerAdapter({Database, Resource});
    const adminBro = new AdminBro({
        resources: [
            BlogResource,
            BookResource,
            CommentResource,
            ContactFormResource,
            CourseResource,
            CourseVideoResource,
            // TagResource,
            UserResource
        ],
        rootPath: "/admin"
    });

    // const router = AdminBroExpress.buildRouter(adminBro);
    const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
        authenticate: async (username, password) => {
            const user = await User.findOne({
                where: {
                    email: username
                }
            })
            if (user && user.user_type === UserType.Admin) {
                const matched = await bcrypt.compare(password, user.hashed_password)
                if (matched) {
                    return user
                }
            }
            return false
        },
        cookiePassword: 'sgf$^)#*VYEUIOW%_*45$#34va$^)dsgv43',
    })
    app.use(adminBro.options.rootPath, router);

}
