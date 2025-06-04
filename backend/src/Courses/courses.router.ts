// src/Courses/courses.router.ts
import { Hono } from "hono";
import { CoursesController } from "./courses.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

const coursesRouter = new Hono();

coursesRouter.get("/", CoursesController.getAllCourses);
coursesRouter.get("/:id", CoursesController.getCourseById);

// Admin-protected write routes
coursesRouter.use("*", authMiddleware);
coursesRouter.use("*", adminMiddleware);

coursesRouter.post("/", CoursesController.createCourse);
coursesRouter.put("/:id", CoursesController.updateCourse);
coursesRouter.delete("/:id", CoursesController.deleteCourse);

coursesRouter.get("/debug/admin", (c) => {
  const payload = c.get("jwtPayload");
  return c.json({
    message: "Admin course access granted",
    user: payload,
    permissions: ["create", "update", "delete"]
  });
});

export default coursesRouter;
