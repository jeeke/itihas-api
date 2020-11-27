import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateBlogDto {

    @ApiPropertyOptional()
    id: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    body: string;

    @ApiProperty()
    @IsString()
    tags: string;

}
