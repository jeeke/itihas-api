import {ResourceWithOptions} from "admin-bro";
import {User} from "../../entities/user.entity";
import * as bcrypt from "bcryptjs"
import {UserType} from "../../auth/jwt-payload.interface";
import {Book} from "../../entities/book.entity";

const BookResource: ResourceWithOptions = {
    resource: Book,
    options: {},
};

export default BookResource;
