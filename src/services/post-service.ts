import { Posts } from "@prisma/client";
import { Users } from "@prisma/client";
import { PostCreateRequest, PostResponse, PostResponseList, toPostResponse } from "../models/post-model";
import { PostValidation } from "../validation/post-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class PostService {

    // Create a new post
    static async createPost(
        user: Users,
        req: PostCreateRequest): Promise<string> {

        const postRequest = Validation.validate(
            PostValidation.CREATE,
            req
        );

        await prismaClient.posts.create({
            data: {
                post_name: postRequest.post_name,
                post_description: postRequest.post_description,
                post_photo: postRequest.post_photo,
                post_date: postRequest.post_date,
                post_likes: postRequest.post_likes,
                post_isLike: postRequest.post_isLike,
                user_id: postRequest.user_id,
                isPublic: postRequest.isPublic,
            }
        });

        return "Post created successfully";
    }

    // Get all posts
    static async getAllPosts(user: Users): Promise<PostResponse[]> {
        const posts = await prismaClient.posts.findMany();
        return PostResponseList(posts);
    }

    // Get a specific post by ID
    static async getPost(user: Users, postId: number): Promise<PostResponse> {
        const post = await prismaClient.posts.findUnique({
            where: {
                post_id: postId,
            },
        });
        
        if (!post) {
            throw new ResponseError(400, "Post not found");
        }

        return toPostResponse(post);
    }

    static async updatePost(user: Users, postId: number, req: PostCreateRequest): Promise<string> {
        const postUpdateRequest = Validation.validate(
            PostValidation.UPDATE,
            req
        );

        const post = await prismaClient.posts.findUnique({
            where: {
                post_id: postId,
            },
        });

        if (!post) {
            throw new ResponseError(400, "Post not found");
        }

        await prismaClient.posts.update({
            where: {
                post_id: postId,
            },
            data: {
                post_name: postUpdateRequest.post_name,
                post_description: postUpdateRequest.post_description,
                post_photo: postUpdateRequest.post_photo,
                post_date: postUpdateRequest.post_date,
                post_likes: postUpdateRequest.post_likes,
                post_isLike: postUpdateRequest.post_isLike,
                user_id: postUpdateRequest.user_id,
                isPublic: postUpdateRequest.isPublic,
            }
        });

        return "Post updated successfully";
    }

    static async deletePost(user: Users, postId: number): Promise<string> {
        const post = await prismaClient.posts.findUnique({
            where: {
                post_id: postId,
            },
        });

        if (!post) {
            throw new ResponseError(400, "Post not found"); 
        }
        
        await prismaClient.posts.delete({
            where: {
                post_id: postId,
            },
        });

        return "Post deleted successfully";
    }
}