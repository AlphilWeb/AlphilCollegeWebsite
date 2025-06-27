"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminAnalytics = void 0;
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
const getAdminAnalytics = async (c) => {
    try {
        const userCount = await db_1.default.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(schema_1.UsersTable);
        const applicationsCount = await db_1.default.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(schema_1.ApplicationsTable);
        const messagesCount = await db_1.default.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(schema_1.MessagesTable);
        const coursesCount = await db_1.default.select({ count: (0, drizzle_orm_1.sql) `count(*)` }).from(schema_1.CoursesTable);
        return c.json({
            users: userCount[0]?.count ?? 0,
            applications: applicationsCount[0]?.count ?? 0,
            messages: messagesCount[0]?.count ?? 0,
            courses: coursesCount[0]?.count ?? 0,
        });
    }
    catch (error) {
        console.error(error);
        return c.json({ error: 'Failed to fetch analytics' }, 500);
    }
};
exports.getAdminAnalytics = getAdminAnalytics;
