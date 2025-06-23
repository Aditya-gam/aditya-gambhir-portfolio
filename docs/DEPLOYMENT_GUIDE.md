# Deployment Guide

## 🚀 Overview

This guide covers the complete deployment process for the Aditya Gambhir Portfolio, from development to production on Vercel platform, including CI/CD setup, environment configuration, and maintenance procedures.

## 🌐 Deployment Platforms

### Vercel (Recommended)

**Current Setup**: https://aditya-gambhir-portfolio.vercel.app/

#### Why Vercel?
- **Next.js Optimization**: Built specifically for Next.js applications
- **Automatic CI/CD**: GitHub integration with automatic deployments
- **Edge Network**: Global CDN with excellent performance
- **Serverless Functions**: Built-in API route hosting
- **Zero Configuration**: Minimal setup required
- **Free Tier**: Generous limits for personal projects

## 📋 Pre-Deployment Checklist

### Environment Variables Setup
```bash
# Required for production
MONGODB_URI=mongodb+srv://...
RECAPTCHA_SECRET_KEY=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Public variables
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Build Verification
```bash
# Test production build locally
npm run build
npm start

# Run build analysis
npm run build:analyze

# Check for TypeScript errors
npx tsc --noEmit

# Lint check
npm run lint
```

### Performance Audit
```bash
# Use Lighthouse CLI
npm install -g lighthouse
lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html

# Check Core Web Vitals
# - First Contentful Paint (FCP): < 1.8s
# - Largest Contentful Paint (LCP): < 2.5s
# - Cumulative Layout Shift (CLS): < 0.1
```

## 🔧 Vercel Deployment

### Initial Setup

1. **Connect GitHub Repository**
   ```bash
   # Install Vercel CLI (optional)
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   ```

2. **Import Project in Vercel Dashboard**
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub: `aditya-gambhir-portfolio`
   - Framework: Next.js (auto-detected)
   - Root Directory: `./` (default)

3. **Configure Build Settings**
   ```bash
   # Build Command (default)
   npm run build
   
   # Output Directory (default)
   .next
   
   # Install Command (default)
   npm install
   ```

### Environment Variables Configuration

In Vercel Dashboard → Project Settings → Environment Variables:

```bash
# Production Environment Variables
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_messages
RECAPTCHA_SECRET_KEY=your_production_secret_key
EMAIL_USER=your_production_email@gmail.com
EMAIL_PASS=your_production_app_password

# Public Variables
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_production_site_key
NEXT_PUBLIC_SITE_URL=https://aditya-gambhir-portfolio.vercel.app
```

### Custom Domain Setup

1. **Add Custom Domain**
   - Project Settings → Domains
   - Add your domain (e.g., `adityagambhir.com`)

2. **DNS Configuration**
   ```bash
   # For root domain
   A Record: @ → 76.76.21.21
   
   # For www subdomain
   CNAME Record: www → cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Let's Encrypt certificates
   - Auto-renewal enabled

## ⚙️ CI/CD Pipeline

### Automatic Deployments

Vercel automatically deploys on:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and feature branches
- **Development**: Manual deployments

### GitHub Actions (Optional Enhancement)

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run type checking
      run: npx tsc --noEmit
    
    - name: Run tests
      run: npm test # When tests are added
    
    - name: Build application
      run: npm run build
    
    - name: Run bundle analysis
      run: npm run build:analyze
      env:
        ANALYZE: true

  lighthouse:
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'pull_request'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build and start
      run: |
        npm run build
        npm start &
        sleep 10
    
    - name: Run Lighthouse
      uses: treosh/lighthouse-ci-action@v10
      with:
        configPath: '.lighthouserc.json'
        uploadArtifacts: true
```

### Deployment Hooks

Set up webhook notifications in Vercel:

```javascript
// vercel.json (optional)
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🔍 Monitoring & Analytics

### Vercel Analytics

Enable in Project Settings:
- **Web Analytics**: User behavior tracking
- **Speed Insights**: Performance monitoring
- **Function Logs**: API route monitoring

### Google Analytics (Optional)

