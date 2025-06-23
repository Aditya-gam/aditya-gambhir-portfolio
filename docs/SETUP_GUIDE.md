# Setup & Installation Guide

## 📋 Prerequisites

### System Requirements

- **Node.js** 18.17.0 or higher
- **npm** 9.0.0 or higher (or yarn/pnpm equivalent)
- **Git** for version control
- **MongoDB** account (MongoDB Atlas recommended)
- **Google reCAPTCHA** account
- **Email service** (Gmail recommended for simplicity)

### Development Tools (Recommended)

- **VS Code** with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - Auto Rename Tag
  - Bracket Pair Colorizer

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/Aditya-gam/aditya-gambhir-portfolio.git
cd aditya-gambhir-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create `.env.local` file in the root directory:

```bash
cp .env.example .env.local  # If example exists
# OR create manually
touch .env.local
```

### 4. Configure Environment Variables

Add the following to `.env.local`:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_messages?retryWrites=true&w=majority

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Detailed Configuration

### MongoDB Setup

#### Option 1: MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Choose free M0 tier
   - Select region closest to your users
   - Name your cluster

3. **Database Access**
   - Create database user
   - Note username and password
   - Set appropriate permissions

4. **Network Access**
   - Add IP address: `0.0.0.0/0` (allow all) for development
   - Restrict in production

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy MongoDB URI
   - Replace `<username>`, `<password>`, and `<dbname>`

#### Option 2: Local MongoDB

```bash
# Install MongoDB locally (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Connection string for local setup
MONGODB_URI=mongodb://localhost:27017/portfolio_messages
```

### Google reCAPTCHA Setup

1. **Create reCAPTCHA Account**
   - Visit [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
   - Sign in with Google account

2. **Register New Site**
   - Label: "Aditya Gambhir Portfolio"
   - reCAPTCHA type: reCAPTCHA v2 "I'm not a robot"
   - Domains:
     - `localhost` (for development)
     - Your production domain

3. **Get Keys**
   - Copy **Site Key** → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - Copy **Secret Key** → `RECAPTCHA_SECRET_KEY`

### Email Configuration

#### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Enable 2FA on your Gmail account

2. **Generate App Password**
   - Google Account > Security > App passwords
   - Select "Mail" and your device
   - Copy generated password

3. **Configure Environment**
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

#### Option 2: Other Email Services

```env
# Outlook/Hotmail
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password

# Custom SMTP
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASS=your-password
```

## 📁 Project Structure Deep Dive

```
aditya-gambhir-portfolio/
├── .env.local                 # Environment variables (create this)
├── .env.example              # Environment template (optional)
├── .gitignore                # Git ignore rules
├── components.json           # shadcn/ui configuration
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── postcss.config.mjs        # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Basic project info
├── docs/                     # Comprehensive documentation
│   ├── PROJECT_OVERVIEW.md   # High-level project description
│   ├── SETUP_GUIDE.md        # This file
│   ├── API_DOCUMENTATION.md  # API endpoints and usage
│   ├── COMPONENT_LIBRARY.md  # UI components documentation
│   ├── DEPLOYMENT_GUIDE.md   # Production deployment
│   └── [other docs...]
├── public/                   # Static assets
│   ├── favicon.ico          # Site favicon
│   ├── headshot.webp        # Profile image (optimized)
│   ├── Aditya_Gambhir_*.pdf # Resume files
│   └── projects/            # Project images
├── src/                     # Source code
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   ├── globals.css      # Global styles
│   │   ├── api/             # API routes
│   │   │   └── contact/     # Contact form API
│   │   ├── contact/         # Contact page
│   │   ├── projects/        # Projects page
│   │   ├── resume/          # Resume page
│   │   ├── robots.ts        # SEO robots.txt
│   │   └── sitemap.ts       # SEO sitemap
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI primitives
│   │   ├── forms/           # Form-specific components
│   │   └── [page components] # Feature components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   ├── types/               # TypeScript definitions
│   ├── constants/           # Application constants
│   ├── config/              # Configuration files
│   ├── data/                # Static data files
│   └── styles/              # CSS modules
```

## 🔨 Development Scripts

### Available Commands

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run dev:legacy       # Start without Turbopack (if issues)

# Building
npm run build           # Build for production
npm run build:analyze   # Build with bundle analysis
npm start              # Start production server locally

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues automatically
npm run format         # Format code with Prettier
npm run format:check   # Check formatting without changes

# Type Checking
npx tsc --noEmit       # Check TypeScript types
```

### Development Workflow

1. **Start Development Server**

   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files in `src/` directory
   - Changes auto-reload in browser

3. **Test Changes**
   - Check responsive design
   - Test contact form functionality
   - Verify all pages load correctly

4. **Code Quality Check**

   ```bash
   npm run lint
   npm run format:check
   ```

5. **Fix Issues**
   ```bash
   npm run lint:fix
   npm run format
   ```

## 🐛 Troubleshooting

### Common Issues

#### 1. Dependencies Installation Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. Environment Variables Not Loading

- Ensure `.env.local` is in root directory
- Check variable names match exactly
- Restart development server after changes
- Verify public variables start with `NEXT_PUBLIC_`

#### 3. MongoDB Connection Issues

```bash
# Test connection string format
mongodb+srv://username:password@cluster.mongodb.net/dbname?options

# Common fixes:
# - URL encode username/password if they contain special characters
# - Ensure IP whitelist includes your current IP
# - Check username/password are correct
# - Verify database name exists
```

#### 4. reCAPTCHA Not Working

- Verify site key matches your domain
- Check both localhost and production domains are registered
- Ensure keys are correctly set in environment variables
- Clear browser cache and cookies

#### 5. Email Not Sending

```bash
# Gmail specific:
# - Use app-specific password, not regular password
# - Enable 2-factor authentication first
# - Check "Less secure app access" if needed (not recommended)

# Test email configuration:
# Send test email from API route
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message","captchaToken":"test"}'
```

#### 6. Build Errors

```bash
# Check TypeScript errors
npx tsc --noEmit

# Check ESLint errors
npm run lint

# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Development Tips

1. **Use TypeScript Strict Mode**
   - Catch errors early
   - Better IDE support
   - Improved code quality

2. **Enable ESLint/Prettier**
   - Consistent code formatting
   - Catch common errors
   - Follow best practices

3. **Monitor Bundle Size**

   ```bash
   npm run build:analyze
   ```

4. **Test Responsive Design**
   - Use browser dev tools
   - Test on real devices
   - Check all breakpoints

5. **Performance Testing**
   - Use Lighthouse
   - Check Core Web Vitals
   - Monitor loading times

## 🔄 Updating Dependencies

### Regular Updates

```bash
# Check outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

### Major Version Updates

```bash
# Check for major updates
npx npm-check-updates

# Interactive update
npx npm-check-updates -i

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

### Security Updates

```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Force fixes (use with caution)
npm audit fix --force
```

## 📚 Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Tools

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Google reCAPTCHA](https://www.google.com/recaptcha)
- [Vercel Dashboard](https://vercel.com/dashboard)

### Community

- [Next.js Discord](https://discord.gg/nextjs)
- [React Discord](https://discord.gg/react)
- [MongoDB Community](https://community.mongodb.com)

Now you're ready to develop and customize the Aditya Gambhir Portfolio! 🚀
