# Dr. Mehrotra Dental & Implant Center - Production Deployment Guide

## 🚀 Quick Start - Deploy in 5 Minutes

### 1. **Prepare for Production**
```bash
# Remove previous builds
npm run clean

# Build the application
npm run build

# Test production build locally
npm start
```

### 2. **Choose Your Hosting Platform**

## Deployment Platforms

### **Vercel** (Recommended - Zero Config)
Best for: Easiest deployment, automatic updates

```bash
npm install -g vercel
vercel login
vercel --prod
```

**Setup steps:**
1. Connect your GitHub account to Vercel
2. Import repository
3. Add environment variables:
   - Settings → Environment Variables
   - Add all variables from `.env.local`
4. Deploy

**Auto-deploy**: Every push to main branch automatically deploys

---

### **Railway**
Best for: Simple setup, good performance

1. Go to [Railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Railway will auto-detect Node.js
5. Add environment variables:
   - Settings → Variables
   - Paste all from `.env.local`
6. Deploy

**Port**: Railway automatically assigns PORT 5000

---

### **Render**
Best for: Free tier available, reliable

1. Go to [Render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub
4. Configuration:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Add environment variables
5. Deploy

**Note**: Free tier has limitations, consider Paid for production

---

### **AWS EC2**
Best for: Full control, scalability

1. Launch EC2 instance (Ubuntu 20.04 LTS)
2. SSH into instance
3. Setup Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. Clone repository:
   ```bash
   git clone <your-repo-url>
   cd dr.-mehrotra-dental-implant-center
   ```
5. Install dependencies:
   ```bash
   npm install
   ```
6. Create `.env` file with all environment variables
7. Build:
   ```bash
   npm run build
   ```
8. Install PM2 (process manager):
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "dental-clinic" -- start
   pm2 startup
   pm2 save
   ```
9. Setup reverse proxy with Nginx:
   ```bash
   sudo apt-get install nginx
   ```
10. Configure SSL with Let's Encrypt

---

### **Docker Deployment**
Best for: Container-based infrastructure

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t dental-clinic .
docker run -p 3000:3000 --env-file .env dental-clinic
```

Deploy to Docker Hub or container registry

---

## 🔒 Production Checklist

### Before Going Live
- [ ] All environment variables configured
- [ ] SSL certificate setup (HTTPS)
- [ ] Database backups configured
- [ ] Error monitoring enabled
- [ ] Email service verified (Resend)
- [ ] Google Sheets access verified
- [ ] Admin panel secure (authentication)
- [ ] Performance optimized
- [ ] Mobile responsive tested
- [ ] Cross-browser testing done

### Security
- [ ] CORS properly configured
- [ ] API rate limiting enabled
- [ ] Secrets in environment (never hardcoded)
- [ ] Dependencies up to date
- [ ] HTTPS enforced
- [ ] Security headers configured

### Monitoring
- [ ] Error logging setup (e.g., Sentry)
- [ ] Performance monitoring (e.g., DataDog)
- [ ] Uptime monitoring setup
- [ ] Log aggregation configured

---

## 📊 Domain Setup

### Connect Your Domain

1. **Get domain** from registrar (GoDaddy, Namecheap, etc.)
2. **Update environment variable**:
   - Change `APP_URL` to your domain
   - Redeploy application
3. **Configure DNS**:
   
   **For Vercel:**
   - Copy nameservers from Vercel
   - Update in domain registrar
   - Or point A record to Vercel IP
   
   **For Railway/Render:**
   - Get CNAME from platform
   - Add CNAME record in DNS
   
   **For custom VPS:**
   - Point A record to server IP

4. **SSL Certificate**:
   - Vercel/Railway/Render: Automatic
   - VPS: Use Let's Encrypt
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot certonly --nginx -d yourdomain.com
   ```

---

## 🔄 Continuous Deployment

### GitHub Actions (Auto Deploy on Push)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## 📈 Performance Optimization

### Vite Build Optimization
- Already configured with tree-shaking
- CSS minification
- Code splitting for routes

### Server Performance
```javascript
// In production, consider adding:
// - Gzip compression
// - Caching headers
// - CDN for static assets
```

---

## 🆘 Troubleshooting Deployment

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Build Fails
```bash
npm run clean
npm install
npm run build
```

### Environment Variables Not Loading
- Confirm `.env.local` is in root directory
- Restart server after adding variables
- Check variable names match exactly

### Google Sheets Not Syncing
- Verify service account has access to sheet
- Check private key format (should have literal `\n`)
- Confirm GOOGLE_SHEET_ID is correct

### Emails Not Sending
- Verify RESEND_API_KEY is valid
- Check domain verification in Resend
- Ensure email address is correct format

---

## 📞 Support

- [Express.js Docs](https://expressjs.com)
- [Vite Docs](https://vitejs.dev)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)

---

**Deployed by:** Dr. Mehrotra Dental Team
**Last updated:** May 3, 2026
**Status:** Production Ready ✅
