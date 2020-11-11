import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayload} from "./jwt-payload.interface";
import * as config from "config";
import {User} from "../entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        // @InjectRepository(StudentRepository)
        // private studentRepository: StudentRepository,
        // @InjectRepository(AgentRepository)
        // private agentRepository: AgentRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get("jwt.secret")
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {email} = payload;
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if(user) return user;
        else throw new UnauthorizedException()
    }

}