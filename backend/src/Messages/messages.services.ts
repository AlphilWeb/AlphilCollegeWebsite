import { eq } from "drizzle-orm";
import db from "../db";
import { MessagesTable, InsertMessage, SelectMessage } from "../schema";

export class MessagesService {
    async getAllMessages(): Promise<SelectMessage[]> {
        return await db.query.MessagesTable.findMany();
    }

    async getMessageById(id: number): Promise<InsertMessage | undefined> {
        return await db.query.MessagesTable.findFirst({ where: eq(MessagesTable.id, id) });
    }

    async createMessage(message: InsertMessage): Promise<InsertMessage> {
        const [newMessage] = await db.insert(MessagesTable).values(message).returning();
        return newMessage;
    }

    async updateMessage(id: number, messageData: Partial<InsertMessage>): Promise<InsertMessage> {
        const [updatedMessage] = await db.update(MessagesTable).set(messageData).where(eq(MessagesTable.id, id)).returning();
        return updatedMessage;
    }

    async deleteMessage(id: number) {
        await db.delete(MessagesTable).where(eq(MessagesTable.id, id));
        return "Message Deleted Successfully";
    }
}