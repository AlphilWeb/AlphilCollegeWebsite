import "dotenv/config";
import * as schema from "../src/schema";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const client = neon(process.env.DB_URL!)

const db = drizzle(client, { schema, logger: true });

export default db;