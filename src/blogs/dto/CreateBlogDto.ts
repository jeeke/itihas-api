import {IsNotEmpty, IsString, IsUrl} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateBlogDto {

    @ApiPropertyOptional()
    id: number

    @ApiProperty()
    @IsUrl()
    image: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    body: string;

    @ApiPropertyOptional({
        description: "Pass array of strings after doing : array.join(',')"
    })
    @IsString()
    tags: string;

}
