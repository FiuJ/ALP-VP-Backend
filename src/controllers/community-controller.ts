import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CommunityCreateRequest } from "../models/community-model";
import { CommunityService } from "../services/community-service";

export class CommunityController {

    // Create a new community
    static async createCommunity(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CommunityCreateRequest = req.body as CommunityCreateRequest;
            const response = await CommunityService.createCommunity(req.user!, request);
            res.status(201).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Get all communities
    static async getAllCommunities(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await CommunityService.getAllCommunities(req.user!);
            res.status(200).json({
                data: response 
            });
        } catch (error) {
            next(error);
        }
    }

    // Get a specific community by its ID
    static async getCommunity(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CommunityService.getCommunity(
                req.user!,
                Number(req.params.community_id)
            );
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    // Update an existing community
    static async updateCommunity(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CommunityCreateRequest = req.body as CommunityCreateRequest;
            const response = await CommunityService.updateCommunity(
                req.user!,
                Number(req.params.community_id),
                request
            );
            res.status(201).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    // Delete an existing community -> 
    // static async deleteCommunity(req: UserRequest, res: Response, next: NextFunction) {
    //     try {
    //         const response = await CommunityService.deleteCommunity(
    //             req.user!,
    //             Number(req.params.community_id)
    //         );
    //         res.status(200).json({
    //             data: response
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // Get all communities created by a specific user
    static async getAllCommunitiesByUserId(
        req: UserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await CommunityService.getAllCommunitiesByUserId(
                req.user!,
                Number(req.params.user_id)
            );
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

}
