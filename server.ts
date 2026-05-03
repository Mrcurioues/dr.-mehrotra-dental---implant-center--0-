import express from "express";
import "dotenv/config";
import { createServer as createViteServer } from "vite";
import path from "path";
import { google } from "googleapis";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for appointments
  app.post("/api/appointments", async (req, res) => {
    const { patientName, email, phone, date, time, service } = req.body;

    try {
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
      let privateKey = process.env.GOOGLE_PRIVATE_KEY;
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      if (!spreadsheetId || !clientEmail || !privateKey) {
        console.warn("Google Sheets credentials missing.");
        return res.json({ 
          success: true, 
          synced: false,
          warning: "Configuration missing. Please set GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, and GOOGLE_PRIVATE_KEY in Settings -> Secrets." 
        });
      }

      // Robustly clean and format the private key
      let processedKey = privateKey.trim();
      
      // 1. Remove any surrounding quotes
      processedKey = processedKey.replace(/^['"]|['"]$/g, '');

      // 2. Replace literal \n with real newlines
      processedKey = processedKey.replace(/\\n/g, "\n");
      
      // Debug check (safe length check)
      console.log(`Key processed. Length: ${processedKey.length}`);

      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: processedKey,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      // 1. Get the spreadsheet metadata to find the sheetId
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId,
      });
      // Try to find Sheet1, otherwise take the first sheet
      const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title === "Sheet1") || spreadsheet.data.sheets?.[0];
      const sheetId = sheet?.properties?.sheetId;
      const sheetTitle = sheet?.properties?.title || "Sheet1";

      if (sheetId !== undefined) {
        // 2. Insert a new row at index 1 (below header)
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                insertDimension: {
                  range: {
                    sheetId,
                    dimension: "ROWS",
                    startIndex: 1,
                    endIndex: 2,
                  },
                  inheritFromBefore: false,
                },
              },
            ],
          },
        });

        // 3. Update the newly inserted row with data
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${sheetTitle}!A2:G2`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                new Date().toLocaleString(),
                patientName,
                email,
                phone,
                date,
                time,
                service,
              ],
            ],
          },
        });
      } else {
        // Fallback to append if sheetId not found
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: "Sheet1!A:G",
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                new Date().toLocaleString(),
                patientName,
                email,
                phone,
                date,
                time,
                service,
              ],
            ],
          },
        });
      }
      
      let emailSent = false;
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        try {
          const resend = new Resend(resendApiKey);
          await resend.emails.send({
            from: 'Smile Bright <onboarding@resend.dev>',
            to: [email],
            subject: 'Appointment Requested - Dr. Mehrotra Dental',
            html: `
              <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #2563eb; padding: 20px; text-align: center;">
                  <h1 style="color: white; margin: 0;">Smile Bright</h1>
                </div>
                <div style="padding: 30px;">
                  <h2 style="color: #2563eb;">Appointment Request Received</h2>
                  <p>Hello <strong>${patientName}</strong>,</p>
                  <p>Thank you for choosing Dr. Mehrotra Dental. We have received your appointment request for:</p>
                  <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>
                    <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
                    <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
                  </div>
                  <p>Our team will review your request and contact you at <strong>${phone}</strong> shortly to confirm your booking.</p>
                  <p>If you have any questions, feel free to reply to this email or call us directly.</p>
                  <br />
                  <p>Best regards,<br />The Smile Bright Team</p>
                </div>
                <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
                  © 2026 Dr. Mehrotra Dental. All rights reserved.
                </div>
              </div>
            `
          });
          emailSent = true;
          console.log(`Confirmation email sent to ${email}`);
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError);
        }
      } else {
        console.warn("RESEND_API_KEY missing - skipping confirmation email.");
      }

      res.json({ success: true, synced: true, emailSent });
    } catch (error) {
      console.error("Error writing to Google Sheets:", error);
      // We return 200 even on error to not block the user experience, but log the error
      res.json({ 
        success: true, 
        synced: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
