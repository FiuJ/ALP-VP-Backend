import { Posts } from "@prisma/client";

export interface PostCreateRequest {
    post_name: string;
    post_description: string;
    post_photo: string;
    post_date: Date;
    post_likes: number;
    post_isLike: boolean;
    user_id: number;
    isPublic: boolean;
}

export interface PostResponse {
    post_id: number;
    post_name: string;
    post_description: string;
    post_photo: string;
    post_date: Date;
    post_likes: number;
    post_isLike: boolean;
    user_id: number;
    isPublic: boolean;
}

export function PostResponseList (posts: Posts[]): PostResponse[] {
    const result = posts.map((data) => {
        return {
            post_id: data.post_id,
            post_name: data.post_name,
            post_description: data.post_description,
            post_photo: data.post_photo,
            post_date: data.post_date,
            post_likes: data.post_likes,
            post_isLike: data.post_isLike,
            user_id: data.user_id,
            isPublic: data.isPublic,
        };
    });
    return result;
}

export function toPostResponse(post: Posts): PostResponse {
    return {
        post_id: post.post_id,
        post_name: post.post_name,
        post_description: post.post_description,
        post_photo: post.post_photo,
        post_date: post.post_date,
        post_likes: post.post_likes,
        post_isLike: post.post_isLike,
        user_id: post.user_id,
        isPublic: post.isPublic,
    };
}