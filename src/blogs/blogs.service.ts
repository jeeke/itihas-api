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
        if (t) return t.blogs;
        else return [];
    }

    async getAllComments(blogId: number) {
        const blog = await Blog.findOne({
            where: {
                id: blogId
            },
            relations: ["comments"]
        })
        blog.comments.forEach(c => {
            c['name'] = c.user.name
            delete c.user
        });
        return blog.comments
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
        await c.save()
        c['name'] = c.user.name
        delete c.user
        delete c.blog
        return c
    }

    async createBlog(user: User, createBlogDto: CreateBlogDto) {
        const {title, body, author, image, tags} = createBlogDto
        if (user.user_type === UserType.Admin) {
            const blog = new Blog()
            blog.title = title
            blog.body = body
            blog.author = author
            blog.image = image
            blog.tags = await this.getAllTags(tags)
            await blog.save()
        } else throw new UnauthorizedException()
    }

    async updateBlog(user: User, updateBlogDto: CreateBlogDto) {
        if (!updateBlogDto.id) throw new BadRequestException("ID of the blog required!")
        const {title, body, author, image, tags} = updateBlogDto
        if (user.user_type === UserType.Admin) {
            const blog = await Blog.findOne({
                where: {
                    id: updateBlogDto.id
                }
            })
            blog.title = title
            blog.body = body
            blog.author = author
            blog.image = image
            blog.tags = await this.getAllTags(tags)
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

        return alreadyAvailableTags.concat(newTags)
    }
}
