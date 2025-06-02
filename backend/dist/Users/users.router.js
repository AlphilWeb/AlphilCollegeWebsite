"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/Users/users.router.ts
const hono_1 = require("hono");
const users_controller_1 = require("./users.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const usersRouter = new hono_1.Hono();
// Apply middleware to all routes
usersRouter.use('*', auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware);
// Routes
usersRouter.get('/', users_controller_1.UsersController.getAllUsers); // GET /users
usersRouter.post('/', users_controller_1.UsersController.createUser); // POST /users
usersRouter.delete('/:id', users_controller_1.UsersController.deleteUser); // DELETE /users/:id
usersRouter.put('/:id', users_controller_1.UsersController.updateUser); // PUT /users/:id
exports.default = usersRouter;
