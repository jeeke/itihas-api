import {INestApplication} from "@nestjs/common";
import {Database, Resource} from "admin-bro-typeorm";

import AdminBro from "admin-bro";

import * as AdminBroExpress from "admin-bro-expressjs";
import UserResource from "./resources/user.resource";
import {User} from "../entities/user.entity";
import * as bcrypt from "bcryptjs"
import {UserType} from "../auth/jwt-payload.interface";

export async function setupAdminPanel(app: INestApplication): Promise<void> {

    /**
     * Register TypeORM adapter for using
     */
    AdminBro.registerAdapter({Database, Resource});
    const adminBro = new AdminBro({
        resources: [UserResource],
        rootPath: "/admin"
    });

    const router = AdminBroExpress.buildRouter(adminBro);
    // const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    //     authenticate: async (username, password) => {
    //         const user = await User.findOne({
    //             where: {
    //                 email: username
    //             }
    //         })
    //         if (user && user.user_type === UserType.Admin) {
    //             const matched = await bcrypt.compare(password, user.hashed_password)
    //             if (matched ) {
    //                 return user
    //             }
    //         }
    //         return false
    //     },
    //     cookiePassword: 'sgf$^)#*VYEUIOW%_*45$#34va$^)dsgv43',
    // })
    app.use(adminBro.options.rootPath, router);

}
