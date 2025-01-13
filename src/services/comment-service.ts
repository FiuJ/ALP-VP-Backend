import { Comments } from "@prisma/client";
import { Users } from "@prisma/client";
import { CommentCreateRequest,  CommentResponse, CommentResponseList } from "../models/comment-model";
import { CommentValidation } from "../validation/comment-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class CommentService {

    // Create a new comment
    static async createComment(
        user: Users,
        req: CommentCreateRequest
    ): Promise<string> {

        const commentRequest = Validation.validate(
            CommentValidation.CREATE,
            req
        );  

        await prismaClient.comments.create({
            data: {
                comment: commentRequest.comment,
                comment_date: commentRequest.comment_date,
                user_id: user.user_id,
                post_id: commentRequest.post_id
            }
        });

        return "Comment created successfully";
    }

    // static async getAllComments(user: Users): Promise<CommentResponse[]> {
    //     const comments = await prismaClient.comments.findMany();
    //     return CommentResponseList(comments);
    // }

    static async getAllCommentsByPostId(user: Users, post_id: number): Promise<CommentResponse[]> {
        const comments = await prismaClient.comments.findMany({
            where: {
                post_id,
            },
            include: {
                user: { // Fetch the user relation
                    select: {
                        username: true, // Only fetch the username
                    },
                },
            },
        });
        return CommentResponseList(comments);
    }
    

}