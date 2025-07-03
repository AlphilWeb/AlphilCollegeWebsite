import { Context } from "hono";
import { ApplicationsService } from "./applications.services";
import fs from "fs/promises";
import path from "path";
import { createReport } from "docx-templates";

const applicationService = new ApplicationsService();

// Helper function moved outside the class
function formatDate(dateString: string | Date | null | undefined): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
        ? 'Invalid Date' 
        : date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
}

export class ApplicationController {

// Get all applications
static async getAllApplications(c: Context) {
    try {
        const applications = await applicationService.getAllApplications();
        return c.json({ success: true, data: applications });
    } catch (error) {
        console.error("Error fetching applications:", error);
        return c.json({ success: false, error: "Internal server error" }, 500);
    }
}

// Get application by ID
static async getApplicationById(c: Context) {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

        const application = await applicationService.getApplicationById(id);
        if (!application) return c.json({ error: "Application not found" }, 404);

        return c.json({ success: true, data: application });
    } catch (error) {
        console.error("Error fetching application:", error);
        return c.json({ success: false, error: "Internal server error" }, 500);
    }
}

// Update application
static async updateApplication(c: Context) {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

        const updates = await c.req.json();
        const updated = await applicationService.updateApplication(id, updates);

        return c.json({ success: true, data: updated });
    } catch (error) {
        console.error("Error updating application:", error);
        return c.json({ success: false, error: "Internal server error" }, 500);
    }
}

// Delete application
static async deleteApplication(c: Context) {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

        await applicationService.deleteApplication(id);
        return c.json({ success: true, message: "Application deleted" });
    } catch (error) {
        console.error("Error deleting application:", error);
        return c.json({ success: false, error: "Internal server error" }, 500);
    }
}


    static async createApplication(c: Context) {
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
                    ...newApplication
                },
            }, 201);
        } catch (error) {
            console.error("Error creating application:", error);
            return c.json({ 
                success: false,
                error: "Internal server error" 
            }, 500);
        }
    }

    // ... (keep all other existing methods exactly the same)

static async generateApplicationDocx(c: Context) {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

        // 1. Get application data
        const application = await applicationService.getApplicationById(id);
        if (!application) return c.json({ error: "Application not found" }, 404);

        // 2. Prepare complete template data with fallbacks
        const templateData = {
            ...application,
            // Handle dates
            date_of_birth: formatDate(application.date_of_birth),
            signature_date: formatDate(application.signature_date),
            parent_signature_date: formatDate(application.parent_signature_date),
            created_at: formatDate(application.created_at),
            updated_at: formatDate(application.updated_at),
            // Add fallbacks for template-specific fields
            marital_status: 'N/A', // Fallback for template
            code: application.id_number || 'N/A', // Example mapping
            gender: application.title === 'Mr' ? 'Male' : 'Female' // Example mapping
        };

        // 3. Load template
        const templatePath = path.join(__dirname, "../templates/application_template.docx");
        const templateBuffer = await fs.readFile(templatePath);

        // 4. Process template with error suppression
        const docxBuffer = await createReport({
            template: templateBuffer,
            data: templateData,
            cmdDelimiter: ['{{', '}}'],
            rejectNullish: false,
            failFast: false, // Continue even with errors
            additionalJsContext: {
                formatDate: (date: string | Date) => formatDate(date)
            }
        });

        // 5. Send file
        c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        c.header('Content-Disposition', `attachment; filename="Alphil College Application Form.docx"`);
        return c.body(docxBuffer);

    } catch (error) {
        console.error("Error generating DOCX:", error);
        return c.json({ 
            error: "Failed to generate document",
            details: "Please check your template contains only valid field names",
            templateFields: [
                'full_name', 'title', 'date_of_birth', 'nationality', 
                'id_number', 'county', 'sub_county', 'phone_number',
                'po_box', 'postal_code', 'town', 'email',
                'next_of_kin', 'next_of_kin_phone', 'course_name',
                'mode_of_study', 'intake', 'financier', 'religion'
            ]
        }, 500);
    }
}

}