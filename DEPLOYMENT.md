# 🚀 Deployment Guide — Dhanya Trader's Website

Complete production deployment guide for the Dhanya Trader's corporate website.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development](#local-development)
4. [MongoDB Atlas Setup](#mongodb-atlas-setup)
5. [Email (SMTP) Setup](#email-smtp-setup)
6. [Environment Variables](#environment-variables)
7. [Option A: Deploy to Vercel (Recommended)](#option-a-deploy-to-vercel-recommended)
8. [Option B: Deploy to AWS EC2 with Docker](#option-b-deploy-to-aws-ec2-with-docker)
9. [Domain & SSL Setup](#domain--ssl-setup)
10. [Admin Account Setup](#admin-account-setup)
11. [Post-Deployment Checklist](#post-deployment-checklist)
12. [Monthly Cost Analysis](#monthly-cost-analysis)
13. [Monitoring & Maintenance](#monitoring--maintenance)
14. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    INTERNET                         │
│                       │                             │
│              ┌────────▼────────┐                    │
│              │   Cloudflare    │  (DNS + CDN)       │
│              │   DNS / CDN     │                    │
│              └────────┬────────┘                    │
│                       │                             │
│  ┌────────────────────▼────────────────────────┐    │
│  │              NGINX (Port 80/443)            │    │
│  │  • SSL Termination (Let's Encrypt)          │    │
│  │  • Gzip Compression                         │    │
│  │  • Rate Limiting                            │    │
│  │  • Static File Caching                      │    │
│  │  • Reverse Proxy                            │    │
│  └────────────────────┬────────────────────────┘    │
│                       │                             │
│  ┌────────────────────▼────────────────────────┐    │
│  │           Next.js App (Port 3000)           │    │
│  │  • Server-Side Rendering                    │    │
│  │  • API Routes                               │    │
│  │  • Admin Dashboard                          │    │
│  │  • Static Generation                        │    │
│  └────────────────────┬────────────────────────┘    │
│                       │                             │
│  ┌────────────────────▼────────────────────────┐    │
│  │          MongoDB Atlas (Cloud)              │    │
│  │  • inquiries collection                     │    │
│  │  • contacts collection                      │    │
│  │  • admins collection                        │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │           Gmail SMTP                        │    │
│  │  • Inquiry notifications                    │    │
│  │  • Contact form notifications               │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Prerequisites

- **Node.js** ≥ 18.17 (LTS recommended)
- **npm** ≥ 9
- **Git**
- **MongoDB Atlas** account (free tier)
- **Gmail** account (for SMTP)
- **Domain name** (optional, e.g., dhanyatraders.com)

---

## Local Development

### 1. Clone & Install

```bash
git clone <your-repo-url> dhanyaweb
cd dhanyaweb
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (see [Environment Variables](#environment-variables)).

### 3. Generate Admin Password Hash

```bash
# Start the dev server
npm run dev

# In another terminal, generate your password hash:
curl -X PUT http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"password": "YourSecurePassword123!"}'
```

Copy the returned hash and set it as `ADMIN_PASSWORD_HASH` in `.env.local`.

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Build & Test Production Locally

```bash
npm run build
npm start
```

---

## MongoDB Atlas Setup

### 1. Create Account & Cluster

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a **free account**
3. Create a new project: `DhanyaTraders`
4. Click **"Build a Database"**
5. Select **M0 Free Tier** (512 MB)
6. Choose region closest to your users (e.g., Mumbai `ap-south-1`)
7. Cluster name: `dhanyatraders`

### 2. Configure Access

1. **Database Access** → Add a database user:
   - Username: `dhanya_app`
   - Password: Generate a strong password (save it!)
   - Role: `readWriteAnyDatabase`

2. **Network Access** → Add IP address:
   - For development: Add your current IP
   - For production: Add your server's IP
   - For Vercel: Add `0.0.0.0/0` (allow all — MongoDB auth protects access)

### 3. Get Connection String

1. Click **"Connect"** → **"Connect your application"**
2. Copy the connection string:
   ```
   mongodb+srv://dhanya_app:<password>@dhanyatraders.xxxxx.mongodb.net/dhanyatraders?retryWrites=true&w=majority
   ```
3. Replace `<password>` with the password you created

### 4. Create Collections (Optional — Auto-Created)

MongoDB will auto-create collections on first insert. Optionally create indexes:

```javascript
// In MongoDB Atlas → Collections → dhanyatraders database
// Create indexes for better query performance:

// inquiries collection
db.inquiries.createIndex({ createdAt: -1 })
db.inquiries.createIndex({ status: 1 })
db.inquiries.createIndex({ email: 1 })

// contacts collection
db.contacts.createIndex({ createdAt: -1 })
```

---

## Email (SMTP) Setup

### Gmail App Password (Recommended)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (required)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select app: **Mail**, device: **Other** → Enter "Dhanya Traders Website"
5. Copy the 16-character app password
6. Use these settings:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx  (the app password)
   ```

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dhanyatraders` |
| `JWT_SECRET` | Secret for JWT signing (min 32 chars) | `your-very-long-random-secret-key-here-min-32` |
| `ADMIN_EMAIL` | Admin login email | `admin@dhanyatraders.com` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password | `$2a$10$...` |
| `SMTP_HOST` | Email SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username/email | `your-email@gmail.com` |
| `SMTP_PASS` | SMTP password / app password | `xxxx xxxx xxxx xxxx` |
| `NOTIFICATION_EMAIL` | Email to receive notifications | `info@dhanyatraders.com` |
| `NEXT_PUBLIC_SITE_URL` | Public website URL | `https://dhanyatraders.com` |

### Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Option A: Deploy to Vercel (Recommended)

**Best for**: Quick deployment, auto-scaling, zero DevOps, free tier.

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Dhanya Traders website"
git remote add origin https://github.com/YOUR_USERNAME/dhanyaweb.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **"Import Project"** → Select your repository
3. Framework: **Next.js** (auto-detected)
4. Add all environment variables from the table above
5. Click **"Deploy"**

### 3. Configure Custom Domain (Optional)

1. In Vercel dashboard → **Settings** → **Domains**
2. Add your domain: `dhanyatraders.com`
3. Update your DNS records as instructed by Vercel
4. SSL is automatic

### Vercel Advantages
- ✅ Zero configuration deployment
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN (Edge Network)
- ✅ Automatic builds on git push
- ✅ Serverless functions for API routes
- ✅ Free tier: 100 GB bandwidth/month
- ✅ Preview deployments for PRs

---

## Option B: Deploy to AWS EC2 with Docker

**Best for**: Full control, custom infrastructure, self-hosted.

### 1. Launch EC2 Instance

1. Go to [AWS Console](https://console.aws.amazon.com/ec2/)
2. Launch instance:
   - **AMI**: Ubuntu 22.04 LTS
   - **Instance type**: `t2.micro` (free tier) or `t3.micro`
   - **Storage**: 20 GB gp3
   - **Security Group** rules:
     | Port | Source | Purpose |
     |------|--------|---------|
     | 22   | Your IP | SSH |
     | 80   | 0.0.0.0/0 | HTTP |
     | 443  | 0.0.0.0/0 | HTTPS |

3. Create/select a key pair and download `.pem` file

### 2. Server Setup

```bash
# SSH into your server
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Install Certbot (for SSL)
sudo apt install certbot -y

# Create app directory
mkdir -p /home/ubuntu/dhanyaweb
cd /home/ubuntu/dhanyaweb
```

### 3. Clone & Configure

```bash
git clone <your-repo-url> .

# Create .env file
nano .env
```

Add all environment variables from the table above.

### 4. SSL Certificate (Let's Encrypt)

```bash
# Stop anything on port 80 first
sudo certbot certonly --standalone -d dhanyatraders.com -d www.dhanyatraders.com

# Certificates will be at:
# /etc/letsencrypt/live/dhanyatraders.com/fullchain.pem
# /etc/letsencrypt/live/dhanyatraders.com/privkey.pem

# Set up auto-renewal
sudo crontab -e
# Add this line:
# 0 3 * * * certbot renew --quiet --post-hook "docker compose restart nginx"
```

### 5. Update Nginx Config

Edit `nginx/nginx.conf` and replace `your-domain.com` with `dhanyatraders.com`.

Update the SSL certificate paths:
```nginx
ssl_certificate /etc/letsencrypt/live/dhanyatraders.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/dhanyatraders.com/privkey.pem;
```

Update `docker-compose.yml` to mount certificates:
```yaml
nginx:
  volumes:
    - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    - /etc/letsencrypt:/etc/letsencrypt:ro
```

### 6. Build & Deploy

```bash
# Build and start containers
docker compose up -d --build

# Check status
docker compose ps

# View logs
docker compose logs -f app
docker compose logs -f nginx
```

### 7. Set Up Auto-Restart

```bash
# Enable Docker to start on boot
sudo systemctl enable docker

# Containers will auto-restart due to restart: unless-stopped policy
```

---

## Domain & SSL Setup

### Option 1: Cloudflare (Recommended)

1. Add domain to [Cloudflare](https://cloudflare.com)
2. Update nameservers at your registrar
3. Add DNS records:
   | Type | Name | Value |
   |------|------|-------|
   | A | @ | Your Server IP |
   | A | www | Your Server IP |
   | CNAME | @ | your-app.vercel.app (if Vercel) |
4. Enable **Proxied** (orange cloud) for CDN + DDoS protection
5. SSL mode: **Full (Strict)**

### Option 2: Direct DNS

At your domain registrar, add:
- **A Record**: `@` → Your Server IP
- **A Record**: `www` → Your Server IP

---

## Admin Account Setup

### 1. Generate Password Hash

**Development mode:**
```bash
curl -X PUT http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"password": "YourSecureAdminPassword!"}'
```

**Or using Node.js:**
```bash
node -e "
const bcrypt = require('bcryptjs');
bcrypt.hash('YourSecureAdminPassword!', 10).then(hash => console.log(hash));
"
```

### 2. Set Environment Variables

```env
ADMIN_EMAIL=admin@dhanyatraders.com
ADMIN_PASSWORD_HASH=$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Access Admin Dashboard

- URL: `https://dhanyatraders.com/admin`
- Login with the email and password (not the hash)

---

## Post-Deployment Checklist

- [ ] Website loads at your domain
- [ ] All 5 pages render correctly (Home, About, Products, Inquiry, Contact)
- [ ] SSL certificate is valid (green padlock)
- [ ] Contact form submits successfully
- [ ] Inquiry form submits successfully
- [ ] Email notifications are received
- [ ] Admin login works
- [ ] Admin dashboard shows inquiries
- [ ] WhatsApp button links to correct number
- [ ] Google Maps embed loads
- [ ] Mobile responsive design works
- [ ] SEO meta tags present (check with [SEO analyzer](https://www.seoptimer.com/))
- [ ] robots.txt accessible at `/robots.txt`
- [ ] sitemap.xml accessible at `/sitemap.xml`
- [ ] No console errors in browser DevTools
- [ ] Images load properly
- [ ] Animations work smoothly
- [ ] Rate limiting works (try submitting forms rapidly)

---

## Monthly Cost Analysis

### Option A: Vercel + MongoDB Atlas (Recommended — Nearly Free)

| Service | Tier | Monthly Cost |
|---------|------|-------------|
| **Vercel** | Hobby (Free) | $0 |
| **MongoDB Atlas** | M0 Free (512 MB) | $0 |
| **Gmail SMTP** | Free (500 emails/day) | $0 |
| **Cloudflare** | Free (CDN + DNS) | $0 |
| **Domain** | .com renewal | ~$1/mo ($12/yr) |
| **Total** | | **~$1/month** |

### Option B: AWS EC2 + Docker

| Service | Tier | Monthly Cost |
|---------|------|-------------|
| **EC2** | t2.micro (free 1yr) / t3.micro | $0 → $8.50/mo |
| **MongoDB Atlas** | M0 Free (512 MB) | $0 |
| **Gmail SMTP** | Free | $0 |
| **Elastic IP** | Free (if attached) | $0 |
| **Cloudflare** | Free | $0 |
| **Domain** | .com renewal | ~$1/mo |
| **Total (Year 1)** | | **~$1/month** |
| **Total (After Free Tier)** | | **~$10/month** |

### Cost Optimization Tips

1. **Use Vercel** for hosting — it's free and optimized for Next.js
2. **MongoDB Atlas M0** handles up to ~500 connections and 512 MB data — plenty for this site
3. **Gmail SMTP** supports 500 emails/day — more than enough for inquiry notifications
4. **Cloudflare Free** provides CDN, DDoS protection, and DNS management
5. If outgrowing free tiers:
   - Vercel Pro: $20/mo (better for high traffic)
   - MongoDB Atlas M2: $9/mo (2 GB storage)
   - AWS SES: $0.10/1000 emails (cheaper than upgrading Gmail)

---

## Monitoring & Maintenance

### Health Checks

```bash
# Check if site is up
curl -I https://dhanyatraders.com

# Check API health
curl https://dhanyatraders.com/api/inquiry -X POST -H "Content-Type: application/json"

# Docker container status (EC2)
docker compose ps
docker stats
```

### Log Monitoring (EC2)

```bash
# View application logs
docker compose logs -f app --tail=100

# View nginx access logs
docker compose logs -f nginx --tail=100
```

### Regular Maintenance

| Task | Frequency | Command |
|------|-----------|---------|
| Check SSL renewal | Monthly | `sudo certbot renew --dry-run` |
| Update dependencies | Monthly | `npm audit` + `npm update` |
| Check MongoDB disk | Monthly | MongoDB Atlas Dashboard |
| Backup MongoDB | Weekly | Atlas → Backup (auto on M2+) |
| Update Docker images | Monthly | `docker compose pull && docker compose up -d` |
| Review security headers | Quarterly | [securityheaders.com](https://securityheaders.com/) |
| Check uptime | Daily (auto) | Set up UptimeRobot (free) |

### Recommended Free Monitoring Tools

- **[UptimeRobot](https://uptimerobot.com/)** — Free uptime monitoring (5-min checks, email alerts)
- **[Google Search Console](https://search.google.com/search-console)** — SEO & indexing monitoring
- **[Google Analytics](https://analytics.google.com/)** — Traffic analytics
- **[Sentry](https://sentry.io/)** — Error tracking (free tier)
- **Vercel Analytics** — Performance monitoring (included with Vercel)

---

## Troubleshooting

### Common Issues

#### "Cannot connect to MongoDB"
```bash
# Check connection string format
# Ensure IP whitelist includes your server IP
# Test connection:
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/dhanyatraders"
```

#### "Email notifications not sending"
```bash
# Check SMTP credentials
# Ensure Gmail App Password is correct (not regular password)
# Check if 2FA is enabled on Gmail
# Test SMTP:
node -e "
const nodemailer = require('nodemailer');
const t = nodemailer.createTransport({host:'smtp.gmail.com',port:587,auth:{user:'YOUR_EMAIL',pass:'YOUR_APP_PASSWORD'}});
t.verify().then(() => console.log('SMTP OK')).catch(console.error);
"
```

#### "Admin login fails"
```bash
# Regenerate password hash
node -e "require('bcryptjs').hash('YourPassword', 10).then(console.log)"
# Update ADMIN_PASSWORD_HASH in .env
# Restart the application
```

#### "Docker build fails"
```bash
# Check Docker is running
docker info

# Clear Docker cache and rebuild
docker compose down
docker system prune -f
docker compose up -d --build
```

#### "Site loads but styles are broken"
```bash
# Rebuild the Next.js app
npm run build

# Check for Tailwind CSS purge issues
# Ensure all dynamic class names use full strings, not template literals
```

#### "Rate limiting too aggressive"
```env
# Adjust in .env:
RATE_LIMIT_MAX=20          # Max requests per window
RATE_LIMIT_WINDOW=900000   # Window in ms (15 min)
```

---

## Security Checklist

- [x] HTTPS enforced via Nginx / Vercel
- [x] CSP headers configured
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Rate limiting on API routes
- [x] JWT-based admin authentication
- [x] Password hashing with bcrypt (10 rounds)
- [x] Input sanitization on all forms
- [x] Admin routes protected by middleware
- [x] MongoDB credentials not exposed
- [x] .env files in .gitignore
- [ ] Set up WAF (Cloudflare free provides basic WAF)
- [ ] Enable MongoDB audit logging (M10+ tier)
- [ ] Regular dependency audits (`npm audit`)

---

## Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run locally
npm run dev

# 4. Generate admin password hash
# Visit PUT /api/auth with your password

# 5. Deploy
git push origin main
# Vercel auto-deploys, or run docker compose up -d on EC2
```

---

**Built with ❤️ for Dhanya Trader's**
*Need help? Contact the development team.*
