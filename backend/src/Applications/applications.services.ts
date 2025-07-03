import { eq } from "drizzle-orm";
import db from "../db";
import { ApplicationsTable, InsertApplication, SelectApplication } from "../schema";

export class ApplicationsService {
    async getAllApplications(): Promise<SelectApplication[]> {
        return await db.query.ApplicationsTable.findMany();
    }

    async getApplicationById(id: number): Promise<SelectApplication | undefined> {
        return await db.query.ApplicationsTable.findFirst({
            where: eq(ApplicationsTable.id, id)
        });
    }

    async createApplication(application: InsertApplication): Promise<InsertApplication> {
        const [newApplication] = await db.insert(ApplicationsTable).values(application).returning();
        return newApplication;
    }

    async updateApplication(id: number, applicationsData: Partial<InsertApplication>): Promise<InsertApplication> {
        const [updatedApplication] = await db.update(ApplicationsTable)
            .set(applicationsData)
            .where(eq(ApplicationsTable.id, id))
            .returning();
        return updatedApplication;
    }

    async deleteApplication(id: number) {
        await db.delete(ApplicationsTable).where(eq(ApplicationsTable.id, id));
        return "Item Deleted Successfully";
    }
}
