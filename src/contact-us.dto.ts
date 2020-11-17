import {IsEmail, IsPhoneNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm/index";

export class ContactUsDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    subject: string;

    @ApiProperty()
    @IsString()
    body: string;

}
