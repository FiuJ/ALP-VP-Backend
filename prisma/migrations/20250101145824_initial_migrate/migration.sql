-- CreateTable
CREATE TABLE "Workouts" (
    "workout_id" SERIAL NOT NULL,
    "name_workout" VARCHAR(250) NOT NULL,
    "detail_workout" TEXT NOT NULL,
    "workout_type" VARCHAR(50) NOT NULL,
    "photo_workout" TEXT NOT NULL,
    "workout_duration" INTEGER NOT NULL,

    CONSTRAINT "Workouts_pkey" PRIMARY KEY ("workout_id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "course_id" SERIAL NOT NULL,
    "detail_course" TEXT NOT NULL,
    "photo_course" TEXT NOT NULL,
    "course_duration" INTEGER NOT NULL,
    "community_id" INTEGER,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "Workouts_courses" (
    "workout_course_id" SERIAL NOT NULL,
    "workout_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Workouts_courses_pkey" PRIMARY KEY ("workout_course_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(250) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "photo_workout" TEXT NOT NULL,
    "course_counter" INTEGER NOT NULL,
    "performance" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Courses_Users" (
    "course_user_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,

    CONSTRAINT "Courses_Users_pkey" PRIMARY KEY ("course_user_id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "post_id" SERIAL NOT NULL,
    "post_name" VARCHAR(200) NOT NULL,
    "post_description" TEXT NOT NULL,
    "post_photo" TEXT NOT NULL,
    "post_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_likes" INTEGER NOT NULL,
    "post_isLike" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "comment_id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "comment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "Communities" (
    "community_id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Communities_pkey" PRIMARY KEY ("community_id")
);

-- CreateTable
CREATE TABLE "Users_community" (
    "user_community_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "community_id" INTEGER NOT NULL,

    CONSTRAINT "Users_community_pkey" PRIMARY KEY ("user_community_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Communities"("community_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workouts_courses" ADD CONSTRAINT "Workouts_courses_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workouts"("workout_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workouts_courses" ADD CONSTRAINT "Workouts_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses_Users" ADD CONSTRAINT "Courses_Users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses_Users" ADD CONSTRAINT "Courses_Users_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_community" ADD CONSTRAINT "Users_community_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_community" ADD CONSTRAINT "Users_community_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "Communities"("community_id") ON DELETE RESTRICT ON UPDATE CASCADE;
