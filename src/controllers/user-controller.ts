import { NextFunction, Request, Response } from "express";
import { LoginUserRequest, RegisterUserRequest, UserResponse } from "../models/user-model";
import { UserService } from "../services/auth-service";
import { UserRequest } from "../types/user-request";

export class UserController{
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: UserResponse = await UserService.register(request)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            // ini pass error ke middleware
            next(error)
        }

    }


    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response: UserResponse = await UserService.login(request)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            // ini pass error ke middleware
            next(error)
        }

    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.logout(req.user!)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            // ini pass error ke middleware
            next(error)
        }

    }
    
    static async getUserIdFromToken(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization;   // Extract token from header
            if (!token) {
                throw new Error("Token not provided");
            }

            const userId = await UserService.getUserIdFromToken(token);

            res.status(200).json({
                data: { userId },
            });
        } catch (error) {
            next(error); // Pass error to error-handling middleware
        }
    }

    static async emergencyLogout(req: Request, res: Response, next: NextFunction) {
        try {
            const { user_id } = req.body;  // Assuming user_id is provided in the request body
            if (!user_id) {
                throw new Error("User ID is required");
            }
    
            const response = await UserService.emergencyLogout(Number(user_id));
            res.status(200).json({ message: response });
        } catch (error) {
            next(error);
        }
    }
}