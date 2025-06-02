"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PillarsTable = exports.HeroImagesTable = exports.GalleryTable = exports.SuccessStoriesTable = exports.BlogPostsTable = exports.MessagesTable = exports.CoursesTable = exports.ApplicationsTable = exports.UsersTable = exports.userRoleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Enums
exports.userRoleEnum = (0, pg_core_1.pgEnum)("role", ["user", "admin"]);
// Users
exports.UsersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    role: (0, exports.userRoleEnum)("role").default("user").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
}, (table) => ({
    passwordCheck: (0, drizzle_orm_1.sql) `CHECK (password ~ '^\\$2[aby]\\$\\d{2}\\$.*')`
}));
// Applications
exports.ApplicationsTable = (0, pg_core_1.pgTable)("applications", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    firstName: (0, pg_core_1.text)("firstName").notNull(),
    lastName: (0, pg_core_1.text)("lastName").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    phone: (0, pg_core_1.text)("phone").notNull(),
    course: (0, pg_core_1.text)("course").notNull(),
    education: (0, pg_core_1.text)("education").notNull(),
    other: (0, pg_core_1.text)("other"),
    status: (0, pg_core_1.text)("status").default("Pending"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
// Courses (Modified)
exports.CoursesTable = (0, pg_core_1.pgTable)("courses", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    duration: (0, pg_core_1.text)("duration").notNull(),
    fee: (0, pg_core_1.integer)("fee"),
    minGrade: (0, pg_core_1.text)("minGrade"),
    others: (0, pg_core_1.text)("others"),
    imageUrl: (0, pg_core_1.text)("image_url"),
    publicId: (0, pg_core_1.text)("public_id"),
});
// Messages
exports.MessagesTable = (0, pg_core_1.pgTable)("messages", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    phone: (0, pg_core_1.text)("phone"),
    email: (0, pg_core_1.text)("email").notNull(),
    message: (0, pg_core_1.text)("message").notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
// Blog Posts (Modified)
exports.BlogPostsTable = (0, pg_core_1.pgTable)("blog_posts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    author_id: (0, pg_core_1.integer)("author_id").references(() => exports.UsersTable.id),
    imageUrl: (0, pg_core_1.text)("image_url"),
    publicId: (0, pg_core_1.text)("public_id"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
// Success Stories (Modified)
exports.SuccessStoriesTable = (0, pg_core_1.pgTable)("success_stories", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    author: (0, pg_core_1.text)("author").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url"),
    publicId: (0, pg_core_1.text)("public_id"),
    publishedAt: (0, pg_core_1.timestamp)("published_at").defaultNow(),
});
// Gallery
exports.GalleryTable = (0, pg_core_1.pgTable)("gallery", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    publicId: (0, pg_core_1.text)("public_id").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
//
// ✅ NEW: Hero Images Table
//
exports.HeroImagesTable = (0, pg_core_1.pgTable)("hero_images", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    subtitle: (0, pg_core_1.text)("subtitle"),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    publicId: (0, pg_core_1.text)("public_id").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
//
// ✅ NEW: Pillars Table
//
exports.PillarsTable = (0, pg_core_1.pgTable)("pillars", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    publicId: (0, pg_core_1.text)("public_id").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
