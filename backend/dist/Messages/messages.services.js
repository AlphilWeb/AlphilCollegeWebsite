"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
class MessagesService {
    async getAllMessages() {
        return await db_1.default.query.MessagesTable.findMany();
    }
    async getMessageById(id) {
        return await db_1.default.query.MessagesTable.findFirst({ where: (0, drizzle_orm_1.eq)(schema_1.MessagesTable.id, id) });
    }
    async createMessage(message) {
        const [newMessage] = await db_1.default.insert(schema_1.MessagesTable).values(message).returning();
        return newMessage;
    }
    async updateMessage(id, messageData) {
        const [updatedMessage] = await db_1.default.update(schema_1.MessagesTable).set(messageData).where((0, drizzle_orm_1.eq)(schema_1.MessagesTable.id, id)).returning();
        return updatedMessage;
    }
    async deleteMessage(id) {
        await db_1.default.delete(schema_1.MessagesTable).where((0, drizzle_orm_1.eq)(schema_1.MessagesTable.id, id));
        return "Message Deleted Successfully";
    }
}
exports.MessagesService = MessagesService;
