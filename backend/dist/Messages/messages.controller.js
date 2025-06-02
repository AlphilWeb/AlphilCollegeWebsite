"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = void 0;
const messages_services_1 = require("./messages.services");
const messagesService = new messages_services_1.MessagesService();
class MessagesController {
    static async getAllMessages(c) {
        const messages = await messagesService.getAllMessages();
        return c.json(messages, 200);
    }
    static async getMessageById(c) {
        const id = Number(c.req.param("id"));
        const message = await messagesService.getMessageById(id);
        if (message) {
            return c.json(message, 200);
        }
        else {
            return c.json({ message: "Item not found" }, 404);
        }
    }
    static async createMessage(c) {
        const message = await c.req.json();
        if (!message) {
            return c.text("Invalid request", 400);
        }
        else {
            const newMessage = await messagesService.createMessage(message);
            return c.json(newMessage, 201);
        }
    }
    static async updateMessage(c) {
        const id = Number(c.req.param("id"));
        const messageData = await c.req.json();
        const updatedMessage = await messagesService.updateMessage(id, messageData);
        if (updatedMessage) {
            return c.json(updatedMessage, 200);
        }
        else {
            return c.text("Message not found", 404);
        }
    }
    static async deleteMessage(c) {
        const id = Number(c.req.param("id"));
        try {
            await messagesService.deleteMessage(id);
            return c.text("Message deleted successfully", 200);
        }
        catch (error) {
            console.error("Error deleting message: ", error);
            return c.text("Failed to delete message", 500);
        }
    }
}
exports.MessagesController = MessagesController;
