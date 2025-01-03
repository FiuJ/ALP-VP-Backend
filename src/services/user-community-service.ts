import { Users_community } from "@prisma/client";
import { Users } from "@prisma/client";
import { Users_communityResponse, Users_communityCreateRequest, toUsers_communityResponse } from "../models/user_community-model";
import { UserCommunityValidation } from "../validation/user-community_validations";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class UserCommunityService {

    // Create a new user_community
    static async createUserCommunity(
        user: Users,
        req: Users_communityCreateRequest): Promise<string> {
        
        const userCommunityRequest = Validation.validate(
            UserCommunityValidation.CREATE,
            req
        );

        await prismaClient.users_community.create({
            data: {
                user_id: user.user_id,
                community_id: userCommunityRequest.community_id,
            }
        });

        return "User Community created successfully";
    }

    // Get all user_communities
    static async getAllUserCommunities(): Promise<Users_communityResponse[]> {
        const user_communities = await prismaClient.users_community.findMany();
        return user_communities.map(toUsers_communityResponse);
    }

    // Get a user_community by id
    static async getUserCommunityById(
        user_community_id: number): Promise<Users_communityResponse> {
        const user_community = await prismaClient.users_community.findUnique({
            where: {
                user_community_id: user_community_id,
            }
        });
        if (!user_community) {
            throw new ResponseError(404, "User Community not found");
        }
        return toUsers_communityResponse(user_community);
    }

    // Delete a user_community by id
    static async deleteUserCommunityById(
        user_community_id: number): Promise<string> {
        const user_community = await prismaClient.users_community.findUnique({
            where: {
                user_community_id: user_community_id,
            }
        });
        if (!user_community) {
            throw new ResponseError(404, "User Community not found");
        }
        await prismaClient.users_community.delete({
            where: {
                user_community_id: user_community_id,
            }
        });
        return "User Community deleted successfully";
        }
    

}