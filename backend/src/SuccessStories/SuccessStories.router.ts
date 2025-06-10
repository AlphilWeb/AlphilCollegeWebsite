import { Hono } from "hono";
import { SuccessStoriesController } from "./SuccessStories.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

const successStoriesRouter = new Hono();

// Public routes (no auth required)
successStoriesRouter.get("/", SuccessStoriesController.getAllSuccessStories);
successStoriesRouter.get("/:id", SuccessStoriesController.getSuccessStoryById);

// Admin-protected routes
successStoriesRouter.use("*", authMiddleware);
successStoriesRouter.use("*", adminMiddleware);

successStoriesRouter.post("/", SuccessStoriesController.createSuccessStory);
successStoriesRouter.put("/:id", SuccessStoriesController.updateSuccessStory);
successStoriesRouter.delete("/:id", SuccessStoriesController.deleteSuccessStory);

// Admin debug endpoint
successStoriesRouter.get("/debug/admin", (c) => {
  const payload = c.get("jwtPayload");
  return c.json({
    message: "Admin success story access verified",
    user: payload,
    permissions: ["create", "update", "delete"]
  });
});

export default successStoriesRouter;