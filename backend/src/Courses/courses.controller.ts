// src/Courses/courses.controller.ts
import { Context } from "hono";
import { CoursesService, uploadToCloudinary } from "./courses.services";
import { InsertCourse } from "../schema";

const coursesService = new CoursesService();

export class CoursesController {
  static async getAllCourses(c: Context) {
    const courses = await coursesService.getAllCourses();
    return c.json(courses);
  }

  static async getCourseById(c: Context) {
    const id = Number(c.req.param("id"));
    const course = await coursesService.getCourseById(id);
    return course ? c.json(course) : c.json({ error: "Not found" }, 404);
  }

  static async createCourse(c: Context) {
    const formData = await c.req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return c.json({ error: "Image file is required" }, 400);
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: any = await uploadToCloudinary(buffer, {
      public_id: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, "-")
    });

    const courseData: InsertCourse = {
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      duration: formData.get("duration")?.toString() || "",
      fee: parseInt(formData.get("fee")?.toString() || "0"),
      minGrade: formData.get("minGrade")?.toString() || null,
      others: formData.get("others")?.toString() || null,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };

    const newCourse = await coursesService.createCourse(courseData);
    return c.json(newCourse, 201);
  }

// src/Courses/courses.controller.ts

    static async updateCourse(c: Context) {
      const id = Number(c.req.param("id"));
      const formData = await c.req.formData();
      const imageFile = formData.get("image") as File | null;

      let imageUrl: string | undefined;
      let publicId: string | undefined;

      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult: any = await uploadToCloudinary(buffer, {
          public_id: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, "-")
        });

        imageUrl = uploadResult.secure_url;
        publicId = uploadResult.public_id;
      }

      const courseData: Partial<InsertCourse> = {
        title: formData.get("title")?.toString(),
        description: formData.get("description")?.toString(),
        duration: formData.get("duration")?.toString(),
        fee: parseInt(formData.get("fee")?.toString() || "0"),
        minGrade: formData.get("minGrade")?.toString() || null,
        others: formData.get("others")?.toString() || null,
        ...(imageUrl && { imageUrl }),
        ...(publicId && { publicId }),
      };

      const updatedCourse = await coursesService.updateCourse(id, courseData);
      return c.json(updatedCourse);
    }


  static async deleteCourse(c: Context) {
    const id = Number(c.req.param("id"));
    await coursesService.deleteCourse(id);
    return c.json({ message: "Course deleted" });
  }
}
