# Aditya Gambhir Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**A modern, professional portfolio website showcasing expertise in Software Engineering and Data Science**

[🌐 Live Site](https://aditya-gambhir-portfolio.vercel.app/) • [📚 Documentation](./docs/) • [🚀 Deploy](#deployment)

</div>

## ✨ Features

- **🎨 Modern Design**: Clean, professional aesthetic with responsive design
- **⚡ Performance Optimized**: Next.js 15 with App Router, Image optimization, and lazy loading
- **🔒 Secure Contact Form**: MongoDB integration with reCAPTCHA protection and email notifications
- **📱 Mobile-First**: Responsive design that works beautifully on all devices
- **🌙 Theme Support**: System preference detection for dark/light modes
- **♿ Accessible**: WCAG 2.1 AA compliance with semantic HTML and ARIA labels
- **🚀 SEO Optimized**: Meta tags, structured data, sitemap, and Open Graph support
- **🔧 Developer Experience**: TypeScript, ESLint, Prettier, and comprehensive documentation

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.4 with App Router
- **UI Library**: React 19.0.0 with TypeScript 5
- **Styling**: Tailwind CSS 4.1.10 with custom design system
- **Components**: Radix UI primitives with custom component library
- **Icons**: Lucide React & Simple Icons
- **Fonts**: Geist & Geist Mono (optimized with next/font)

### Backend & Database
- **API**: Next.js API Routes (serverless)
- **Database**: MongoDB 6.17.0 with connection pooling
- **Email**: Nodemailer 7.0.3 with Gmail integration
- **Security**: Input validation, HTML sanitization, rate limiting

### Development Tools
- **Language**: TypeScript with strict mode
- **Linting**: ESLint 9 with Next.js and Prettier configs
- **Formatting**: Prettier 3.5.3
- **Build**: Bundle analyzer with performance monitoring

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher
- MongoDB account (MongoDB Atlas recommended)
- Google reCAPTCHA account
- Gmail account for email functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aditya-gam/aditya-gambhir-portfolio.git
   cd aditya-gambhir-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your `.env.local` file:
   ```env
   # Database
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_messages
   
   # reCAPTCHA
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   
   # Email
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run build:analyze # Build with bundle analysis
npm start           # Start production server
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
npm run format:check # Check code formatting
```

## 📁 Project Structure

```
aditya-gambhir-portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── contact/        # Contact page
│   │   ├── projects/       # Projects page
│   │   ├── resume/         # Resume page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI primitives
│   │   ├── forms/         # Form components
│   │   └── ...            # Feature components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── types/             # TypeScript definitions
│   ├── constants/         # Application constants
│   ├── data/              # Static data (projects, etc.)
│   └── styles/            # CSS modules
├── public/                # Static assets
│   ├── headshot.webp     # Profile image
│   ├── projects/         # Project images
│   └── *.pdf            # Resume files
├── docs/                 # Comprehensive documentation
└── package.json          # Dependencies and scripts
```

## 🎯 Core Pages

### Homepage (`/`)
Professional introduction with featured projects and contact call-to-action

### Projects (`/projects`)
Comprehensive portfolio showcase with technology filtering and project details

### Resume (`/resume`)
Professional experience summary with downloadable PDF resumes

### Contact (`/contact`)
Secure contact form with reCAPTCHA protection and email integration

## 🔧 Configuration

### Environment Setup
For detailed environment configuration including MongoDB, reCAPTCHA, and email setup, see:
- [**Setup Guide**](./docs/SETUP_GUIDE.md) - Complete installation instructions
- [**Deployment Guide**](./docs/DEPLOYMENT_GUIDE.md) - Production deployment procedures

### Content Management
To update projects, personal information, or site content:
- [**Content Management Guide**](./docs/CONTENT_MANAGEMENT.md) - Managing website content

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. **Connect your GitHub repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

For detailed deployment instructions, see the [**Deployment Guide**](./docs/DEPLOYMENT_GUIDE.md).

### Production Environment Variables

```env
MONGODB_URI=mongodb+srv://...
RECAPTCHA_SECRET_KEY=...
EMAIL_USER=...
EMAIL_PASS=...
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

| Document | Purpose | Audience |
|----------|---------|----------|
| [**Setup Guide**](./docs/SETUP_GUIDE.md) | Installation & environment setup | Developers |
| [**API Documentation**](./docs/API_DOCUMENTATION.md) | Backend API reference | Backend developers |
| [**Component Library**](./docs/COMPONENT_LIBRARY.md) | React components & usage | Frontend developers |
| [**Deployment Guide**](./docs/DEPLOYMENT_GUIDE.md) | Production deployment | DevOps/Deployment |
| [**Development Workflow**](./docs/DEVELOPMENT_WORKFLOW.md) | Development standards | All developers |
| [**Content Management**](./docs/CONTENT_MANAGEMENT.md) | Content updates | Content managers |
| [**CSS Architecture**](./docs/CSS_ARCHITECTURE.md) | Styling system | Frontend developers |

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow the development workflow**: See [Development Workflow Guide](./docs/DEVELOPMENT_WORKFLOW.md)
4. **Commit your changes**: `git commit -m 'feat: add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Standards

- **Code Quality**: ESLint + Prettier with strict TypeScript
- **Commit Messages**: Conventional Commits format
- **Testing**: Component and API testing (when implemented)
- **Documentation**: Update relevant docs with changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Aditya Gambhir**
- **Email**: gambhir.aditya19@gmail.com
- **LinkedIn**: [linkedin.com/in/aditya-gambhir](https://www.linkedin.com/in/aditya-gambhir)
- **GitHub**: [github.com/Aditya-gam](https://github.com/Aditya-gam)
- **Portfolio**: [aditya-gambhir-portfolio.vercel.app](https://aditya-gambhir-portfolio.vercel.app/)

## 🔄 Version History

- **v0.1.0** - Initial release with core portfolio functionality
- Modern Next.js 15 implementation
- Comprehensive contact form with MongoDB integration
- Responsive design with Tailwind CSS 4
- Complete documentation suite

---

<div align="center">

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**

[⭐ Star this repo](https://github.com/Aditya-gam/aditya-gambhir-portfolio) if you find it helpful!

</div>
