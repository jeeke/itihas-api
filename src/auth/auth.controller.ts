import {Body, Controller, Get, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {SignupDto} from "./dto/signup.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller('/api')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("/login")
    login(@Body(ValidationPipe) loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post("/signup")
    signup(@Body(ValidationPipe) signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }
}
