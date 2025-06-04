// src/Courses/courses.service.ts
import { eq } from "drizzle-orm";
import db from "../db";
import { CoursesTable, InsertCourse, SelectCourse } from "../schema";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadToCloudinary = async (buffer: Buffer, options: Record<string, unknown> = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "courses",
        resource_type: "image",
        ...options,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export class CoursesService {
  async getAllCourses(): Promise<SelectCourse[]> {
    return await db.query.CoursesTable.findMany();
  }

  async getCourseById(id: number): Promise<SelectCourse | undefined> {
    return await db.query.CoursesTable.findFirst({ where: eq(CoursesTable.id, id) });
  }

  async createCourse(course: InsertCourse): Promise<SelectCourse> {
    const [newCourse] = await db.insert(CoursesTable).values(course).returning();
    return newCourse;
  }

  async updateCourse(id: number, courseData: Partial<InsertCourse>): Promise<SelectCourse> {
    const [updatedCourse] = await db.update(CoursesTable).set(courseData).where(eq(CoursesTable.id, id)).returning();
    return updatedCourse;
  }

  async deleteCourse(id: number) {
    const course = await this.getCourseById(id);
    if (course?.publicId) {
      await cloudinary.uploader.destroy(course.publicId);
    }
    await db.delete(CoursesTable).where(eq(CoursesTable.id, id));
    return "Course Deleted Successfully";
  }
}
