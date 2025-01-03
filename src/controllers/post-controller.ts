import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { PostCreateRequest, PostResponse, PostResponseList } from "../models/post-model";
import { PostService } from "../services/post-service";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class PostController {

    //Create a new post
    static async createPost(req: UserRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: PostCreateRequest = req.body as PostCreateRequest;
            const response = await PostService.createPost(req.user!, request);
            res.status(201).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    //Get all posts
    static async getAllPosts(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await PostService.getAllPosts(req.user!);
            res.status(200).json({
                data: response 
            });
        } catch (error) {
            next(error);
        }
    }

    //Get a post by id
    static async getPost(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const postId = parseInt(req.params.postId);
            const response = await PostService.getPost(req.user!, postId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    //Update a post by id
    static async updatePost(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const postId = parseInt(req.params.postId);
            const request: PostCreateRequest = req.body as PostCreateRequest;
            const response = await PostService.updatePost(req.user!, postId, request);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    //Delete a post by id
    static async deletePost(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const postId = parseInt(req.params.postId);
            const response = await PostService.deletePost(req.user!, postId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    //Get all posts by user id
    static async getAllPostsByUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId);
            const response = await PostService.getAllPostsByUser(req.user!, userId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    //Get all public posts
    static async getAllPostIsPublic(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await PostService.getAllPostIsPublic(req.user!);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

}