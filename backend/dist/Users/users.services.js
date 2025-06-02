"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.createUser = exports.getAllUsers = void 0;
// src/Users/users.service.ts
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUsers = async () => {
    try {
        return await db_1.default.select({
            id: schema_1.UsersTable.id,
            name: schema_1.UsersTable.name,
            email: schema_1.UsersTable.email,
            role: schema_1.UsersTable.role,
            // createdAt: UsersTable.createdAt
        })
            .from(schema_1.UsersTable)
            .orderBy(schema_1.UsersTable.createdAt);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};
exports.getAllUsers = getAllUsers;
const createUser = async (userData) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        const [newUser] = await db_1.default.insert(schema_1.UsersTable)
            .values({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: userData.role || 'user'
            // createdAt is omitted as it has a default value
        })
            .returning({
            id: schema_1.UsersTable.id,
            name: schema_1.UsersTable.name,
            email: schema_1.UsersTable.email,
            role: schema_1.UsersTable.role,
            // createdAt: UsersTable.createdAt
        });
        if (!newUser) {
            throw new Error('Failed to create user');
        }
        return newUser;
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};
exports.createUser = createUser;
const deleteUser = async (userId) => {
    try {
        await db_1.default.delete(schema_1.UsersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.UsersTable.id, userId));
    }
    catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (params) => {
    try {
        const updateData = {};
        if (params.name)
            updateData.name = params.name;
        if (params.email)
            updateData.email = params.email;
        if (params.role)
            updateData.role = params.role;
        if (params.password)
            updateData.password = await bcryptjs_1.default.hash(params.password, 10);
        const [updatedUser] = await db_1.default.update(schema_1.UsersTable)
            .set(updateData)
            .where((0, drizzle_orm_1.eq)(schema_1.UsersTable.id, params.id))
            .returning({
            id: schema_1.UsersTable.id,
            name: schema_1.UsersTable.name,
            email: schema_1.UsersTable.email,
            role: schema_1.UsersTable.role,
        });
        if (!updatedUser)
            throw new Error('User not found');
        return updatedUser;
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
    }
};
exports.updateUser = updateUser;
