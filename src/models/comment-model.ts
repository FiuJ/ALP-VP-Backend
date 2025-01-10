import { Comments } from "@prisma/client";

export interface CommentCreateRequest {
    comment: string;
    comment_date: string;
    user_id: number;
    post_id: number;
}

export interface CommentResponse {
    comment_id: number;
    comment: string;
    comment_date: string;
    user_id: number;
    post_id: number;
}

export function CommentResponseList(comments: Comments[]): CommentResponse[] {
    const result = comments.map((data) => {
        return {
            comment_id: data.comment_id,
            comment: data.comment,
            comment_date: data.comment_date,
            user_id: data.user_id,
            post_id: data.post_id,
        };
    });
    return result;
}