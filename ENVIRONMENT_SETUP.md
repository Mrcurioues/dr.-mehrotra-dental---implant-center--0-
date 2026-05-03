# Environment Variables Setup Guide

## Quick Start

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in all required environment variables

3. Keep `.env.local` private (add to `.gitignore`)

## Required Variables

### GEMINI_API_KEY
**Purpose:** AI features for content generation

**How to get:**
1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create API key for your project
4. Copy the key to `GEMINI_API_KEY` in `.env`

**Example:**
```
GEMINI_API_KEY="AIzaSyD1234567890abcdefghijklmnopqrst"
```

### APP_URL
**Purpose:** Base URL for your application

**For local development:**
```
APP_URL="http://localhost:3000"
```

**For production:**
```
APP_URL="https://yourdomain.com"
```

### Google Sheets Setup

#### GOOGLE_SHEET_ID
The ID from your Google Sheet URL: `https://docs.google.com/spreadsheets/d/{GOOGLE_SHEET_ID}`

#### GOOGLE_CLIENT_EMAIL
Service account email from Google Cloud Console

#### GOOGLE_PRIVATE_KEY
Private key from service account JSON file

**How to set up Google Sheets integration:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Sheets API
4. Create a Service Account:
   - Go to "Service Accounts"
   - Click "Create Service Account"
   - Fill in details and create
5. Create and download JSON key:
   - Click on the service account
   - Go to "Keys" tab
   - Create new JSON key
   - Download the file
6. From the JSON file, copy:
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`
7. Create Google Sheet and share it with the service account email
8. Format your sheet with headers: `Timestamp | Name | Email | Phone | Date | Time | Service`

**Important:** The private key contains `\n` characters. Keep them as literal `\n` in `.env`:
```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BA...\n-----END PRIVATE KEY-----\n"
```

### RESEND_API_KEY
**Purpose:** Email service for sending confirmation emails

**How to get:**
1. Sign up at [Resend](https://resend.com/)
2. Go to API Keys
3. Create new API key
4. Copy to `RESEND_API_KEY`

**Note:** For testing, Resend provides a test email. For production, verify your domain in Resend dashboard.

## Example `.env.local` File

```env
# AI
GEMINI_API_KEY="AIzaSyD..."

# App Configuration
APP_URL="http://localhost:3000"

# Google Sheets
GOOGLE_SHEET_ID="1abc123def456..."
GOOGLE_CLIENT_EMAIL="dental-clinic@project-123.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG...\n-----END PRIVATE KEY-----\n"

# Email Service
RESEND_API_KEY="re_abc123def456..."
```

## Deployment Platforms

### Vercel
1. Copy environment variables to Vercel dashboard
2. Settings → Environment Variables
3. Paste each variable

### Railway
1. Settings → Variables
2. Add each environment variable

### Render
1. Environment → Environment Variables
2. Add each variable

### Self-Hosted
1. Create `.env` file with all variables
2. Start server: `npm start`

## Security Best Practices

✅ **DO:**
- Use strong API keys
- Rotate keys regularly
- Use separate keys for dev/prod
- Never commit `.env` files

❌ **DON'T:**
- Share your API keys
- Commit `.env` to git
- Use same keys across environments
- Log sensitive data

## Testing Environment Variables

Start the development server:
```bash
npm run dev
```

The server will show warnings if required variables are missing.

## Troubleshooting

### "GEMINI_API_KEY is not set"
- Make sure `.env.local` file exists
- Verify key is correctly copied
- Restart dev server

### "Google Sheets API error"
- Check GOOGLE_SHEET_ID is correct
- Verify service account has access to the sheet
- Check if GOOGLE_CLIENT_EMAIL is correct

### "Email not sending"
- Verify RESEND_API_KEY is correct
- Check if domain is verified in Resend
- Check email address format

---

**Note:** Environment variables are loaded at server startup. Changes require restart.
