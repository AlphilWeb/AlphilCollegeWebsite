"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionInfoController = void 0;
const institution_services_1 = require("./institution.services");
const institutionInfoService = new institution_services_1.InstitutionInfoService();
class InstitutionInfoController {
    static async getAllInstitutionInfo(c) {
        const info = await institutionInfoService.getInstitutionInfo();
        return c.json(info, 200);
    }
    static async getInstitutionInfoById(c) {
        const id = Number(c.req.param("id"));
        const info = await institutionInfoService.getInstitutionInfoById(id);
        if (info) {
            return c.json(info, 200);
        }
        else {
            return c.json({ message: "Item not found" }, 404);
        }
    }
    static async createInstitutionInfo(c) {
        const info = await c.req.json();
        if (!info) {
            return c.text("Invalid request", 400);
        }
        else {
            const newInfo = await institutionInfoService.createInstitutionInfo(info);
            return c.json(newInfo, 201);
        }
    }
    static async updateInstitutionInfo(c) {
        const id = Number(c.req.param("id"));
        const infoData = await c.req.json();
        const updatedInfo = await institutionInfoService.updateInstitutionInfo(id, infoData);
        if (updatedInfo) {
            return c.json(updatedInfo, 200);
        }
        else {
            return c.text("Institution info not found", 404);
        }
    }
    static async deleteInstitutionInfo(c) {
        const id = Number(c.req.param("id"));
        try {
            await institutionInfoService.deleteInstitutionInfo(id);
            return c.text("Institution info deleted successfully", 200);
        }
        catch (error) {
            console.error("Error deleting institution info: ", error);
            return c.text("Failed to delete institution info", 500);
        }
    }
}
exports.InstitutionInfoController = InstitutionInfoController;
