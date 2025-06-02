"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_services_1 = require("./users.services");
exports.UsersController = {
    getAllUsers: async (c) => {
        try {
            const users = await (0, users_services_1.getAllUsers)();
            return c.json(users);
        }
        catch (error) {
            console.error('Controller error:', error);
            return c.json({ error: 'Failed to fetch users' }, 500);
        }
    },
    createUser: async (c) => {
        try {
            const body = await c.req.json();
            if (!body.password) {
                return c.json({ error: 'Password is required' }, 400);
            }
            const newUser = await (0, users_services_1.createUser)({
                name: body.name,
                email: body.email,
                password: body.password,
                role: body.role
            });
            return c.json(newUser, 201);
        }
        catch (error) {
            console.error('Controller error:', error);
            const status = error.message.includes('unique') ? 409 : 400;
            return c.json({ error: error.message }, status);
        }
    },
    deleteUser: async (c) => {
        try {
            const userId = parseInt(c.req.param('id'));
            if (isNaN(userId)) {
                return c.json({ error: 'Invalid user ID' }, 400);
            }
            await (0, users_services_1.deleteUser)(userId);
            return c.json({ success: true });
        }
        catch (error) {
            console.error('Controller error:', error);
            return c.json({ error: 'Failed to delete user' }, 400);
        }
    },
    updateUser: async (c) => {
        try {
            const userId = parseInt(c.req.param('id'));
            if (isNaN(userId)) {
                return c.json({ error: 'Invalid user ID' }, 400);
            }
            const body = await c.req.json();
            const updatedUser = await (0, users_services_1.updateUser)({
                id: userId,
                name: body.name,
                email: body.email,
                role: body.role,
                password: body.password,
            });
            return c.json(updatedUser);
        }
        catch (error) {
            console.error('Controller error:', error);
            return c.json({ error: 'Failed to update user' }, 400);
        }
    }
};
