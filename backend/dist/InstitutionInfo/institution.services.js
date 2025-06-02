"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionInfoService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema");
class InstitutionInfoService {
    async getInstitutionInfo() {
        return await db_1.default.query.InstitutionInfoTable.findMany();
    }
    async getInstitutionInfoById(id) {
        return await db_1.default.query.InstitutionInfoTable.findFirst({ where: (0, drizzle_orm_1.eq)(schema_1.InstitutionInfoTable.id, id) });
    }
    async createInstitutionInfo(info) {
        const [newInfo] = await db_1.default.insert(schema_1.InstitutionInfoTable).values(info).returning();
        return newInfo;
    }
    async updateInstitutionInfo(id, infoData) {
        const [updatedInfo] = await db_1.default.update(schema_1.InstitutionInfoTable).set(infoData).where((0, drizzle_orm_1.eq)(schema_1.InstitutionInfoTable.id, id)).returning();
        return updatedInfo;
    }
    async deleteInstitutionInfo(id) {
        await db_1.default.delete(schema_1.InstitutionInfoTable).where((0, drizzle_orm_1.eq)(schema_1.InstitutionInfoTable.id, id));
        return "Institution Info Deleted Successfully";
    }
}
exports.InstitutionInfoService = InstitutionInfoService;
