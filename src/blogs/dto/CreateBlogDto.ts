import {IsNotEmpty, IsString} from "class-validator";

export class CreateBlogDto {

    id: number

    @IsString()
    @IsNotEmpty()
    title: string;


    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    tags: string;

}
