'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants for scroll-based reveals
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutPage() {
  return (
    <main className="page-layout">
      {/* Breadcrumb */}
      <nav
        className="text-sm text-muted-foreground mb-8"
        aria-label="Breadcrumb"
      >
        <span>Home</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">About Me</span>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="hero-section mb-16"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-5 gap-8 items-center max-w-4xl mx-auto">
          {/* Left - Headshot (35%) */}
          <motion.div
            className="md:col-span-2 flex justify-center"
            variants={fadeInUp}
          >
            <div className="relative">
              <Image
                src="/headshot1.webp"
                alt="Aditya Gambhir"
                width={200}
                height={200}
                className="rounded-full object-cover shadow-lg shadow-indigo-500/20"
                priority
              />
            </div>
          </motion.div>

          {/* Right - Text Content (65%) */}
          <motion.div
            className="md:col-span-3 text-center md:text-left"
            variants={fadeInUp}
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Aditya Gambhir
            </h1>
            <h2 className="text-2xl text-muted-foreground mb-4">
              Full-Stack Developer & AI Enthusiast bridging data science and
              software engineering.
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              M.S. Computational Data Science graduate transforming cutting-edge
              ML, computer vision and real-time sensor fusion into scalable,
              user-centric software.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/Aditya_Gambhir_DS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-all duration-200"
              >
                View Résumé (DS)
              </a>
              <a
                href="/Aditya_Gambhir_SDE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center px-6 py-3 border border-indigo-400 text-indigo-400 font-medium rounded-lg hover:bg-indigo-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-all duration-200"
              >
                View Résumé (SDE)
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Snapshot Stats Ribbon */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-400 mb-1">5+</div>
              <div className="text-sm text-muted-foreground">
                Years in Software/Data
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-400 mb-1">10+</div>
              <div className="text-sm text-muted-foreground">
                Projects Delivered
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-400 mb-1">
                3.67
              </div>
              <div className="text-sm text-muted-foreground">M.S. GPA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-400 mb-1">2</div>
              <div className="text-sm text-muted-foreground">
                Peer-reviewed Publications
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Professional Summary */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Professional Summary
          </h2>
          <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
            Experienced software engineer and data scientist with a proven track
            record of delivering scalable solutions that bridge the gap between
            cutting-edge research and practical applications. Specialized in
            machine learning, computer vision, and real-time sensor fusion
            technologies, with extensive experience in full-stack development
            and cloud architecture. Passionate about transforming complex
            algorithms into user-friendly, production-ready systems that drive
            business value and innovation.
          </p>
          <p className="text-indigo-400 text-center mt-4 italic">
            &ldquo;Let&rsquo;s push the boundaries of autonomous systems
            together.&rdquo;
          </p>
        </div>
      </motion.section>

      {/* Dual Career Pillars */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Dual Expertise</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Data Scientist Card */}
          <motion.div
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
            variants={fadeInUp}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                Data Scientist / ML Engineer
              </h3>
            </div>
            <ul className="space-y-2 mb-4 text-muted-foreground">
              <li>• Achieved RMSE &lt; 0.5m on sensor fusion projects</li>
              <li>• Improved BLEU scores by +35% in NLP tasks</li>
              <li>• Led computer vision research with measurable impact</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {[
                'PyTorch',
                'Vision-Transformers',
                'Kalman Filter',
                'OpenCV',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full border border-blue-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Software Engineer Card */}
          <motion.div
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
            variants={fadeInUp}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">
                Software Engineer (Backend & Full-Stack)
              </h3>
            </div>
            <ul className="space-y-2 mb-4 text-muted-foreground">
              <li>• Built logistics mock-server for 500+ developers</li>
              <li>• Reduced development cycle time by 35%</li>
              <li>• Decreased contract-related bugs by 40%</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Spring Boot', 'AWS', 'CI/CD'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full border border-green-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Matrix */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Skills Matrix</h2>
        <div className="space-y-6">
          {[
            {
              category: 'Languages',
              items: ['C++', 'Java', 'JavaScript', 'TypeScript', 'Python'],
            },
            {
              category: 'Frameworks',
              items: ['React', 'Node.js', 'Spring Boot', 'FastAPI'],
            },
            {
              category: 'Data / AI',
              items: ['Pandas', 'NumPy', 'TensorFlow', 'Keras', 'OpenCV'],
            },
            {
              category: 'Cloud & DevOps',
              items: ['AWS (EC2, S3, Lambda)', 'Docker', 'Kubernetes'],
            },
            {
              category: 'Databases',
              items: ['PostgreSQL', 'MongoDB', 'MySQL'],
            },
            {
              category: 'Tooling',
              items: ['Git', 'GitHub Actions', 'Jenkins', 'Jira'],
            },
          ].map((skillGroup) => (
            <motion.div key={skillGroup.category} variants={fadeInUp}>
              <h3 className="text-lg font-semibold mb-3 text-indigo-400">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-2 bg-card border border-border rounded-lg text-sm hover:border-indigo-400 hover:shadow-md transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">
          Experience Timeline
        </h2>
        <div className="space-y-8">
          {[
            {
              company: 'Tech Mahindra',
              role: 'Software Development Intern',
              period: 'Jun 2022 → May 2023',
              bullets: [
                'Built MERN mock-server with 15+ endpoints for 500+ developers',
                'Reduced contract-related bugs by 40% and delivery time by 25%',
              ],
            },
            {
              company: 'C-DAC',
              role: 'R&D Intern',
              period: 'Jan 2022 → Jun 2022',
              bullets: [
                'Developed real-time brainwave web service for 500+ users',
                'Achieved 99.9% uptime through rigorous testing protocols',
              ],
            },
          ].map((experience, index) => (
            <motion.div
              key={experience.company}
              className="relative flex gap-6"
              variants={fadeInUp}
            >
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full shadow-lg"></div>
                {index < 1 && (
                  <div className="w-0.5 h-16 bg-gradient-to-b from-indigo-500 to-violet-500 mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-lg font-semibold">
                      {experience.company}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {experience.period}
                    </span>
                  </div>
                  <p className="text-indigo-400 mb-3">{experience.role}</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {experience.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Education</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              M.S. Computational Data Science
            </h3>
            <p className="text-indigo-400 mb-2">
              University of California, Riverside
            </p>
            <p className="text-muted-foreground mb-4">GPA: 3.67</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Big Data', 'AI', 'Spatial Computing', 'ML'].map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm rounded-full border border-indigo-500/20"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Certifications Carousel */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Certifications</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
            {[
              {
                title: 'Sensor Fusion Nanodegree',
                provider: 'Udacity',
                year: '2024',
              },
              {
                title: 'Microservices w/ Spring Boot',
                provider: 'Udemy',
                year: '2022',
              },
              { title: 'Dell AI Foundations', provider: 'Dell', year: '2022' },
              { title: 'CCNA v7', provider: 'Cisco', year: '2021' },
              {
                title: 'Fundamentals of Deep Learning',
                provider: 'NVIDIA',
                year: '2021',
              },
            ].map((cert) => (
              <div
                key={cert.title}
                className="bg-card border border-border rounded-lg p-4 shadow-sm min-w-64"
              >
                <h3 className="font-semibold mb-2">{cert.title}</h3>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{cert.provider}</span>
                  <span>{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Publications */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Publications</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold mb-2 flex items-center">
              &ldquo;A Comprehensive Survey of Multiple Object Tracking
              Techniques.&rdquo;
              <svg
                className="w-4 h-4 ml-2 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </h3>
            <p className="text-sm text-muted-foreground">IJISAE, 2024</p>
          </div>
          <p className="text-indigo-400 text-sm italic">
            &ldquo;I actively publish and peer-review research to stay at the
            forefront of computer-vision innovation.&rdquo;
          </p>
        </div>
      </motion.section>

      {/* Community & Leadership */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">
          Community & Leadership
        </h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
          <h3 className="font-semibold mb-2">
            ML Forum VIIT – Core Committee Member
          </h3>
          <p className="text-sm text-muted-foreground mb-2">2021-2022</p>
          <p className="text-muted-foreground">
            Led workshops on deep learning for 80+ students, fostering the next
            generation of AI practitioners.
          </p>
        </div>
      </motion.section>

      {/* Personal Touch */}
      <motion.section
        className="mb-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Quick Facts</h2>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm max-w-2xl mx-auto text-center">
          <div className="space-y-3 text-muted-foreground">
            <p>
              <span className="text-foreground font-medium">
                Favorite Stack:
              </span>{' '}
              MERN + AWS
            </p>
            <p>
              <span className="text-foreground font-medium">
                Coffee Aficionado:
              </span>{' '}
              ☕ Always brewing the perfect cup
            </p>
            <p>
              <span className="text-foreground font-medium">
                Amateur Guitarist:
              </span>{' '}
              🎸 Strumming in spare time
            </p>
          </div>
        </div>
      </motion.section>

      {/* Final CTA - Resume Downloads */}
      <motion.section
        className="text-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-6">Ready to Collaborate?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Download my resume to learn more about my experience, or get in touch
          to discuss how we can work together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/Aditya_Gambhir_DS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Data Science Resume
          </a>
          <a
            href="/Aditya_Gambhir_SDE.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center justify-center px-6 py-3 border border-indigo-400 text-indigo-400 font-medium rounded-lg hover:bg-indigo-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Software Engineer Resume
          </a>
        </div>
      </motion.section>
    </main>
  );
}
