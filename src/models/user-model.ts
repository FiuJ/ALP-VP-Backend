import { Users } from "@prisma/client"


export interface RegisterUserRequest{
    username: string
    email: string 
    password: string
}

export interface  userResponse{
    token?: String
    username : String
}

export interface LoginUserRequest{
    email: string 
    password: string
}

// export function 
export const toUserResponse = (user: Users): userResponse => {
    return {
        token:user.token?? "",
        username: user.username
    }
}