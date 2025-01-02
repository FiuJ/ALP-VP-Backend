import { Courses } from "@prisma/client";

// Interface for creating a new course request
export interface CourseCreateRequest {
    detail_course: string;
    photo_course: string;
    course_duration: number;
    community_id: number;
}

// Interface for the response from the API after course creation
export interface CourseResponse {
    course_id: number;
    detail_course: string;
    photo_course: string;
    course_duration: number;
    community_id: number;
}

// Function to transform a list of Courses to CourseResponse
export function CourseResponseList(courses: Courses[]): CourseResponse[] {
    const result = courses.map((data) => {
        return {
            course_id: data.course_id,
            detail_course: data.detail_course,
            photo_course: data.photo_course,
            course_duration: data.course_duration,
            community_id: data.community_id
        };
    });
    return result;
}

// Function to transform a single Course to CourseResponse
export function toCourseResponse(course: Courses): CourseResponse {
    return {
        course_id: course.course_id,
        detail_course: course.detail_course,
        photo_course: course.photo_course,
        course_duration: course.course_duration,
        community_id: course.community_id,
    };
}