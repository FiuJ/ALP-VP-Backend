import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CommentCreateRequest } from "../models/comment-model";
import { CommentService } from "../services/comment-service";

export class CommentController {

    // Create a new comment
    static async createComment(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: CommentCreateRequest = req.body as CommentCreateRequest;
            const response = await CommentService.createComment(req.user!, request);
            res.status(201).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Get all comments
    static async getAllComments(
        req: UserRequest, 
        res: Response, 
        next: NextFunction){
        try {
            const response = await CommentService.getAllComments(req.user!);
            res.status(200).json({ 
                data: response 
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all comments by post ID
    static async getAllCommentsByPostId(
        req: UserRequest, 
        res: Response, 
        next: NextFunction){
        try {
            const post_id = parseInt(req.params.post_id);
            const response = await CommentService.getAllCommentsByPostId(req.user!, post_id);
            res.status(200).json({ 
                data: response 
            });
        } catch (error) {
            next(error);
        }
    }

}