1. **Create GA4 Property**
   ```bash
   # Add to environment variables
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

2. **Add Tracking Code**
   ```typescript
   // src/lib/gtag.ts
   export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
   
   export const gtag = (...args: any[]) => {
     (window as any).gtag(...args);
   };
   
   export const pageview = (url: string) => {
     gtag('config', GA_TRACKING_ID, {
       page_path: url,
     });
   };
   ```

### Error Monitoring (Sentry - Optional)

```bash
# Install Sentry
npm install @sentry/nextjs

# Configure sentry.client.config.js
import { init } from '@sentry/nextjs';

init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## 🛡️ Security & Performance

### Security Headers

```javascript
// next.config.ts security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### Performance Optimization

```javascript
// next.config.ts performance settings
module.exports = {
  // Enable compression
  compress: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  },
};
```

## 🔄 Deployment Environments

### Environment Strategy

1. **Development**: `localhost:3000`
   - Local development
   - Hot reloading
   - Debug mode enabled

2. **Preview**: `preview-branch.vercel.app`
   - Pull request previews
   - Feature branch testing
   - Staging environment

3. **Production**: `aditya-gambhir-portfolio.vercel.app`
   - Main branch deployments
   - Production optimizations
   - Analytics enabled

### Environment Variables by Stage

```bash
# Development (.env.local)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# Preview (Vercel Preview)
NEXT_PUBLIC_SITE_URL=https://preview-branch.vercel.app
NODE_ENV=production

# Production (Vercel Production)
NEXT_PUBLIC_SITE_URL=https://aditya-gambhir-portfolio.vercel.app
NODE_ENV=production
```

## 🚨 Rollback Procedures

### Vercel Rollback

1. **Via Dashboard**
   - Go to Deployments tab
   - Find previous successful deployment
   - Click "Promote to Production"

2. **Via CLI**
   ```bash
   # List deployments
   vercel ls
   
   # Promote specific deployment
   vercel promote <deployment-url>
   ```

3. **Via Git**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   
   # Or reset to specific commit
   git reset --hard <commit-hash>
   git push --force-with-lease origin main
   ```

## 📊 Post-Deployment Verification

### Health Checks

```bash
# 1. Site Accessibility
curl -I https://aditya-gambhir-portfolio.vercel.app/
# Expected: 200 OK

# 2. API Endpoints
curl -X POST https://aditya-gambhir-portfolio.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message","captchaToken":"test"}'

# 3. Static Assets
curl -I https://aditya-gambhir-portfolio.vercel.app/headshot.webp
# Expected: 200 OK

# 4. Sitemap
curl -I https://aditya-gambhir-portfolio.vercel.app/sitemap.xml
# Expected: 200 OK
```

### Performance Testing

```bash
# Lighthouse audit
lighthouse https://aditya-gambhir-portfolio.vercel.app/ --output=json

# WebPageTest
# Use https://www.webpagetest.org/

# GTMetrix
# Use https://gtmetrix.com/
```

## 🔧 Maintenance Procedures

### Regular Updates

```bash
# Weekly dependency updates
npm update
npm audit fix

# Monthly major updates
npx npm-check-updates -i

# Security patches (immediate)
npm audit fix --force
```

### Database Maintenance

```bash
# MongoDB Atlas maintenance
# - Monitor connection limits
# - Check storage usage
# - Review slow query logs
# - Update connection strings if needed
```

### Performance Monitoring

```bash
# Weekly checks
# - Bundle size analysis
# - Core Web Vitals
# - API response times
# - Error rates
```

## 🆘 Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Check build logs in Vercel
vercel logs

# Common fixes:
# - Clear node_modules and reinstall
# - Check TypeScript errors
# - Verify environment variables
# - Review import paths
```

#### Runtime Errors
```bash
# Check function logs
vercel logs --follow

# Common issues:
# - Environment variables missing
# - Database connection failures
# - API rate limits exceeded
# - Memory limits exceeded
```

#### Performance Issues
```bash
# Bundle analysis
npm run build:analyze

# Common optimizations:
# - Code splitting
# - Image optimization
# - Lazy loading
# - Caching strategies
```

This deployment guide ensures reliable, secure, and performant delivery of the portfolio website to production environments. 