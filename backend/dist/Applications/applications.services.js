"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
class ApplicationsService {
    async getAllApplications() {
        return await db_1.default.query.ApplicationsTable.findMany();
    }
    async getApplicationById(id) {
        const application = await db_1.default.query.ApplicationsTable.findFirst({ where: (0, drizzle_orm_1.eq)(schema_1.ApplicationsTable.id, id) });
        return application;
    }
    async createApplication(application) {
        const [newApplication] = await db_1.default.insert(schema_1.ApplicationsTable).values(application).returning();
        return newApplication;
    }
    async updateApplication(id, applicationsData) {
        const [updatedApplication] = await db_1.default.update(schema_1.ApplicationsTable)
            .set(applicationsData)
            .where((0, drizzle_orm_1.eq)(schema_1.ApplicationsTable.id, id))
            .returning();
        return updatedApplication;
    }
    async deleteApplication(id) {
        await db_1.default.delete(schema_1.ApplicationsTable).where((0, drizzle_orm_1.eq)(schema_1.ApplicationsTable.id, id));
        return "Item Deleted Suuccessfully";
    }
}
exports.ApplicationsService = ApplicationsService;
