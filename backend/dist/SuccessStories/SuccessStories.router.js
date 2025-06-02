"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const SuccessStories_controller_1 = require("./SuccessStories.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const successStoriesRouter = new hono_1.Hono();
// Public routes (no auth required)
successStoriesRouter.get("/", SuccessStories_controller_1.SuccessStoriesController.getAllSuccessStories);
successStoriesRouter.get("/:id", SuccessStories_controller_1.SuccessStoriesController.getSuccessStoryById);
// Admin-protected routes
successStoriesRouter.use("*", auth_middleware_1.authMiddleware);
successStoriesRouter.use("*", auth_middleware_1.adminMiddleware);
successStoriesRouter.post("/", SuccessStories_controller_1.SuccessStoriesController.createSuccessStory);
successStoriesRouter.put("/:id", SuccessStories_controller_1.SuccessStoriesController.updateSuccessStory);
successStoriesRouter.delete("/:id", SuccessStories_controller_1.SuccessStoriesController.deleteSuccessStory);
// Admin debug endpoint
successStoriesRouter.get("/debug/admin", (c) => {
    const payload = c.get("jwtPayload");
    return c.json({
        message: "Admin success story access verified",
        user: payload,
        permissions: ["create", "update", "delete"]
    });
});
exports.default = successStoriesRouter;
