"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/Courses/courses.router.ts
const hono_1 = require("hono");
const courses_controller_1 = require("./courses.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const coursesRouter = new hono_1.Hono();
coursesRouter.get("/", courses_controller_1.CoursesController.getAllCourses);
coursesRouter.get("/:id", courses_controller_1.CoursesController.getCourseById);
// Admin-protected write routes
coursesRouter.use("*", auth_middleware_1.authMiddleware);
coursesRouter.use("*", auth_middleware_1.adminMiddleware);
coursesRouter.post("/", courses_controller_1.CoursesController.createCourse);
coursesRouter.put("/:id", courses_controller_1.CoursesController.updateCourse);
coursesRouter.delete("/:id", courses_controller_1.CoursesController.deleteCourse);
coursesRouter.get("/debug/admin", (c) => {
    const payload = c.get("jwtPayload");
    return c.json({
        message: "Admin course access granted",
        user: payload,
        permissions: ["create", "update", "delete"]
    });
});
exports.default = coursesRouter;
