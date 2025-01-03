import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { Users_communityCreateRequest } from "../models/user_community-model";
import { UserCommunityService } from "../services/user-community-service";
import { Validation } from "../validation/validation";
import { UserCommunityValidation } from "../validation/user-community_validations";

export class UserCommunityController {

    static async createUserCommunity(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: Users_communityCreateRequest = req.body;
            const result = await UserCommunityService.createUserCommunity(req.user!, request);
            
            res.status(201).json({
                message: result
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllUserCommunities(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const result = await UserCommunityService.getAllUserCommunities();
            
            res.status(200).json({
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserCommunityById(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user_community_id = parseInt(req.params.id);
            const result = await UserCommunityService.getUserCommunityById(user_community_id);
            
            res.status(200).json({
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteUserCommunityById(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const user_community_id = parseInt(req.params.id);
            const result = await UserCommunityService.deleteUserCommunityById(user_community_id);
            
            res.status(200).json({
                message: result
            });
        } catch (error) {
            next(error);
        }
    }


}