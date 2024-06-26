import {Body, Controller, Get, Param, Post, Query, UseGuards, ValidationPipe} from '@nestjs/common';
import {BlogsService} from "./blogs.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../entities/user.entity";
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {CreateCommentDto} from "./dto/CreateCommentDto";
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('blogs')
export class BlogsController {

    constructor(private blogsService: BlogsService) {
    }

    @ApiImplicitQuery({
        name: "tag",
        description: "filter blogs by tags",
        required: false,
        type: String
    })
    @Get('/')
    getAllBlogs(@Query('tag') tag: string) {
        if (tag) return this.blogsService.getBlogsByTag(tag)
        return this.blogsService.getAllBlogs()
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('/new')
    createBlog(@GetUser() user: User, @Body(ValidationPipe) createBlogDto: CreateBlogDto) {
        return this.blogsService.createBlog(user, createBlogDto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('edit')
    editBlog(@GetUser() user: User, @Body(ValidationPipe) updateBlogDto: CreateBlogDto) {
        return this.blogsService.updateBlog(user, updateBlogDto)
    }

    @Get('/:blog_id/comments')
    getAllComments(@Param('blog_id') blogId: number) {
        return this.blogsService.getAllComments(blogId)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('/:blog_id/comments')
    createComment(@GetUser() user: User, @Param('blog_id') blogId: number, @Body(ValidationPipe) createCommentDto: CreateCommentDto) {
        return this.blogsService.createComment(user, blogId, createCommentDto)
    }
}
