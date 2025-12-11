import { pgEnum, pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("role", ["user", "admin"]);

// Users
export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  passwordCheck: sql`CHECK (password ~ '^\\$2[aby]\\$\\d{2}\\$.*')`
}));
export type InsertUser = typeof UsersTable.$inferInsert;
export type SelectUser = typeof UsersTable.$inferSelect;

// Applications
export const ApplicationsTable = pgTable("applications", {
  id: serial("id").primaryKey(),
  
  // Applicant's Details
  full_name: text("full_name").notNull(),
  title: text("title").notNull(),
  date_of_birth: text("date_of_birth").notNull(),
  nationality: text("nationality").notNull(),
  id_number: text("id_number").notNull(),
  county: text("county").notNull(),
  sub_county: text("sub_county").notNull(),
  phone_number: text("phone_number").notNull(),
  po_box: text("po_box").notNull(),
  postal_code: text("postal_code").notNull(),
  town: text("town").notNull(),
  email: text("email").notNull(),

  // Next of Kin Details
  next_of_kin: text("next_of_kin").notNull(),
  next_of_kin_phone: text("next_of_kin_phone").notNull(),
  next_next_of_kin: text("next_next_of_kin"),
  next_next_of_kin_phone: text("next_next_of_kin_phone"),

  // Education Plan
  course_name: text("course_name").notNull(),
  mode_of_study: text("mode_of_study").notNull(),
  intake: text("intake").notNull(),
  level_of_study: text("level_of_study"),

  // Other Details
  financier: text("financier").notNull(),
  religion: text("religion").notNull(),

  // System Fields
  status: text("status").default("Pending"),
  student_signature: text("student_signature"),
  signature_date: text("signature_date"),
  parent_signature: text("parent_signature"),
  parent_signature_date: text("parent_signature_date"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type InsertApplication = typeof ApplicationsTable.$inferInsert;
export type SelectApplication = typeof ApplicationsTable.$inferSelect;

// Courses (Modified)
export const CoursesTable = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  fee: integer("fee"),
  minGrade: text("minGrade"),
  others: text("others"),
  imageUrl: text("image_url"),
  publicId: text("public_id"),
});
export type InsertCourse = typeof CoursesTable.$inferInsert;
export type SelectCourse = typeof CoursesTable.$inferSelect;

// Messages
export const MessagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
export type InsertMessage = typeof MessagesTable.$inferInsert;
export type SelectMessage = typeof MessagesTable.$inferSelect;

// Blog Posts (Modified)
export const BlogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author"), // No foreign key, just store as plain text
  imageUrl: text("image_url"),
  publicId: text("public_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type InsertBlogPost = typeof BlogPostsTable.$inferInsert;
export type SelectBlogPost = typeof BlogPostsTable.$inferSelect;

// Success Stories (Modified)
export const SuccessStoriesTable = pgTable("success_stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  imageUrl: text("image_url"),
  publicId: text("public_id"),
  publishedAt: timestamp("published_at").defaultNow(),
});
export type InsertSuccessStory = typeof SuccessStoriesTable.$inferInsert;
export type SelectSuccessStory = typeof SuccessStoriesTable.$inferSelect;

// Gallery
export const GalleryTable = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  publicId: text("public_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
export type InsertGallery = typeof GalleryTable.$inferInsert;
export type SelectGallery = typeof GalleryTable.$inferSelect;

//
// ✅ NEW: Hero Images Table
//
export const HeroImagesTable = pgTable("hero_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  imageUrl: text("image_url").notNull(),
  publicId: text("public_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
export type InsertHeroImage = typeof HeroImagesTable.$inferInsert;
export type SelectHeroImage = typeof HeroImagesTable.$inferSelect;

//
// ✅ NEW: Pillars Table
//
export const PillarsTable = pgTable("pillars", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  publicId: text("public_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
export type InsertPillar = typeof PillarsTable.$inferInsert;
export type SelectPillar = typeof PillarsTable.$inferSelect;

