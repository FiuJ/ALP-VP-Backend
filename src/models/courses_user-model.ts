import { Courses_Users } from "@prisma/client";

export interface CoursesUsersCreateRequest {
    isDone: boolean;
    user_id: number;
    course_id: number;
}

export interface CoursesUsersResponse {
    course_user_id: number;
    isDone: boolean;
    user_id: number;
    course_id: number;
}

export function Courses_UsersResponseList(coursesUsers: Courses_Users[]): CoursesUsersResponse[] {
    const result = coursesUsers.map((data) => ({
        course_user_id: data.course_user_id,
        isDone: data.isDone,
        user_id: data.user_id,
        course_id: data.course_id
    }));
    
    return result;
}

export function toCourses_UsersResponse(coursesUser: Courses_Users): CoursesUsersResponse {
    return {
        course_user_id: coursesUser.course_user_id,
        isDone: coursesUser.isDone,
        user_id: coursesUser.user_id,
        course_id: coursesUser.course_id
    };
}
