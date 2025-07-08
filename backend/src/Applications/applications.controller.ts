// src/Applications/applications.controller.ts
import { Context } from "hono";
import { ApplicationsService } from "./applications.services";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { createReport } from "docx-templates";

const applicationService = new ApplicationsService();

function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? 'Invalid Date'
    : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
}

export class ApplicationController {
  static async createApplication(c: Context) {
    try {
      const application = await c.req.json();
      const newApplication = await applicationService.createApplication({
        ...application,
        status: "Pending",
      });

      return c.json(
        {
          success: true,
          data: {
            id: newApplication.id,
            ...newApplication,
          },
        },
        201
      );
    } catch (error) {
      console.error("Error creating application:", error);
      return c.json(
        {
          success: false,
          error: "Internal server error",
        },
        500
      );
    }
  }

  static async generateApplicationDocx(c: Context) {
      try {
          const id = Number(c.req.param("id"));
          if (isNaN(id)) return c.json({ error: "Invalid ID" }, 400);

          const application = await applicationService.getApplicationById(id);
          if (!application) return c.json({ error: "Application not found" }, 404);

          // Use absolute path based on process.cwd()
          const templatePath = path.join(process.cwd(), 'templates', 'application_template.docx');
          
          // Check if template exists synchronously
          if (!existsSync(templatePath)) {
              return c.json({
                  error: "Template file missing",
                  details: `Template not found at: ${templatePath}`,
                  suggestion: "Verify template file location in production environment"
              }, 404);
          }

          type TemplateData = {
              [key: string]: string | number | null | undefined;
              full_name: string;
              title: string;
              date_of_birth: string;
              nationality: string;
              id_number: string;
              county: string;
              sub_county: string;
              phone_number: string;
              po_box: string;
              postal_code: string;
              town: string;
              email: string;
              next_of_kin: string;
              next_of_kin_phone: string;
              course_name: string;
              mode_of_study: string;
              intake: string;
              financier: string;
              religion: string;
              signature_date: string;
              parent_signature_date: string;
              created_at: string;
              updated_at: string;
              marital_status: string;
              code: string;
              gender: string;
              // add any other fields as needed
          };

          const templateData: TemplateData = {
              ...application,
              date_of_birth: formatDate(application.date_of_birth),
              signature_date: formatDate(application.signature_date),
              parent_signature_date: formatDate(application.parent_signature_date),
              created_at: formatDate(application.created_at),
              updated_at: formatDate(application.updated_at),
              marital_status: 'N/A',
              code: application.id_number || 'N/A',
              gender: application.title === 'Mr' ? 'Male' : 'Female',
          };

          // Validate template data
          const requiredFields = [
              'full_name', 'title', 'date_of_birth', 'nationality',
              'id_number', 'county', 'sub_county', 'phone_number',
              'po_box', 'postal_code', 'town', 'email',
              'next_of_kin', 'next_of_kin_phone', 'course_name',
              'mode_of_study', 'intake', 'financier', 'religion'
          ] as (keyof TemplateData)[];

          const missingFields = requiredFields.filter(field => !templateData[field]);
          if (missingFields.length > 0) {
              return c.json({
                  error: "Incomplete application data",
                  missingFields,
                  suggestion: "Ensure all required fields are populated"
              }, 400);
          }

          const templateBuffer = await fs.readFile(templatePath);
          const docxBuffer = await createReport({
              template: templateBuffer,
              data: templateData,
              cmdDelimiter: ['{{', '}}'],
              rejectNullish: false,
              failFast: false,
              additionalJsContext: {
                  formatDate: (date: string | Date) => formatDate(date),
              },
          });

          c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
          c.header('Content-Disposition', `attachment; filename="Alphil_College_Application_${id}.docx"`);
          return c.body(docxBuffer);
      } catch (error: any) {
          console.error("Error generating DOCX:", error);
          return c.json({
              error: "Failed to generate document",
              message: error.message,
              stack: error.stack,
              suggestion: "Check server logs for detailed error information"
          }, 500);
      }
  }  static async getAllApplications(c: Context) {
    try {
      const applications = await applicationService.getAllApplications();
      return c.json({ success: true, data: applications });
    } catch (error) {
      console.error("Error fetching applications:", error);
      return c.json({ success: false, error: "Internal server error" }, 500);
    }
  }

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
}
