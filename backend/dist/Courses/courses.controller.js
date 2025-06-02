"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const courses_services_1 = require("./courses.services");
const coursesService = new courses_services_1.CoursesService();
class CoursesController {
    static async getAllCourses(c) {
        const courses = await coursesService.getAllCourses();
        return c.json(courses);
    }
    static async getCourseById(c) {
        const id = Number(c.req.param("id"));
        const course = await coursesService.getCourseById(id);
        return course ? c.json(course) : c.json({ error: "Not found" }, 404);
    }
    static async createCourse(c) {
        const formData = await c.req.formData();
        const imageFile = formData.get("image");
        if (!imageFile) {
            return c.json({ error: "Image file is required" }, 400);
        }
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await (0, courses_services_1.uploadToCloudinary)(buffer, {
            public_id: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, "-")
        });
        const courseData = {
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
    static async updateCourse(c) {
        const id = Number(c.req.param("id"));
        const formData = await c.req.formData();
        const imageFile = formData.get("image");
        let imageUrl;
        let publicId;
        if (imageFile) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadResult = await (0, courses_services_1.uploadToCloudinary)(buffer, {
                public_id: formData.get("title")?.toString().toLowerCase().replace(/\s+/g, "-")
            });
            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;
        }
        const courseData = {
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
    static async deleteCourse(c) {
        const id = Number(c.req.param("id"));
        await coursesService.deleteCourse(id);
        return c.json({ message: "Course deleted" });
    }
}
exports.CoursesController = CoursesController;
