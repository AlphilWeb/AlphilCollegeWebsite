import { Context } from "hono";
import { ApplicationsService } from "./applications.services";

const applicationService = new ApplicationsService();

export class ApplicationController {
    static async createApplication(c: Context) {
        try {
            const application = await c.req.json();
            
            // Validate required fields based on schema
            const requiredFields = [
                'firstName',
                'lastName', 
                'email',
                'phone',
                'course',
                'education'
            ];
            
            const missingFields = requiredFields.filter(field => !application[field]);
            
            if (missingFields.length > 0) {
                return c.json({
                    error: "Missing required fields",
                    missingFields
                }, 400);
            }

            // Validate email format
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(application.email)) {
                return c.json({ 
                    error: "Invalid email format" 
                }, 400);
            }

            // Validate phone contains only numbers
            if (!/^\d+$/.test(application.phone)) {
                return c.json({
                    error: "Phone must contain only numbers"
                }, 400);
            }

            const newApplication = await applicationService.createApplication({
                ...application,
                status: "Pending" // Default status
            });
            
            return c.json({
                    success: true,
                    data: newApplication // Include the created application data
            }, 201);
            
        } catch (error) {
            console.error("Error creating application:", error);
            return c.text("Internal server error", 500);
        }
    }

    // Admin methods remain the same but with proper typing
    static async getAllApplications(c: Context) {
        try {
            const applications = await applicationService.getAllApplications();
            const formatted = applications.map(app => ({
                id: app.id,
                firstName: app.firstName,
                lastName: app.lastName,
                email: app.email,
                phone: app.phone,
                course: app.course,
                education: app.education,
                other: app.other,
                status: app.status,
                createdAt: app.created_at instanceof Date 
                    ? app.created_at.toISOString() 
                    : app.created_at
            }));
            return c.json(formatted, 200);
        } catch (error) {
            console.error("Error fetching applications:", error);
            return c.text("Internal server error", 500);
        }
    }

    static async getApplicationById(c: Context) {
        try {
            const id = Number(c.req.param("id"));
            if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);
            
            const application = await applicationService.getApplicationById(id);
            
            if (!application) {
                return c.json({ error: "Application not found" }, 404);
            }

            return c.json({
                id: application.id,
                firstName: application.firstName,
                lastName: application.lastName,
                email: application.email,
                phone: application.phone,
                course: application.course,
                education: application.education,
                other: application.other,
                status: application.status,
                createdAt: application.created_at instanceof Date
                    ? application.created_at.toISOString()
                    : application.created_at
            }, 200);
            
        } catch (error) {
            console.error("Error fetching application:", error);
            return c.text("Internal server error", 500);
        }
    }
    
    static async updateApplication(c: Context) {
        try {
            const id = Number(c.req.param("id"));
            if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);
            
            const updateData = await c.req.json();
            
            // Validate status if being updated
            if (updateData.status && !["Pending", "Approved", "Rejected"].includes(updateData.status)) {
                return c.json({ error: "Invalid status value" }, 400);
            }

            const updated = await applicationService.updateApplication(id, updateData);
            
            if (!updated) {
                return c.json({ error: "Application not found" }, 404);
            }
            
            return c.json({
                id: updated.id,
                status: updated.status,
                updatedAt: new Date().toISOString()
            }, 200);
            
        } catch (error) {
            console.error("Error updating application:", error);
            return c.text("Internal server error", 500);
        }
    }

    static async deleteApplication(c: Context) {
        try {
            const id = Number(c.req.param("id"));
            if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);
            
            await applicationService.deleteApplication(id);
            return c.text("Application deleted successfully", 200);
            
        } catch (error) {
            console.error("Error deleting application:", error);
            return c.text("Failed to delete application", 500);
        }
    }
}