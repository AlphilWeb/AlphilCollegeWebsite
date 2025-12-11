"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const applications_services_1 = require("./applications.services");
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const docx_templates_1 = require("docx-templates");
const applicationService = new applications_services_1.ApplicationsService();
function formatDate(dateString) {
    if (!dateString)
        return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime())
        ? 'Invalid Date'
        : date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
}
class ApplicationController {
    static async createApplication(c) {
        try {
            const application = await c.req.json();
            const newApplication = await applicationService.createApplication({
                ...application,
                status: "Pending",
            });
            return c.json({
                success: true,
                data: {
                    id: newApplication.id,
                    ...newApplication,
                },
            }, 201);
        }
        catch (error) {
            console.error("Error creating application:", error);
            return c.json({
                success: false,
                error: "Internal server error",
            }, 500);
        }
    }
    static async generateApplicationDocx(c) {
        try {
            const id = Number(c.req.param("id"));
            if (isNaN(id))
                return c.json({ error: "Invalid ID" }, 400);
            const application = await applicationService.getApplicationById(id);
            if (!application)
                return c.json({ error: "Application not found" }, 404);
            // Use absolute path based on process.cwd()
            const templatePath = path_1.default.join(process.cwd(), 'templates', 'application_template.docx');
            // Check if template exists synchronously
            if (!(0, fs_1.existsSync)(templatePath)) {
                return c.json({
                    error: "Template file missing",
                    details: `Template not found at: ${templatePath}`,
                    suggestion: "Verify template file location in production environment"
                }, 404);
            }
            const templateData = {
                ...application,
                date_of_birth: formatDate(application.date_of_birth),
                signature_date: formatDate(application.signature_date),
                parent_signature_date: formatDate(application.parent_signature_date),
                created_at: formatDate(application.created_at),
                updated_at: formatDate(application.updated_at),
                marital_status: 'N/A',
                code: application.id_number || 'N/A',
                gender: application.title === 'Mr' ? 'Male' : 'Female',
                level_of_study: ""
            };
            // Validate template data
            const requiredFields = [
                'full_name', 'title', 'date_of_birth', 'nationality',
                'id_number', 'county', 'sub_county', 'phone_number',
                'po_box', 'postal_code', 'town', 'email',
                'next_of_kin', 'next_of_kin_phone', 'course_name',
                'mode_of_study', 'level_of_study', 'intake', 'financier', 'religion'
            ];
            const missingFields = requiredFields.filter(field => !templateData[field]);
            if (missingFields.length > 0) {
                return c.json({
                    error: "Incomplete application data",
                    missingFields,
                    suggestion: "Ensure all required fields are populated"
                }, 400);
            }
            const templateBuffer = await promises_1.default.readFile(templatePath);
            const docxBuffer = await (0, docx_templates_1.createReport)({
                template: templateBuffer,
                data: templateData,
                cmdDelimiter: ['{{', '}}'],
                rejectNullish: false,
                failFast: false,
                additionalJsContext: {
                    formatDate: (date) => formatDate(date),
                },
            });
            c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            c.header('Content-Disposition', `attachment; filename="Alphil_College_Application_${id}.docx"`);
            return c.body(docxBuffer);
        }
        catch (error) {
            console.error("Error generating DOCX:", error);
            return c.json({
                error: "Failed to generate document",
                message: error.message,
                stack: error.stack,
                suggestion: "Check server logs for detailed error information"
            }, 500);
        }
    }
    static async getAllApplications(c) {
        try {
            const applications = await applicationService.getAllApplications();
            return c.json({ success: true, data: applications });
        }
        catch (error) {
            console.error("Error fetching applications:", error);
            return c.json({ success: false, error: "Internal server error" }, 500);
        }
    }
    static async getApplicationById(c) {
        try {
            const id = Number(c.req.param("id"));
            if (isNaN(id))
                return c.json({ error: "Invalid ID" }, 400);
            const application = await applicationService.getApplicationById(id);
            if (!application)
                return c.json({ error: "Application not found" }, 404);
            return c.json({ success: true, data: application });
        }
        catch (error) {
            console.error("Error fetching application:", error);
            return c.json({ success: false, error: "Internal server error" }, 500);
        }
    }
    static async updateApplication(c) {
        try {
            const id = Number(c.req.param("id"));
            if (isNaN(id))
                return c.json({ error: "Invalid ID" }, 400);
            const updates = await c.req.json();
            const updated = await applicationService.updateApplication(id, updates);
            return c.json({ success: true, data: updated });
        }
        catch (error) {
            console.error("Error updating application:", error);
            return c.json({ success: false, error: "Internal server error" }, 500);
        }
    }
    static async deleteApplication(c) {
        try {
            const id = Number(c.req.param("id"));
            if (isNaN(id))
                return c.json({ error: "Invalid ID" }, 400);
            await applicationService.deleteApplication(id);
            return c.json({ success: true, message: "Application deleted" });
        }
        catch (error) {
            console.error("Error deleting application:", error);
            return c.json({ success: false, error: "Internal server error" }, 500);
        }
    }
}
exports.ApplicationController = ApplicationController;
