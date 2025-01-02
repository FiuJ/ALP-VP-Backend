import { Communities } from "@prisma/client";

export interface CommunityCreateRequest {
    name: string;
    description: string;
    photo: string;
}

export interface CommunityResponse {
    community_id: number;
    name: string;
    description: string;
    photo: string;
}

export function CommunityResponseList(community: Communities[]): CommunityResponse[] {
    const result = community.map((data) => {
        return {
            community_id: data.community_id,
            name: data.name,
            description: data.description,
            photo: data.photo,
        };
    });
    return result;
}

export function toCommunityResponse(community: Communities): CommunityResponse {
    return {
        community_id: community.community_id,
        name: community.name,
        description: community.description,
        photo: community.photo,
    };
}