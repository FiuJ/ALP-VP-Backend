import { PrismaClient } from "@prisma/client";
import { CourseValidation } from "./validation/course-validation";

const prisma = new PrismaClient();

async function seedCourses() {
  const coursesData = [
    {
      detail_course: "Introduction to Programming",
      photo_course: "https://example.com/image1.jpg",
      course_duration: 10,
      community_id: 1,
    },
    {
      detail_course: "Advanced Algorithms",
      photo_course: "https://example.com/image2.jpg",
      course_duration: 15,
      community_id: 2,
    },
    {
      detail_course: "Web Development",
      photo_course: "https://example.com/image3.jpg",
      course_duration: 20,
      community_id: 3,
    },
  ];

  for (const course of coursesData) {
    try {
      // Validate the course data
      const validatedCourse = CourseValidation.CREATE.parse(course);

      // Insert the validated data into the database
      await prisma.courses.create({
        data: validatedCourse,
      });

      console.log(`Seeded course: ${validatedCourse.detail_course}`);
    } catch (error) {
      console.error(
        `Failed to seed course: ${course.detail_course}. Error: `,
        error
      );
    }
  }
}

async function main() {
  console.log("Seeding data...");
  try {
    await seedCourses();
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
