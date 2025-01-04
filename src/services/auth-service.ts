import { Users } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { LoginUserRequest, RegisterUserRequest, toUserResponse, UserResponse } from "../models/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export class UserService {
    static async register(
        req: RegisterUserRequest
    ): Promise<UserResponse> {

        const registerReq = Validation.validate(
            UserValidation.REGISTER,
            req
        )

        const email = await prismaClient.users.findFirst({
            where: {
                email: registerReq.email
            },
        })

        if (email) {
            throw new ResponseError(400, "Email")
        }

        registerReq.password = await bcrypt.hash(registerReq.password, 10)

        const user = await prismaClient.users.create({
            data: {
                username: registerReq.username,
                email: registerReq.email,
                password: registerReq.password,
                token: uuid(),
                photo_workout: "", 
                course_counter: 0, 
                performance: 0,    
            }
        })

        return toUserResponse(user)
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)
        let user = await prismaClient.users.findFirst({
            where: {
                email: loginRequest.email
            },
        })

        if (!user) {
            throw new ResponseError(400, "Invalid email or password")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )
        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password")
        }

        user = await prismaClient.users.update({
            where: {
                user_id: user.user_id,
            },
            data: {
                token: uuid()
            },
        })

        const response = toUserResponse(user)
        return response
    }

    static async logout(user: Users): Promise<String> {
        await prismaClient.users.update({
            where: {
                user_id: user.user_id,
            },
            data: {
                token: null
            },
        })
        return "Logged out successfully"
    }
}


