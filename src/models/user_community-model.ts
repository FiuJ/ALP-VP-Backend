import { Users_community } from "@prisma/client";

export interface Users_communityCreateRequest {
    user_id: number;
    community_id: number;
}

export interface Users_communityResponse {
    user_community_id: number;
    user_id: number;
    community_id: number;
}

export function toUsers_communityResponse(user_community: Users_community): Users_communityResponse {
    return {
        user_community_id: user_community.user_community_id,
        user_id: user_community.user_id,
        community_id: user_community.community_id,
    };
}