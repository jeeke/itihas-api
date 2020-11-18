import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {User} from "../entities/user.entity";
import {JwtPayload, UserType} from "./jwt-payload.interface";
import {LoginDto} from "./dto/login.dto";
import {SignupDto} from "./dto/signup.dto";
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService
    ) {
    }

    async login(loginDto: LoginDto): Promise<any> {
        const user = await User.findOne({
            where: {
                email: loginDto.email
            }
        });
        if (user) {
            const matched = await bcrypt.compare(loginDto.password, user.hashed_password)
            if (matched) {
                const {hashed_password, ...r} = user
                const payload: JwtPayload = {email: loginDto.email};
                const token = await this.jwtService.sign(payload);
                return {...r, token};
            } else throw new ConflictException("Wrong Credentials!")
        } else throw new NotFoundException();
    }

    async signup(signupDto: SignupDto) {
        const user = new User();
        const {name, email, phone, country, city, password} = signupDto
        user.user_type = UserType.Customer
        user.name = name
        user.phone = phone
        user.email = email
        user.city = city
        user.country = country
        user.hashed_password = await bcrypt.hash(password, 10)
        // user.hashed_password = password

        try {
            await user.save();
        } catch (e) {
            throw new ConflictException("Email already used, Please LogIn!")
        }

        const payload: JwtPayload = {email};
        const token = await this.jwtService.sign(payload);
        return {token}
    }

}
