import { Users } from "@prisma/client"


export interface RegisterUserRequest{
    username: string
    email: string 
    password: string
}

export interface  UserResponse{
    id: number
    token?: String
    username : String
    user_id: number
}

export interface LoginUserRequest{
    email: string 
    password: string
}

// export function 
export const toUserResponse = (user: Users): UserResponse => {
    return {
        id: user.user_id,
        token:user.token?? "",
        username: user.username,
        user_id: user.user_id
    }
}