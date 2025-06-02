"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = exports.uploadToCloudinary = void 0;
// src/Courses/courses.service.ts
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
const uploadToCloudinary = async (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: "courses",
            resource_type: "image",
            ...options,
        }, (error, result) => {
            if (error || !result) {
                return reject(error || new Error("Cloudinary upload failed"));
            }
            resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
class CoursesService {
    async getAllCourses() {
        return await db_1.default.query.CoursesTable.findMany();
    }
    async getCourseById(id) {
        return await db_1.default.query.CoursesTable.findFirst({ where: (0, drizzle_orm_1.eq)(schema_1.CoursesTable.id, id) });
    }
    async createCourse(course) {
        const [newCourse] = await db_1.default.insert(schema_1.CoursesTable).values(course).returning();
        return newCourse;
    }
    async updateCourse(id, courseData) {
        const [updatedCourse] = await db_1.default.update(schema_1.CoursesTable).set(courseData).where((0, drizzle_orm_1.eq)(schema_1.CoursesTable.id, id)).returning();
        return updatedCourse;
    }
    async deleteCourse(id) {
        const course = await this.getCourseById(id);
        if (course?.publicId) {
            await cloudinary_1.v2.uploader.destroy(course.publicId);
        }
        await db_1.default.delete(schema_1.CoursesTable).where((0, drizzle_orm_1.eq)(schema_1.CoursesTable.id, id));
        return "Course Deleted Successfully";
    }
}
exports.CoursesService = CoursesService;
