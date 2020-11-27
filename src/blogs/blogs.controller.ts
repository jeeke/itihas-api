import {Body, Controller, Get, Param, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {BlogsService} from "./blogs.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../entities/user.entity";
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {CreateCommentDto} from "./dto/CreateCommentDto";

@Controller('blogs')
export class BlogsController {

    constructor(private blogsService: BlogsService) {
    }

    @Get('/')
    getAllBlogs() {
        return this.blogsService.getAllBlogs()
    }

    @Get('/tags/:id')
    getBlogsByTagId(@Param('id') tagId: number) {
        return this.blogsService.getBlogsByTagId(tagId)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/new')
    createBlog(@GetUser() user: User, @Body(ValidationPipe) createBlogDto: CreateBlogDto) {
        return this.blogsService.createBlog(user, createBlogDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('edit')
    editBlog(@GetUser() user: User, @Body(ValidationPipe) updateBlogDto: CreateBlogDto) {
        return this.blogsService.updateBlog(user, updateBlogDto)
    }

    @Get('/:id/comments')
    getAllComments(@Param('id') blogId: number) {
        return this.blogsService.getAllComments(blogId)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/:id/comments')
    createComment(@GetUser() user: User, @Param('id') blogId: number, @Body(ValidationPipe) createCommentDto: CreateCommentDto) {
        return this.blogsService.createComment(user, blogId, createCommentDto)
    }
}
