# Aditya Gambhir Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**A cutting-edge, professional portfolio showcasing dual expertise in Software Engineering and Data Science**

[🌐 **Live Portfolio**](https://aditya-gambhir-portfolio.vercel.app/) • [📚 **Documentation**](./docs/) • [🚀 **Deploy Guide**](./docs/DEPLOYMENT_GUIDE.md)

</div>

---

## 🌟 **Highlights**

✨ **Modern Tech Stack** - Built with Next.js 15, React 19, and Tailwind CSS 4.0  
🎨 **Beautiful Design** - Purple-themed design system with dark/light mode support  
📱 **Mobile-First** - Fully responsive with smooth animations and touch gestures  
🏆 **Interactive Features** - Certificate viewer, publication modals, resume previews  
🔒 **Enterprise Security** - Comprehensive CSP headers and form validation  
⚡ **Performance Optimized** - Image optimization, lazy loading, and code splitting  

---

## ✨ **Features**

### 🏠 **Homepage**
- **Hero Section** with professional introduction and social links
- **Featured Projects** carousel showcasing top work
- **Publications Gallery** with expandable research abstracts
- **Call-to-Action** buttons for easy navigation

### 📋 **Comprehensive About Page**
- **Interactive Profile** with animated hero section
- **Dual Expertise Cards** highlighting Software Engineering and Data Science skills
- **Professional Timeline** with work experience and achievements
- **Skills Matrix** organized by technology categories
- **Education Details** with GPA and relevant coursework

### 🏆 **Interactive Certifications**
- **Certificate Modal Viewer** with keyboard navigation
- **12+ Professional Certifications** from Udacity, NVIDIA, Cisco, etc.
- **PDF Document Viewer** with direct download links
- **Progress Indicators** and smooth transitions

### 📄 **Resume Preview Cards**
- **Dual Resume System** - Separate SDE and Data Science versions
- **Inline PDF Previews** with fullscreen viewing options
- **Download Analytics** tracking with Google Analytics integration
- **Resume Highlights** and metadata display

### 📚 **Publications Gallery**
- **Research Publication** with interactive modal viewer
- **Expandable Abstracts** with full paper links
- **Citation Information** and journal details

### 🎯 **Projects Portfolio**
- **10+ Featured Projects** across web development and machine learning
- **Technology Filtering** by programming language and framework
- **Detailed Project Cards** with live demos and GitHub links
- **Performance Metrics** and achievement highlights

### 🔐 **Secure Contact System**
- **Advanced Form Validation** with real-time feedback
- **Google reCAPTCHA v2** integration for spam protection
- **MongoDB Integration** for message storage and analytics
- **Email Notifications** with custom HTML templates
- **Toast Notifications** for user feedback

### 🎨 **Modern UI/UX**
- **Tailwind CSS 4.0** with latest design system features
- **Framer Motion** animations with smooth page transitions
- **Custom Scrollbars** and interactive elements
- **Accessibility Compliant** with WCAG 2.1 AA standards
- **Touch Gestures** for mobile carousel navigation

---

## 🏗️ **Tech Stack**

### **Frontend Excellence**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.3.4 | App Router, SSR, Image Optimization |
| **React** | 19.0.0 | Component Architecture, Hooks |
| **TypeScript** | 5.x | Type Safety, Developer Experience |
| **Tailwind CSS** | 4.1.10 | Design System, Responsive Styling |
| **Framer Motion** | 12.19.1 | Animations, Page Transitions |

### **UI Components**
| Component | Purpose | Features |
|-----------|---------|----------|
| **Radix UI** | Accessible Primitives | Dialog, Dropdown, Slot |
| **Lucide React** | Icon Library | 500+ Optimized Icons |
| **Class Variance Authority** | Component Variants | Type-safe Styling |
| **Sonner** | Toast Notifications | Beautiful Alerts |

### **Backend & Database**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js API Routes** | 15.3.4 | Serverless Functions |
| **MongoDB** | 6.17.0 | Document Database, Contact Storage |
| **Nodemailer** | 7.0.3 | Email Service Integration |
| **Google reCAPTCHA** | v2 | Spam Protection |

### **Development Tools**
| Tool | Purpose | Configuration |
|------|---------|---------------|
| **ESLint** | Code Quality | Flat Config with Next.js, Prettier, Accessibility |
| **Prettier** | Code Formatting | Single Quotes, Trailing Commas |
| **Bundle Analyzer** | Performance Monitoring | Build Analysis |

---

## 🚀 **Quick Start**

### **Prerequisites**
```bash
node --version    # v18.17.0+
npm --version     # v9.0.0+
```

### **Installation**
```bash
# Clone the repository
git clone https://github.com/Aditya-gam/aditya-gambhir-portfolio.git
cd aditya-gambhir-portfolio

# Install dependencies with latest features
npm install

# Set up environment variables
cp .env.example .env.local  # Configure your environment
```

### **Environment Setup**
Create `.env.local` with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_messages

# Google reCAPTCHA (v2 "I'm not a robot" checkbox)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email Configuration (Gmail recommended)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Need help?** Check [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) for detailed setup instructions  
> **reCAPTCHA Issues?** See [RECAPTCHA_TROUBLESHOOTING.md](./RECAPTCHA_TROUBLESHOOTING.md)

### **Development**
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Analyze bundle size
npm run build:analyze

# Code quality
npm run lint
npm run format
```

---

## 📜 **Available Scripts**

| Script | Purpose | Description |
|--------|---------|-------------|
| `npm run dev` | Development | Start dev server with Turbopack |
| `npm run build` | Production Build | Optimize for deployment |
| `npm run build:analyze` | Bundle Analysis | Analyze bundle size and dependencies |
| `npm start` | Production Server | Run production build locally |
| `npm run lint` | Code Quality | ESLint with accessibility rules |
| `npm run format` | Code Formatting | Prettier formatting |
| `npm run format:check` | Format Check | Verify code formatting |

---

## 📁 **Project Structure**

```
aditya-gambhir-portfolio/
├── src/
│   ├── app/                      # Next.js 15 App Router
│   │   ├── about/               # 📋 Comprehensive About Page
│   │   ├── projects/            # 🎯 Projects Portfolio
│   │   ├── resume/              # 📄 Resume Preview & Download
│   │   ├── api/                 # 🔗 API Routes & Contact Form
│   │   │   ├── contact/         # Contact form with validation
│   │   │   └── well-known/      # Security & Chrome DevTools
│   │   ├── globals.css          # 🎨 Tailwind CSS 4.0 Theme
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── middleware.ts        # 🔒 Security headers
│   ├── components/              # 🧩 React Components
│   │   ├── about/              # 📋 About Page Components (12+)
│   │   │   ├── AboutHero.tsx    # Hero section with animations
│   │   │   ├── Certifications.tsx # Interactive certificate viewer
│   │   │   ├── Publications.tsx  # Research publication modals
│   │   │   ├── DualExpertise.tsx # SDE/DS expertise cards
│   │   │   └── [8 more...]      # Skills, experience, education, etc.
│   │   ├── ui/                 # 🎨 Design System Components
│   │   │   ├── button.tsx       # CVA-powered button variants
│   │   │   ├── card.tsx         # Consistent card components
│   │   │   ├── modal.tsx        # Accessible modal system
│   │   │   └── carousel.tsx     # Touch-enabled carousels
│   │   ├── forms/              # 📝 Form Components
│   │   │   ├── ContactForm.tsx  # Secure contact form
│   │   │   ├── CaptchaField.tsx # reCAPTCHA integration
│   │   │   └── FormField.tsx    # Reusable form fields
│   │   ├── CertificateModal.tsx # 🏆 Certificate viewer modal
│   │   ├── ResumePreviewCard.tsx # 📄 Resume preview with PDF viewer
│   │   ├── ProjectCard.tsx      # Project display cards
│   │   └── [core components]    # Header, Footer, Navigation
│   ├── data/                   # 📊 Content Management
│   │   ├── about.ts            # About page data (303 lines)
│   │   ├── projects.ts         # Project portfolio data
│   │   ├── resume.ts           # Resume metadata
│   │   └── socials.ts          # Social profiles data
│   ├── hooks/                  # 🪝 Custom React Hooks
│   │   ├── useCertificateModal.ts # Certificate modal logic
│   │   ├── useContactForm.ts    # Form validation logic
│   │   └── useMediaQuery.ts     # Responsive breakpoints
│   ├── lib/                    # 🛠️ Utility Libraries
│   │   ├── mongodb.ts          # Database connection
│   │   ├── validation.ts       # Form validation rules
│   │   └── utils.ts            # Utility functions
│   ├── styles/                 # 🎨 CSS Architecture
│   │   ├── base.css            # Layout patterns & utilities
│   │   └── components.css      # Component-specific styles
│   ├── types/                  # 📝 TypeScript Definitions
│   └── constants/              # ⚙️ Application Constants
├── public/                     # 📁 Static Assets
│   ├── certificates/           # 🏆 Certificate PDFs (12+)
│   ├── projects/              # 🎯 Project images & screenshots
│   ├── Aditya_Gambhir_SDE.pdf # Software Engineer Resume
│   ├── Aditya_Gambhir_DS.pdf  # Data Science Resume
│   └── headshot*.webp         # Optimized profile images
├── docs/                      # 📚 Comprehensive Documentation
│   ├── API_DOCUMENTATION.md   # Backend API reference
│   ├── COMPONENT_LIBRARY.md   # React components guide
│   ├── SETUP_GUIDE.md         # Installation & environment
│   ├── DEPLOYMENT_GUIDE.md    # Production deployment
│   ├── CONTENT_MANAGEMENT.md  # Content update procedures
│   ├── CSS_ARCHITECTURE.md    # Tailwind CSS 4.0 system
│   └── DEVELOPMENT_WORKFLOW.md # Code quality standards
├── RECAPTCHA_TROUBLESHOOTING.md # 🔧 reCAPTCHA fixes
└── [config files]             # ESLint, TypeScript, etc.
```

---

## 🎯 **Core Pages**

### **🏠 Homepage (`/`)**
Modern landing page with hero section, featured projects carousel, publications gallery, and call-to-action buttons. Optimized for first impressions and user engagement.

### **📋 About Page (`/about`)**
Comprehensive professional profile with 12+ interactive components:
- **Hero Section** with animated profile image and contact CTAs
- **Stats Ribbon** showcasing 2+ years experience, 10+ projects, 3.67 GPA
- **Professional Summary** with career highlights and achievements
- **Dual Expertise** cards for Software Engineering and Data Science
- **Skills Matrix** organized by programming languages, frameworks, and tools
- **Experience Timeline** with work history and accomplishments
- **Education Details** with M.S. Computational Data Science from UCR
- **Interactive Certifications** with modal viewer and PDF access
- **Publications** with research paper details and abstracts
- **Community Leadership** highlighting ML forum contributions
- **Personal Touch** with favorite tech stack and hobbies

### **🎯 Projects Page (`/projects`)**
Portfolio showcase featuring 10+ projects across web development and machine learning:
- Navigate LA28: Real-time geospatial platform for Olympics routing
- Dockership: Freight ship management with container optimization
- Sensor Fusion: Self-driving vehicle data processing with Kalman filters
- Transformer Models: Crowd localization using computer vision
- Image Deblurring: U-Net autoencoder for image restoration
- And more...

### **📄 Resume Page (`/resume`)**
Professional resume showcase with dual specializations:
- **Software Engineer Resume** - MERN stack, enterprise solutions
- **Data Science Resume** - ML/AI, computer vision, analytics
- **Interactive PDF Previews** with fullscreen viewing
- **Download Analytics** and file metadata
- **Resume Highlights** and target audience information

---

## 🔧 **Configuration**

### **Tailwind CSS 4.0 Features**
- **@theme Syntax** with oklch color system for better color accuracy
- **Design Tokens** using CSS custom properties
- **Purple Color Scheme** with automatic dark mode support
- **Component Variants** using class-variance-authority
- **Custom Scrollbars** for enhanced UI experience

### **Security Configuration**
- **Content Security Policy** headers allowing reCAPTCHA and essential services
- **Middleware Security** with proper frame options and XSS protection
- **Input Validation** and HTML sanitization for all user inputs
- **Rate Limiting** for API endpoints to prevent abuse

### **Performance Optimizations**
- **Image Optimization** with Next.js Image component and WebP/AVIF formats
- **Code Splitting** with dynamic imports for better load times
- **Bundle Analysis** tools for monitoring bundle size
- **Turbopack** for faster development builds

---

## 📚 **Documentation**

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

| Document | Purpose | Target Audience |
|----------|---------|-----------------|
| [**Setup Guide**](./docs/SETUP_GUIDE.md) | Installation & environment setup | Developers |
| [**API Documentation**](./docs/API_DOCUMENTATION.md) | Backend API reference & integration | Backend developers |
| [**Component Library**](./docs/COMPONENT_LIBRARY.md) | React components & usage patterns | Frontend developers |
| [**CSS Architecture**](./docs/CSS_ARCHITECTURE.md) | Tailwind CSS 4.0 design system | UI/UX developers |
| [**Content Management**](./docs/CONTENT_MANAGEMENT.md) | Content updates & maintenance | Content managers |
| [**Deployment Guide**](./docs/DEPLOYMENT_GUIDE.md) | Production deployment procedures | DevOps engineers |
| [**Development Workflow**](./docs/DEVELOPMENT_WORKFLOW.md) | Code quality & contribution standards | All developers |

### **🚨 Troubleshooting Quick Reference**
- **Environment Issues**: [Setup Guide](./docs/SETUP_GUIDE.md#troubleshooting)
- **reCAPTCHA Problems**: [Troubleshooting Guide](./RECAPTCHA_TROUBLESHOOTING.md)
- **Production Deployment**: [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md#troubleshooting)
- **Content Updates**: [Content Management](./docs/CONTENT_MANAGEMENT.md)

---

## 🚀 **Deployment**

### **Vercel (Recommended)**
This project is optimized for [Vercel](https://vercel.com/) deployment:

```bash
# Connect GitHub repository to Vercel
# Configure environment variables in dashboard
# Automatic deployments on push to main branch
```

### **Environment Variables for Production**
```env
MONGODB_URI=mongodb+srv://...
RECAPTCHA_SECRET_KEY=production_secret
EMAIL_USER=production_email@gmail.com
EMAIL_PASS=production_app_password
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=production_site_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Detailed deployment instructions**: [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)

---

## 📈 **Performance**

### **Core Web Vitals**
- **First Contentful Paint (FCP)**: < 1.2s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### **Optimization Features**
- ⚡ **Turbopack** for 5x faster development builds
- 🖼️ **Image Optimization** with WebP/AVIF formats and responsive sizing
- 📦 **Code Splitting** with dynamic imports for non-critical components
- 🎨 **CSS-in-CSS** with Tailwind CSS 4.0 for minimal runtime overhead
- 🔄 **Lazy Loading** for below-the-fold content

---

## 🤝 **Contributing**

### **Development Standards**
1. **Fork** the repository and create a feature branch
2. **Follow** the [Development Workflow](./docs/DEVELOPMENT_WORKFLOW.md)
3. **Run** `npm run lint` and `npm run format` before committing
4. **Write** meaningful commit messages using Conventional Commits
5. **Test** your changes thoroughly across different devices
6. **Create** a Pull Request with detailed description

### **Code Quality Requirements**
- ✅ **TypeScript** strict mode compliance
- ✅ **ESLint** with accessibility rules passing
- ✅ **Prettier** formatting applied
- ✅ **Responsive design** tested on mobile and desktop
- ✅ **Accessibility** WCAG 2.1 AA compliance

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 **Contact**

**Aditya Gambhir** - *Software Engineer & Data Scientist*

- 📧 **Email**: [gambhir.aditya19@gmail.com](mailto:gambhir.aditya19@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/aditya-gambhir](https://www.linkedin.com/in/aditya-gambhir)
- 🐙 **GitHub**: [github.com/Aditya-gam](https://github.com/Aditya-gam)
- 🌐 **Portfolio**: [aditya-gambhir-portfolio.vercel.app](https://aditya-gambhir-portfolio.vercel.app/)

---

## 🔄 **Version History**

### **v2.0.0** - *December 2024* - **Major Feature Release**
- 🆕 **Complete About Page** with 12+ interactive components
- 🎨 **Tailwind CSS 4.0** migration with oklch colors and @theme syntax
- 🏆 **Interactive Certifications** with modal viewer and navigation
- 📄 **Resume Preview Cards** with inline PDF viewing
- 📚 **Publications Gallery** with expandable abstracts
- ⚡ **Performance Improvements** with React 19 and Next.js 15
- 🔒 **Enhanced Security** with comprehensive CSP headers
- 📱 **Mobile Optimizations** with touch gestures and carousels

### **v1.0.0** - *Initial Release*
- 🏗️ Next.js 13 foundation with basic portfolio functionality
- 📝 Contact form with MongoDB integration
- 🎯 Project showcase with GitHub integration
- 📱 Responsive design with Tailwind CSS

---

<div align="center">

**🌟 Built with passion using Next.js 15, React 19, TypeScript, and Tailwind CSS 4.0**

*Showcasing the intersection of cutting-edge technology and thoughtful design*

[⭐ **Star this repo**](https://github.com/Aditya-gam/aditya-gambhir-portfolio) if you find it helpful! • [🐛 **Report Issues**](https://github.com/Aditya-gam/aditya-gambhir-portfolio/issues)

</div>
