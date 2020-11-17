import {Body, Controller, Get, Post, ValidationPipe} from '@nestjs/common';
import {AppService} from "./app.service";
import {ContactUsDto} from "./contact-us.dto";

@Controller()
export class AppController {
    constructor(private appService: AppService) {
    }

    @Get('api')
    getHello() {
        return {message: "Welcome to Itihas API!"}
    }

    @Post('api/contact-us')
    contactUs(@Body(ValidationPipe) contactUsDto: ContactUsDto) {
        return this.appService.contactUs(contactUsDto)
    }
}
