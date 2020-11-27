import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Blog} from "../entities/blog.entity";
import {User} from "../entities/user.entity";
import {CreateBlogDto} from "./dto/CreateBlogDto";
import {UserType} from "../auth/jwt-payload.interface";
import {Tag} from "../entities/tag.entity";
import {In} from "typeorm/index";
import {Comment} from "../entities/comment.entity";
import {CreateCommentDto} from "./dto/CreateCommentDto";

@Injectable()
export class BlogsService {

    getAllBlogs() {
        return Blog.find()
    }

    async getBlogsByTag(tag: string) {
        const t = await Tag.findOne({
            where: {
                title: tag
            },
            relations: ['blogs']
        })
        return t.blogs;
    }

    async getAllComments(blogId: number) {
        const blog = await Blog.findOne({
            where: {
                id: blogId
            },
            relations: ["comments"]
        })
        return blog.comments;
    }

    async createComment(user: User, blogId: number, createCommentDto: CreateCommentDto) {
        const c = new Comment()
        c.body = createCommentDto.comment_body
        c.user = user
        c.blog = await Blog.findOne({
            where: {
                id: blogId
            }
        })
        return c.save()
    }

    async createBlog(user: User, createBlogDto: CreateBlogDto) {
        if (user.user_type === UserType.Admin) {
            const blog = new Blog()
            blog.title = createBlogDto.title
            blog.body = createBlogDto.body
            blog.tags = await this.getAllTags(createBlogDto.tags)
            await blog.save()
        } else throw new UnauthorizedException()
    }

    async updateBlog(user: User, updateBlogDto: CreateBlogDto) {
        if (!updateBlogDto.id) throw new BadRequestException("ID of the blog required!")
        if (user.user_type === UserType.Admin) {
            const blog = await Blog.findOne({
                where: {
                    id: updateBlogDto.id
                }
            })
            blog.title = updateBlogDto.title
            blog.body = updateBlogDto.body
            blog.tags = await this.getAllTags(updateBlogDto.tags)
            await blog.save()
        } else throw new UnauthorizedException()
    }

    async getAllTags(tParam: string) {
        const tString: string[] = tParam.split(',');
        tString.forEach((tag, index) => {
            tString[index] = tag.toLowerCase()
        });
        const alreadyAvailableTags = await Tag.find({
            where: {
                title: In(tString)
            }
        })
        const alreadyAvailableTagStrings = alreadyAvailableTags.map(t => t.title)
        const newTagString = tString.filter(t => alreadyAvailableTagStrings.includes(t) === false)
        const newTags = newTagString.map(t => {
            const tag = new Tag()
            tag.title = t
            return tag
        })

        await Tag.save(newTags)
        return alreadyAvailableTags.concat(newTags)
    }
}
