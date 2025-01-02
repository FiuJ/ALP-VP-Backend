import { Users } from "@prisma/client";
import { Communities } from "@prisma/client";
import { CommunityCreateRequest, CommunityResponse, CommunityResponseList, toCommunityResponse } from "../models/community-model";
import { CommunityValidation } from "../validation/community-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";


export class CommunityService {

    // Create a new community
    static async createCommunity(
        user: Users, 
        req: CommunityCreateRequest, 
    ): Promise<string> {

        const communityRequest = Validation.validate(
            CommunityValidation.CREATE,
            req,
        );

        // Add the community to the database
        await prismaClient.communities.create({
            data: {
                name: communityRequest.name,
                description: communityRequest.description,
                photo: communityRequest.photo,
            }
        });

        return "Community created successfully";

    }

    // Get all communities //////////////////////////////////////////////////////////////////////////////
    // PERLUKAH parameter user: Users?
    static async getAllCommunities(user: Users): Promise<CommunityResponse[]> {
        const communities = await prismaClient.communities.findMany();    
        return CommunityResponseList(communities);
    }

    // Get a specific community
    static async getCommunity(user: Users, community_id: number): Promise<CommunityResponse> {
        const community = await prismaClient.communities.findUnique({
            where: {
                community_id: community_id,
            }
        });
        if (!community) {
            throw new ResponseError(404, "Community not found");
        }
        return toCommunityResponse(community);
    }


    // Update a specific community
    static async updateCommunity(
        user: Users, 
        community_id: number, 
        req: CommunityCreateRequest, 
    ): Promise<string> {
        const communityUpdateRequest = Validation.validate(
            CommunityValidation.CREATE,
            req
        );

        const community = await prismaClient.communities.findUnique({
            where: {
                community_id: community_id,
            }
        });
        if (!community) {
            throw new ResponseError(404, "Community not found");
        }

        // Update the community in the database
        await prismaClient.communities.update({
            where: {
                community_id: community_id,
            },
            data: {
                name: communityUpdateRequest.name,
                description: communityUpdateRequest.description,
                photo: communityUpdateRequest.photo,
            }
        });

        return "Community updated successfully";

    }

    //Delete Community perlu? krn community depend on courses

    // Delete a specific community
    // static async deleteCommunity(community_id: number): Promise<string> {
    //     const community = await prismaClient.communities.findUnique({
    //         where: {
    //             community_id: community_id,
    //         }
    //     });
    //     if (!community) {
    //         throw new ResponseError(404, "Community not found");
    //     }

    //     // Delete the community from the database
    //     await prismaClient.communities.delete({
    //         where: {
    //             community_id: community_id,
    //         }
    //     });

    //     return "Community deleted successfully";
    // }

}

