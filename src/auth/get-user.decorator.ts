import {createParamDecorator} from "@nestjs/common";
import {User} from "../entities/user.entity";

export const GetUser = createParamDecorator(async (data, ctx): Promise<User> => {
    return ctx.switchToHttp().getRequest().user;
});
