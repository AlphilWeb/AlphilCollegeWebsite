import { Context } from 'hono';
import db from '../db';
import { ApplicationsTable, CoursesTable, MessagesTable, UsersTable } from '../schema';
import { count, sql } from 'drizzle-orm';

export const getAdminAnalytics = async (c: Context) => {
  try {
    const userCount = await db.select({ count: sql<number>`count(*)` }).from(UsersTable);
    const applicationsCount = await db.select({ count: sql<number>`count(*)` }).from(ApplicationsTable);
    const messagesCount = await db.select({ count: sql<number>`count(*)` }).from(MessagesTable);
    const coursesCount = await db.select({ count: sql<number>`count(*)` }).from(CoursesTable);

    return c.json({
      users: userCount[0]?.count ?? 0,
      applications: applicationsCount[0]?.count ?? 0,
      messages: messagesCount[0]?.count ?? 0,
      courses: coursesCount[0]?.count ?? 0,
    });
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
};
