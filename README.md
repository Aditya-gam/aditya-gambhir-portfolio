# 🚀 Aditya Gambhir Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**A cutting-edge, professional portfolio showcasing dual expertise in Software Engineering and Data Science**

[🌐 **Live Portfolio**](https://aditya-gambhir-portfolio.vercel.app/) • [📚 **Documentation**](./docs/) • [🚀 **Quick Start**](#-quick-start)

</div>

---

## ✨ **Features**

### 🎯 **Professional Showcase**

- **Dual Expertise** - Software Engineering & Data Science portfolios
- **Interactive Projects** - 10+ featured projects with live demos
- **Certifications Gallery** - 12+ professional certifications with PDF viewer
- **Publications** - Research papers with interactive abstracts
- **Resume System** - Dual resume previews with download analytics

### 🎨 **Modern Design**

- **Purple Theme** - Creative design system with dark/light mode
- **Responsive Design** - Mobile-first approach with smooth animations
- **Accessibility** - WCAG 2.1 AA compliant with keyboard navigation
- **Performance** - Optimized images, lazy loading, and code splitting

### 🔒 **Secure & Robust**

- **Contact Form** - Google reCAPTCHA v2 integration
- **Email System** - MongoDB storage with Nodemailer
- **Form Validation** - Real-time validation with error handling
- **Security Headers** - Comprehensive CSP and security measures

---

## 🛠️ **Tech Stack**

| Category          | Technology                              | Purpose                            |
| ----------------- | --------------------------------------- | ---------------------------------- |
| **Frontend**      | Next.js 15, React 19, TypeScript 5      | App Router, SSR, Type Safety       |
| **Styling**       | Tailwind CSS 4.0, CSS Custom Properties | Design System, Responsive UI       |
| **UI Components** | Radix UI, shadcn/ui, Framer Motion      | Accessible Components, Animations  |
| **Backend**       | Next.js API Routes, MongoDB             | Serverless Functions, Data Storage |
| **Deployment**    | Vercel                                  | Hosting, CI/CD, Edge Network       |
| **Security**      | Google reCAPTCHA v2                     | Spam Protection, Form Security     |

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

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### **Environment Setup**

Create `.env.local` with:

```env
# Database & Email
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_messages
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### **Development**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Code quality
npm run lint
npm run format
```

> **📚 Need detailed setup instructions?** Check the [Documentation](./docs/) for comprehensive guides.

---

## 📁 **Project Structure**

```
aditya-gambhir-portfolio/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── about/             # Professional profile & skills
│   │   ├── projects/          # Portfolio showcase
│   │   ├── resume/            # Resume previews & downloads
│   │   ├── api/               # Backend API routes
│   │   └── globals.css        # Tailwind CSS 4.0 theme
│   ├── components/            # React components
│   │   ├── ui/               # Design system components
│   │   ├── forms/            # Form components
│   │   └── shared/           # Shared utilities
│   ├── data/                 # Content data files
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── styles/               # CSS modules
│   └── types/                # TypeScript definitions
├── public/                   # Static assets
├── docs/                     # Comprehensive documentation
└── [config files]           # Build & development configs
```

---

## 🎯 **Key Pages**

### **🏠 Homepage** (`/`)

Modern landing page with hero section, featured projects carousel, publications gallery, and call-to-action buttons.

### **📋 About Page** (`/about`)

Comprehensive professional profile with:

- Interactive hero section with animated profile
- Dual expertise cards (Software Engineering & Data Science)
- Skills matrix organized by technology categories
- Experience timeline with work history
- Interactive certifications with modal viewer
- Publications with research abstracts

### **🎯 Projects Page** (`/projects`)

Portfolio showcase featuring 10+ projects:

- **Navigate LA28** - Geospatial platform for LA 2028 Olympics
- **Dockership** - Freight ship management with optimization algorithms
- **Sensor Fusion** - Autonomous vehicle data processing
- **Transformer Models** - Crowd localization research
- **Image Deblurring** - Autoencoder implementation

### **📄 Resume Page** (`/resume`)

Professional resume showcase with:

- **Software Engineer Resume** - MERN stack, enterprise solutions
- **Data Science Resume** - ML/AI, computer vision, analytics
- Interactive PDF previews with fullscreen viewing
- Download analytics and file metadata

---

## 📜 **Available Scripts**

| Script                  | Purpose           | Description                          |
| ----------------------- | ----------------- | ------------------------------------ |
| `npm run dev`           | Development       | Start dev server with Turbopack      |
| `npm run build`         | Production Build  | Optimize for deployment              |
| `npm run build:analyze` | Bundle Analysis   | Analyze bundle size and dependencies |
| `npm start`             | Production Server | Run production build locally         |
| `npm run lint`          | Code Quality      | ESLint with accessibility rules      |
| `npm run format`        | Code Formatting   | Prettier formatting                  |
| `npm run format:check`  | Format Check      | Verify code formatting               |

---

## 📚 **Documentation**

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- **[Getting Started](./docs/getting-started/)** - Setup, development, and deployment guides
- **[Technical Docs](./docs/technical/)** - API, components, and CSS architecture
- **[Content Management](./docs/content/)** - Updating portfolio content

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ using Next.js 15, React 19, and Tailwind CSS 4.0**

[🌐 **Visit Portfolio**](https://aditya-gambhir-portfolio.vercel.app/) • [📧 **Contact**](mailto:gambhir.aditya19@gmail.com) • [💼 **LinkedIn**](https://www.linkedin.com/in/aditya-gambhir/)

</div>
