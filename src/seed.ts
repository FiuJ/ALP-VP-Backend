import { PrismaClient } from "@prisma/client";
import { CourseValidation } from "./validation/course-validation";

const prisma = new PrismaClient();

async function main() {
    try {
        // Seed courses data with validation
        const coursesData = [
            {
                detail_course: "Introduction to Programming",
                photo_course: "https://example.com/image1.jpg",
                course_duration: 10,
                community_id: 1
            },
            {
                detail_course: "Advanced Algorithms",
                photo_course: "https://example.com/image2.jpg",
                course_duration: 15,
                community_id: 2
            },
            {
                detail_course: "Web Development",
                photo_course: "https://example.com/image3.jpg",
                course_duration: 20,
                community_id: 3
            }
        ];

        // Validate and insert courses
        for (const course of coursesData) {
            const validatedCourse = CourseValidation.CREATE.parse(course);
            await prisma.courses.create({ data: validatedCourse });
        }

        console.log("Courses seeded successfully");

    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
