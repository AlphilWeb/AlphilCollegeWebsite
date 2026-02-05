// src/Applications/applications.controller.ts
import { Context } from "hono";
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ApplicationsService } from "./applications.services";

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

      // PDF document definition
      const docDefinition: TDocumentDefinitions = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        header: {
          text: 'ALPHIL TRAINING COLLEGE ',
          alignment: 'center',
          bold: true,
          fontSize: 16,
          margin: [0, 20, 0, 20],
          color: '#2c5282'
        },
        footer: function(currentPage: number, pageCount: number) {
          return {
            text: `Application ID: ${id} | Page ${currentPage} of ${pageCount}`,
            alignment: 'center',
            fontSize: 8,
            margin: [0, 10, 0, 0],
            color: '#718096'
          };
        },
        content: [
          // Title
          {
            text: 'APPLICATION FORM',
            style: 'header',
            alignment: 'center',
            margin: [0, 0, 0, 30]
          },
          
          // Personal Information Section
          {
            text: '1. PERSONAL INFORMATION',
            style: 'sectionHeader',
            margin: [0, 0, 0, 10]
          },
          {
            table: {
              widths: ['*', '*', '*', '*'],
              body: [
                [
                  { text: 'Full Name:', bold: true },
                  application.full_name,
                  { text: 'Title:', bold: true },
                  application.title
                ],
                [
                  { text: 'Date of Birth:', bold: true },
                  formatDate(application.date_of_birth),
                  { text: 'Nationality:', bold: true },
                  application.nationality
                ],
                [
                  { text: 'ID/Passport No:', bold: true },
                  application.id_number,
                  { text: 'Religion:', bold: true },
                  application.religion || 'N/A'
                ],
                [
                  { text: 'Gender:', bold: true },
                  application.title === 'Mr' ? 'Male' : 'Female',
                  { text: 'Email:', bold: true },
                  application.email
                ]
              ]
            },
            layout: {
              hLineWidth: function(_i: number, _node: any) { return 0.5; },
              vLineWidth: function(_i: number, _node: any) { return 0.5; },
              hLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              vLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              paddingLeft: function(_i: number, _node: any) { return 5; },
              paddingRight: function(_i: number, _node: any) { return 5; },
              paddingTop: function(_i: number, _node: any) { return 3; },
              paddingBottom: function(_i: number, _node: any) { return 3; }
            },
            margin: [0, 0, 0, 20]
          },

          // Contact Information Section
          {
            text: '2. CONTACT & LOCATION',
            style: 'sectionHeader',
            margin: [0, 0, 0, 10]
          },
          {
            table: {
              widths: ['*', '*'],
              body: [
                [
                  { text: 'Phone Number:', bold: true },
                  application.phone_number
                ],
                [
                  { text: 'County:', bold: true },
                  application.county
                ],
                [
                  { text: 'Sub-County:', bold: true },
                  application.sub_county
                ],
                [
                  { text: 'P.O. Box:', bold: true },
                  application.po_box
                ],
                [
                  { text: 'Town/City:', bold: true },
                  application.town
                ]
              ]
            },
            layout: {
              hLineWidth: function(_i: number, _node: any) { return 0.5; },
              vLineWidth: function(_i: number, _node: any) { return 0.5; },
              hLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              vLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              paddingLeft: function(_i: number, _node: any) { return 5; },
              paddingRight: function(_i: number, _node: any) { return 5; },
              paddingTop: function(_i: number, _node: any) { return 3; },
              paddingBottom: function(_i: number, _node: any) { return 3; }
            },
            margin: [0, 0, 0, 20]
          },

          // Academic Information Section
          {
            text: '3. ACADEMIC INFORMATION',
            style: 'sectionHeader',
            margin: [0, 0, 0, 10]
          },
          {
            table: {
              widths: ['*', '*'],
              body: [
                [
                  { text: 'Course Name:', bold: true },
                  application.course_name
                ],
                [
                  { text: 'Level of Study:', bold: true },
                  application.level_of_study || 'N/A'
                ],
                [
                  { text: 'Mode of Study:', bold: true },
                  application.mode_of_study || 'N/A'
                ]
              ]
            },
            layout: {
              hLineWidth: function(_i: number, _node: any) { return 0.5; },
              vLineWidth: function(_i: number, _node: any) { return 0.5; },
              hLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              vLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              paddingLeft: function(_i: number, _node: any) { return 5; },
              paddingRight: function(_i: number, _node: any) { return 5; },
              paddingTop: function(_i: number, _node: any) { return 3; },
              paddingBottom: function(_i: number, _node: any) { return 3; }
            },
            margin: [0, 0, 0, 20]
          },

          // Next of Kin Section
          {
            text: '4. NEXT OF KIN INFORMATION',
            style: 'sectionHeader',
            margin: [0, 0, 0, 10]
          },
          {
            table: {
              widths: ['*', '*'],
              body: [
                [
                  { text: 'Next of Kin Name:', bold: true },
                  application.next_of_kin
                ],
                [
                  { text: 'Next of Kin Phone:', bold: true },
                  application.next_of_kin_phone
                ]
              ]
            },
            layout: {
              hLineWidth: function(_i: number, _node: any) { return 0.5; },
              vLineWidth: function(_i: number, _node: any) { return 0.5; },
              hLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              vLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              paddingLeft: function(_i: number, _node: any) { return 5; },
              paddingRight: function(_i: number, _node: any) { return 5; },
              paddingTop: function(_i: number, _node: any) { return 3; },
              paddingBottom: function(_i: number, _node: any) { return 3; }
            },
            margin: [0, 0, 0, 20]
          },

          // Financing Section
          {
            text: '5. FINANCING INFORMATION',
            style: 'sectionHeader',
            margin: [0, 0, 0, 10]
          },
          {
            table: {
              widths: ['*'],
              body: [
                [
                  { text: 'Financier/Sponsor:', bold: true },
                ],
                [
                  application.financier || 'N/A'
                ]
              ]
            },
            layout: {
              hLineWidth: function(_i: number, _node: any) { return 0.5; },
              vLineWidth: function(_i: number, _node: any) { return 0.5; },
              hLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              vLineColor: function(_i: number, _node: any) { return '#e2e8f0'; },
              paddingLeft: function(_i: number, _node: any) { return 5; },
              paddingRight: function(_i: number, _node: any) { return 5; },
              paddingTop: function(_i: number, _node: any) { return 3; },
              paddingBottom: function(_i: number, _node: any) { return 3; }
            },
            margin: [0, 0, 0, 30]
          },

          // Declaration Section
          {
            text: 'DECLARATION',
            style: 'sectionHeader',
            margin: [0, 0, 0, 10]
          },
          {
            text: [
              'I hereby declare that the information provided in this application is true and complete to the best of my knowledge. ',
              'I understand that any false information may lead to the cancellation of my admission.\n\n',
              'Date: ____________________________\n\n',
              'Applicant\'s Signature: ________________________\n\n',
              'Principal\'s Signature: ________________________'
            ],
            margin: [0, 0, 0, 30]
          },

          // Generated timestamp
          {
            text: `Generated on: ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}`,
            alignment: 'center',
            fontSize: 9,
            color: '#718096',
            margin: [0, 20, 0, 0]
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            color: '#2d3748'
          },
          sectionHeader: {
            fontSize: 14,
            bold: true,
            color: '#4a5568',
            decoration: 'underline',
            decorationColor: '#cbd5e0',
            decorationStyle: 'solid'
          }
        },
        defaultStyle: {
          font: 'Helvetica',
          fontSize: 11,
          lineHeight: 1.3
        }
      };

      // Create PDF
      const fonts = {
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique'
        }
      };

      const printer = new PdfPrinter(fonts);
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      
      // Convert to buffer
      const chunks: Buffer[] = [];
      pdfDoc.on('data', (chunk: Buffer) => chunks.push(chunk));
      
      const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        pdfDoc.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        pdfDoc.on('error', reject);
        pdfDoc.end();
      });

      // Set headers for PDF download
      c.header('Content-Type', 'application/pdf');
      c.header('Content-Disposition', `attachment; filename="Alphil_College_Application_${id}.pdf"`);
      return c.body(pdfBuffer);

    } catch (error: any) {
      console.error("Error generating PDF:", error);
      return c.json({
        error: "Failed to generate document",
        message: error.message,
        suggestion: "Check server logs for detailed error information"
      }, 500);
    }
  }

  static async getAllApplications(c: Context) {
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