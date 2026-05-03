# 🚀 Deployment Checklist - Dr. Mehrotra Dental & Implant Center

## Pre-Deployment Setup

### 1. Environment Configuration ✓
- [ ] Create `.env` file with all required variables (see .env.example)
- [ ] Set `GEMINI_API_KEY` - Get from [Google AI Studio](https://ai.google.dev/)
- [ ] Set `APP_URL` - Your production domain (e.g., https://drmehrotra.com)
- [ ] Set `GOOGLE_SHEET_ID` - Your Google Sheets ID
- [ ] Set `GOOGLE_CLIENT_EMAIL` - Service account email
- [ ] Set `GOOGLE_PRIVATE_KEY` - Service account private key
- [ ] Set `RESEND_API_KEY` - Email service key from [Resend](https://resend.com/)

### 2. Google Sheets Setup
- [ ] Create a Google Sheet for appointment tracking
- [ ] Create a service account in Google Cloud Console
- [ ] Enable Google Sheets API
- [ ] Share the spreadsheet with the service account email
- [ ] Format sheet headers: `Timestamp | Name | Email | Phone | Date | Time | Service`

### 3. Email Integration (Resend)
- [ ] Sign up at [Resend](https://resend.com/)
- [ ] Create API key
- [ ] Verify domain or use test email configuration
- [ ] Update the email template in `server.ts` if needed

### 4. Code Quality
- [ ] Run `npm run lint` - Check for TypeScript errors
- [ ] Test locally: `npm run dev`
- [ ] Test booking form functionality
- [ ] Test email notifications
- [ ] Test admin panel authentication

### 5. Build & Production
- [ ] Run `npm run clean` - Clear previous builds
- [ ] Run `npm run build` - Create production build
- [ ] Verify `dist/` folder is created
- [ ] Test production build locally: `npm start`

## Deployment Platform Options

### Option A: Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel --prod
```
- [ ] Connect GitHub repository
- [ ] Set environment variables in Vercel dashboard
- [ ] Deploy automatically on push to main branch

### Option B: Railway
- [ ] Create account at [Railway](https://railway.app/)
- [ ] Connect GitHub repository
- [ ] Add environment variables
- [ ] Deploy from Railway dashboard

### Option C: Render
- [ ] Create account at [Render](https://render.com/)
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Set start command: `npm start`
- [ ] Add environment variables

### Option D: Self-Hosted (VPS/Server)
- [ ] Set up Ubuntu server or similar
- [ ] Install Node.js v20+
- [ ] Install PM2 for process management
- [ ] Clone repository
- [ ] Install dependencies: `npm install`
- [ ] Build: `npm run build`
- [ ] Start with PM2: `pm2 start npm --name "dental-clinic" -- start`
- [ ] Set up Nginx reverse proxy
- [ ] SSL certificate (Let's Encrypt)

## Post-Deployment

### Testing
- [ ] Test all website pages load correctly
- [ ] Test booking form submission
- [ ] Verify data appears in Google Sheets
- [ ] Verify confirmation emails are sent
- [ ] Test admin panel login
- [ ] Test mobile responsiveness
- [ ] Test on different browsers

### Monitoring
- [ ] Set up error logging/monitoring
- [ ] Monitor server performance
- [ ] Set up automated backups
- [ ] Monitor email delivery rates

### DNS & Domain
- [ ] Point domain to deployment URL
- [ ] Update `APP_URL` in environment variables
- [ ] Verify SSL certificate is valid
- [ ] Set up WWW redirects if needed

## Production Best Practices

### Security
- [ ] Enable CORS restrictions in production
- [ ] Use environment variables for all secrets (never hardcode)
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Regular security checks

### Performance
- [ ] Enable caching headers
- [ ] Compress assets with Vite build
- [ ] Monitor Core Web Vitals
- [ ] Consider CDN for static assets

### Backup & Recovery
- [ ] Back up Google Sheets data regularly
- [ ] Document recovery procedures
- [ ] Test backup restoration

## Rollback Plan

If deployment has critical issues:
1. Revert to previous deployment
2. Check error logs
3. Fix issue locally
4. Test thoroughly
5. Deploy again

---

## Quick Start Commands

```bash
# Local development
npm install
npm run dev

# Build for production
npm run build

# Test production build locally
npm start

# Clean build
npm run clean

# Lint check
npm run lint

# Deploy to Vercel
vercel --prod
```

## Support Resources

- [Vite Documentation](https://vitejs.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Resend Documentation](https://resend.com/docs)

---

**Last Updated:** May 3, 2026
**Status:** Ready for deployment
