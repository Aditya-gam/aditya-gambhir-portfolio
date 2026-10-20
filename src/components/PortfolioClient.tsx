'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { useTheme } from 'next-themes';
import { aboutData } from '@/data/about';
import { getFeaturedProjects, getMoreProjects } from '@/data/projects';
import { getPrimaryResume } from '@/data/resume';
import { getSocialProfileByPlatform } from '@/data/socials';
import type { ProjectData } from '@/types';

// ── static data ──────────────────────────────────────────────────────────────
const NAV = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
const ROLES = [
  'Software Engineer',
  'Backend & Platform Engineer',
  'AI Applications Engineer',
  'Full-Stack Engineer',
];
const SOCIALS = {
  linkedin:
    getSocialProfileByPlatform('linkedin')?.profileUrl ??
    'https://www.linkedin.com/in/aditya-gambhir/',
  github:
    getSocialProfileByPlatform('github')?.profileUrl ??
    'https://github.com/Aditya-gam',
  leetcode:
    getSocialProfileByPlatform('leetcode')?.profileUrl ??
    'https://leetcode.com/u/ByteAditya19/',
};
const SKILL_META: Record<string, { hue: number; icon: ReactNode }> = {
  Languages: {
    hue: 286,
    icon: <path d="m8 6-5 6 5 6M16 6l5 6-5 6" />,
  },
  Frameworks: {
    hue: 330,
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01" />
      </>
    ),
  },
  'Data / AI': {
    hue: 200,
    icon: (
      <>
        <circle cx="6" cy="6" r="2.2" />
        <circle cx="18" cy="7" r="2.2" />
        <circle cx="12" cy="17" r="2.4" />
        <path d="M7.6 7.4 10.6 15M16.6 8.6 13.4 15.4" />
      </>
    ),
  },
  'Cloud & DevOps': {
    hue: 28,
    icon: (
      <path d="M6.5 18A4.5 4.5 0 0 1 6 9.05 6 6 0 0 1 17.7 8 4.5 4.5 0 0 1 17.5 18z" />
    ),
  },
  Databases: {
    hue: 268,
    icon: (
      <>
        <ellipse cx="12" cy="5.5" rx="8" ry="3" />
        <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </>
    ),
  },
  Tooling: {
    hue: 222,
    icon: (
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2z" />
    ),
  },
};
const EMAIL = 'gambhir.aditya19@gmail.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── small helpers ────────────────────────────────────────────────────────────
const v = (o: Record<string, string | number>) => o as CSSProperties;

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function GithubMark({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}
function LinkedinMark({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.25h4V21H3zM10 9.25h3.84v1.6h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z" />
    </svg>
  );
}
function LeetcodeMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 3.5 7 11l4 4M9 11h11" />
      <path d="M14.5 20.5 8 14" />
    </svg>
  );
}
function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
    </svg>
  );
}
function MapPinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function ArrowUpRight({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

// Project card (featured = large, else compact)
function ProjectCard({
  p,
  featured,
  onMove,
  onLeave,
}: {
  p: ProjectData;
  featured: boolean;
  onMove: (e: MouseEvent<HTMLDivElement>) => void;
  onLeave: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  const hue = p.hue ?? 280;
  return (
    <div
      data-card
      data-reveal
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="ag-hov-card"
      style={v({
        '--ph': hue,
        borderRadius: featured ? '20px' : '18px',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        backdropFilter: 'blur(13px)',
        WebkitBackdropFilter: 'blur(13px)',
        boxShadow: 'var(--shadow)',
      })}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            position: 'relative',
            height: featured ? 168 : 108,
            borderRadius: featured ? '20px 20px 0 0' : '18px 18px 0 0',
            overflow: 'hidden',
            background: `linear-gradient(135deg,hsl(${hue} 78% 60%),hsl(${hue + 34} 76% 52%))`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(rgba(255,255,255,.18) 1px,transparent 1px)',
              backgroundSize: '18px 18px',
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: -30,
              right: -20,
              width: 150,
              height: 150,
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,.3)',
            }}
          />
          {p.tag && (
            <span
              style={{
                position: 'absolute',
                left: 18,
                bottom: 14,
                font: "500 12.5px 'Geist Mono',monospace",
                color: 'rgba(255,255,255,.92)',
                whiteSpace: 'nowrap',
              }}
            >
              // {p.tag}
            </span>
          )}
          {featured && (
            <span
              style={{
                position: 'absolute',
                left: 18,
                top: 16,
                padding: '4px 10px',
                borderRadius: 7,
                background: 'rgba(255,255,255,.18)',
                backdropFilter: 'blur(6px)',
                font: "600 11px 'Geist Mono',monospace",
                color: '#fff',
                letterSpacing: '.04em',
                textTransform: 'uppercase',
              }}
            >
              Featured
            </span>
          )}
        </div>
        <div style={{ padding: featured ? 22 : 18 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <h3
              style={{
                margin: 0,
                font: `600 ${featured ? 19 : 16}px Geist`,
                color: 'var(--fg)',
                letterSpacing: '-.01em',
                lineHeight: 1.22,
              }}
            >
              {p.title}
            </h3>
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} on GitHub`}
                className="ag-hov-ghlink"
                style={v({
                  flexShrink: 0,
                  width: featured ? 34 : 31,
                  height: featured ? 34 : 31,
                  borderRadius: 9,
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--fg-soft)',
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--border)',
                })}
              >
                <GithubMark size={featured ? 16 : 15} />
              </a>
            )}
          </div>
          <p
            style={{
              margin: featured ? '9px 0 16px' : '8px 0 14px',
              font: `400 ${featured ? 14 : 13}px Geist`,
              lineHeight: 1.5,
              color: 'var(--muted)',
            }}
          >
            {p.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {(p.technologies ?? []).map((t) => (
              <span
                key={t}
                style={{
                  padding: '3px 9px',
                  borderRadius: 7,
                  font: "500 11px 'Geist Mono',monospace",
                  color: 'var(--fg-soft)',
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--border)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Shown in place of the contact form until the email service is configured
// (page.tsx enables the form only when RESEND_API_KEY is set).
function ContactFallback({ onResume }: { readonly onResume: () => void }) {
  return (
    <div style={{ padding: '6px 2px' }}>
      <h3
        style={{
          margin: '0 0 10px',
          font: '700 22px Geist',
          color: 'var(--fg)',
          letterSpacing: '-.02em',
        }}
      >
        Have a role in mind?
      </h3>
      <p
        style={{
          margin: '0 0 22px',
          maxWidth: '44ch',
          font: '400 15px Geist',
          lineHeight: 1.6,
          color: 'var(--fg-soft)',
        }}
      >
        Send me the details — a short note with the role and the team is plenty.
        I usually reply within a day.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <a
          href={`mailto:${EMAIL}`}
          className="ag-hov-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            padding: '13px 22px',
            borderRadius: 12,
            font: '600 15px Geist',
            textDecoration: 'none',
            color: '#fff',
            background: 'var(--grad)',
            backgroundSize: '170% auto',
            boxShadow: '0 12px 30px -10px hsl(286 80% 55% / .75)',
          }}
        >
          Email me <ChevronIcon />
        </a>
        <button
          type="button"
          onClick={onResume}
          className="ag-hov-lift"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            padding: '13px 22px',
            borderRadius: 12,
            cursor: 'pointer',
            font: '600 15px Geist',
            color: 'var(--fg)',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-strong)',
          }}
        >
          <DownloadIcon /> Download Résumé
        </button>
      </div>
    </div>
  );
}

export default function PortfolioClient({
  contactFormEnabled = false,
}: {
  readonly contactFormEnabled?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [active, setActive] = useState('hero');
  const [role, setRole] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(0);

  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const themeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counted = useRef<Set<Element>>(new Set());

  const resume = getPrimaryResume();
  const featured = getFeaturedProjects();
  const more = getMoreProjects();

  const reduce = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const movePill = useCallback(() => {
    const pill = pillRef.current;
    const nav = navRef.current;
    if (!pill || !nav) return;
    const a = nav.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    if (!a) {
      pill.style.opacity = '0';
      return;
    }
    pill.style.opacity = '1';
    pill.style.width = `${a.offsetWidth}px`;
    pill.style.transform = `translateX(${a.offsetLeft}px)`;
  }, [active]);

  const runCount = (el: Element) => {
    const target = parseFloat(el.getAttribute('data-countup') || '0');
    const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    const suf = el.getAttribute('data-suffix') || '';
    if (reduce()) {
      el.textContent = target.toFixed(dec) + suf;
      return;
    }
    const dur = 1200;
    const st = performance.now();
    const tick = (now: number) => {
      const prog = Math.min(1, (now - st) / dur);
      const e = 1 - Math.pow(1 - prog, 3);
      el.textContent = (target * e).toFixed(dec) + suf;
      if (prog < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(dec) + suf;
    };
    requestAnimationFrame(tick);
  };

  const runCountups = useCallback(() => {
    const vh = window.innerHeight || 800;
    document.querySelectorAll('[data-countup]').forEach((el) => {
      if (counted.current.has(el)) return;
      if (el.getBoundingClientRect().top < vh * 0.9) {
        counted.current.add(el);
        runCount(el);
      }
    });
  }, []);

  const updateTimeline = useCallback(() => {
    const wrap = document.querySelector<HTMLElement>('[data-timeline]');
    const fill = document.querySelector<HTMLElement>('[data-timeline-fill]');
    if (!wrap || !fill) return;
    const r = wrap.getBoundingClientRect();
    const prog = Math.min(
      r.height,
      Math.max(0, window.innerHeight * 0.55 - r.top),
    );
    fill.style.height = `${r.height > 0 ? (prog / r.height) * 100 : 0}%`;
  }, []);

  const handleScroll = useCallback(() => {
    const ids = [
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'contact',
    ];
    let cur = 'hero';
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) cur = id;
    }
    if (cur === 'skills') cur = 'about';
    setActive((prev) => (prev !== cur ? cur : prev));
    if (navbarRef.current)
      navbarRef.current.setAttribute(
        'data-scrolled',
        window.scrollY > 10 ? 'true' : 'false',
      );
    runCountups();
    updateTimeline();
  }, [runCountups, updateTimeline]);

  // hero entrance — content is visible by default; arm then reveal, with a
  // safety-net that force-shows even if a frame is dropped.
  const heroEnter = useCallback(() => {
    if (reduce()) return;
    const els = [
      ...document.querySelectorAll<HTMLElement>('#hero [data-enter]'),
    ];
    els.forEach((el) => {
      el.style.transition = 'none';
      el.setAttribute('data-armed', '1');
    });
    if (els[0]) void els[0].offsetWidth;
    els.forEach((el) => (el.style.transition = ''));
    els.forEach((el, i) =>
      setTimeout(() => el.removeAttribute('data-armed'), 60 + i * 80),
    );
    const settle = 60 + els.length * 80 + 850;
    els.forEach((el) =>
      setTimeout(() => {
        const prev = el.style.transition;
        el.style.transition = 'none';
        el.removeAttribute('data-armed');
        void el.offsetWidth;
        el.style.transition = prev || '';
      }, settle),
    );
  }, []);

  useEffect(() => {
    mountedAt.current = Date.now();
    const raf = requestAnimationFrame(() => {
      movePill();
      runCountups();
      heroEnter();
      handleScroll();
    });
    const t = setTimeout(() => {
      movePill();
      runCountups();
      heroEnter();
      handleScroll();
    }, 160);

    const onScroll = () => handleScroll();
    const onResize = () => movePill();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setResumeOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, [movePill, runCountups, heroEnter, handleScroll]);

  useEffect(() => {
    movePill();
  }, [active, movePill]);

  useEffect(() => {
    if (reduce()) return;
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.setAttribute('data-theming', '1');
    if (themeTimer.current) clearTimeout(themeTimer.current);
    themeTimer.current = setTimeout(
      () => root.removeAttribute('data-theming'),
      560,
    );
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const onNav = (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) setMobileOpen(false);
  };

  const onCardMove = (e: MouseEvent<HTMLElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', `${e.clientX - r.left}px`);
    c.style.setProperty('--my', `${e.clientY - r.top}px`);
    c.style.setProperty('--glow', '1');
  };
  const onCardLeave = (e: MouseEvent<HTMLElement>) =>
    e.currentTarget.style.setProperty('--glow', '0');

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2900);
  };

  const downloadResume = () => {
    setResumeOpen(false);
    const a = document.createElement('a');
    a.href = `/${resume.filename}`;
    a.download = resume.downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Résumé (Software Engineer) — download started');
  };

  const onField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: false }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !EMAIL_RE.test(form.email)) errs.email = true;
    if (!form.subject.trim()) errs.subject = true;
    if (!form.message.trim()) errs.message = true;
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          company: honeypot.current?.value ?? '',
          // eslint-disable-next-line react-hooks/purity -- event handler, not render
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      if (res.ok) {
        setSent(true);
        setErrors({});
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error ?? 'Could not send — please email me directly.');
      }
    } catch {
      showToast('Network error — please email me directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSent(false);
    setForm({ name: '', email: '', subject: '', message: '' });
    mountedAt.current = Date.now();
  };

  const roleTransform = `translateY(-${role * 1.3}em)`;
  const stats = aboutData.stats;
  const certs = aboutData.certifications.slice(0, 6);
  const extraCerts = aboutData.certifications.length - certs.length;
  const pub = aboutData.publications[0];

  const gradText: CSSProperties = {
    background: 'var(--grad)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--fg)',
      }}
    >
      {/* animated mesh + dotted grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={
            {
              position: 'absolute',
              top: '-20%',
              left: '-12%',
              width: '46vw',
              height: '46vw',
              borderRadius: '50%',
              background:
                'radial-gradient(circle,hsl(276 88% 62% / .4),transparent 70%)',
              filter: 'blur(90px)',
              opacity: 'var(--mesh)',
              animation: 'var(--drift1) 28s ease-in-out infinite',
            } as CSSProperties
          }
        />
        <div
          style={
            {
              position: 'absolute',
              top: '22%',
              right: '-16%',
              width: '38vw',
              height: '38vw',
              borderRadius: '50%',
              background:
                'radial-gradient(circle,hsl(322 86% 60% / .3),transparent 70%)',
              filter: 'blur(92px)',
              opacity: 'var(--mesh)',
              animation: 'var(--drift2) 34s ease-in-out infinite',
            } as CSSProperties
          }
        />
        <div
          style={
            {
              position: 'absolute',
              bottom: '-24%',
              left: '30%',
              width: '40vw',
              height: '40vw',
              borderRadius: '50%',
              background:
                'radial-gradient(circle,hsl(256 86% 60% / .32),transparent 70%)',
              filter: 'blur(92px)',
              opacity: 'var(--mesh)',
              animation: 'var(--drift3) 31s ease-in-out infinite',
            } as CSSProperties
          }
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(var(--dot) 1px,transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage:
              'radial-gradient(ellipse 70% 54% at 50% 22%,#000 28%,transparent 76%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 54% at 50% 22%,#000 28%,transparent 76%)',
            opacity: 0.5,
          }}
        />
      </div>

      {/* NAV */}
      <nav
        ref={navbarRef}
        data-nav-bar
        data-scrolled="false"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '13px clamp(16px,4vw,40px)',
          borderBottom: '1px solid transparent',
          transition:
            'background .35s,border-color .35s,box-shadow .35s,backdrop-filter .35s',
        }}
      >
        <a
          href="#hero"
          onClick={onNav}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'var(--grad)',
              display: 'grid',
              placeItems: 'center',
              font: "700 13px 'Geist Mono',monospace",
              color: '#fff',
              boxShadow: '0 6px 18px -6px hsl(286 80% 55% / .7)',
              letterSpacing: '.5px',
            }}
          >
            AG
          </span>
          <span
            data-nav-name
            style={{
              font: '600 15px Geist',
              color: 'var(--fg)',
              letterSpacing: '-.01em',
            }}
          >
            Aditya Gambhir
          </span>
        </a>

        <div
          data-desktop-nav
          ref={navRef}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            padding: 4,
            borderRadius: 999,
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          <div
            ref={pillRef}
            style={{
              position: 'absolute',
              top: 4,
              bottom: 4,
              left: 0,
              width: 0,
              borderRadius: 999,
              background: 'hsl(276 80% 60% / .14)',
              border: '1px solid hsl(276 80% 60% / .26)',
              opacity: 0,
              transition:
                'transform .42s cubic-bezier(.4,1.1,.4,1),width .42s cubic-bezier(.4,1.1,.4,1),opacity .3s',
              zIndex: 0,
            }}
          />
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              data-nav={n.id}
              data-active={active === n.id}
              onClick={onNav}
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '8px 15px',
                borderRadius: 999,
                font: '500 13.5px Geist',
                textDecoration: 'none',
                transition: 'color .25s',
              }}
            >
              {n.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            suppressHydrationWarning
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              color: 'var(--fg)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <svg
              data-ico="moon"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
            <svg
              data-ico="sun"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </button>
          <button
            data-resume-btn
            onClick={() => setResumeOpen(true)}
            className="ag-hov-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 16px',
              borderRadius: 12,
              cursor: 'pointer',
              font: '600 13.5px Geist',
              color: '#fff',
              background: 'var(--grad)',
              backgroundSize: '160% auto',
              border: 'none',
              boxShadow: '0 8px 22px -8px hsl(286 80% 55% / .7)',
            }}
          >
            <DownloadIcon size={15} />
            <span data-resume-label>Résumé</span>
          </button>
          <button
            data-burger
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              color: 'var(--fg)',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- dismiss-on-click backdrop; keyboard users close via Esc + the drawer's Close button */}
      <div
        data-scrim
        data-open={mobileOpen}
        onClick={() => setMobileOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 48,
          background: 'rgba(8,5,20,.5)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }}
      />
      <aside
        data-mobile
        data-open={mobileOpen}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 49,
          width: 'min(84vw,330px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 18px 24px',
          background: 'var(--nav-glass)',
          borderLeft: '1px solid var(--border)',
          backdropFilter: 'blur(26px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(26px) saturate(1.6)',
          boxShadow: '-24px 0 70px -34px rgba(0,0,0,.7)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 22,
          }}
        >
          <span
            style={{
              font: "600 11px 'Geist Mono',monospace",
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '.12em',
            }}
          >
            Navigate
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              color: 'var(--fg)',
            }}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={onNav}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 16px',
                borderRadius: 12,
                font: '600 17px Geist',
                color: 'var(--fg)',
                textDecoration: 'none',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
            >
              {n.label}
              <span style={{ color: 'var(--brand-ink)', fontSize: 15 }}>→</span>
            </a>
          ))}
        </div>
        <button
          onClick={() => {
            setMobileOpen(false);
            setResumeOpen(true);
          }}
          style={{
            marginTop: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            padding: 15,
            borderRadius: 12,
            cursor: 'pointer',
            font: '600 15px Geist',
            color: '#fff',
            background: 'var(--grad)',
            backgroundSize: '170% auto',
            border: 'none',
            boxShadow: '0 12px 28px -10px hsl(286 80% 55% / .7)',
          }}
        >
          <DownloadIcon /> Download Résumé
        </button>
      </aside>

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* HERO */}
        <section
          id="hero"
          style={{
            minHeight: '100svh',
            display: 'flex',
            alignItems: 'center',
            padding: '104px clamp(20px,4vw,40px) 72px',
          }}
        >
          <div
            data-hero-grid
            style={{
              width: '100%',
              maxWidth: 1180,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1.08fr .92fr',
              gap: 'clamp(28px,5vw,68px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                data-enter
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '7px 14px',
                  borderRadius: 999,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  font: "500 12.5px 'Geist Mono',monospace",
                  color: 'var(--fg-soft)',
                }}
              >
                <span
                  style={
                    {
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--magenta)',
                      animation: 'var(--pulse) 2.4s infinite',
                    } as CSSProperties
                  }
                />
                Open to SDE &amp; AI Engineer roles
              </div>
              <p
                data-enter
                style={{
                  margin: '22px 0 6px',
                  font: "500 14px 'Geist Mono',monospace",
                  color: 'var(--brand-ink)',
                  letterSpacing: '.02em',
                }}
              >
                Hello, I&apos;m Aditya
              </p>
              <h1
                data-enter
                style={
                  {
                    margin: 0,
                    font: '800 clamp(44px,8.2vw,84px) Geist',
                    lineHeight: 0.98,
                    letterSpacing: '-.035em',
                    backgroundSize: '200% auto',
                    animation: 'var(--shimmer) 7s linear infinite',
                    ...gradText,
                  } as CSSProperties
                }
              >
                Aditya Gambhir
              </h1>
              <div
                data-enter
                style={{
                  margin: '16px 0 0',
                  fontSize: 'clamp(20px,3.4vw,30px)',
                  height: '1.3em',
                  overflow: 'hidden',
                }}
                aria-label={ROLES[role]}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform .55s cubic-bezier(.5,1.2,.4,1)',
                    transform: roleTransform,
                  }}
                >
                  {ROLES.map((r) => (
                    <span
                      key={r}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '1.3em',
                        font: '600 clamp(20px,3.4vw,30px) Geist',
                        color: 'var(--fg)',
                        whiteSpace: 'nowrap',
                        letterSpacing: '-.01em',
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <p
                data-enter
                style={
                  {
                    margin: '20px 0 0',
                    maxWidth: '42ch',
                    font: '400 clamp(15px,1.6vw,17px) Geist',
                    lineHeight: 1.62,
                    color: 'var(--fg-soft)',
                    textWrap: 'pretty',
                  } as CSSProperties
                }
              >
                {aboutData.hero.description}
              </p>
              <div
                data-enter
                data-hero-cta
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
                  marginTop: 30,
                }}
              >
                <a
                  href="#contact"
                  onClick={onNav}
                  className="ag-hov-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '13px 24px',
                    borderRadius: 12,
                    font: '600 15px Geist',
                    textDecoration: 'none',
                    color: '#fff',
                    background: 'var(--grad)',
                    backgroundSize: '170% auto',
                    boxShadow: '0 12px 30px -10px hsl(286 80% 55% / .75)',
                  }}
                >
                  Let&apos;s talk <ChevronIcon />
                </a>
                <button
                  onClick={() => setResumeOpen(true)}
                  className="ag-hov-lift"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '13px 22px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    font: '600 15px Geist',
                    color: 'var(--fg)',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-strong)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <DownloadIcon /> Download Résumé
                </button>
              </div>
              <div
                data-enter
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginTop: 30,
                }}
              >
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="ag-hov-social"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--fg-soft)',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <LinkedinMark />
                </a>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="ag-hov-social"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--fg-soft)',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <GithubMark size={19} />
                </a>
                <a
                  href={SOCIALS.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className="ag-hov-social"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--fg-soft)',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                  }}
                >
                  <LeetcodeMark />
                </a>
              </div>
            </div>

            {/* terminal visual */}
            <div data-hero-visual data-enter style={{ position: 'relative' }}>
              <div
                data-card
                style={v({
                  '--ph': 286,
                  borderRadius: 20,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  backdropFilter: 'blur(16px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(16px) saturate(1.3)',
                  boxShadow: 'var(--shadow-lg)',
                })}
              >
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      padding: '14px 16px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: 'hsl(330 80% 62%)',
                      }}
                    />
                    <span
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: 'hsl(46 90% 60%)',
                      }}
                    />
                    <span
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: 'hsl(150 60% 52%)',
                      }}
                    />
                    <span
                      style={{
                        marginLeft: 8,
                        font: "500 12px 'Geist Mono',monospace",
                        color: 'var(--muted)',
                      }}
                    >
                      aditya@portfolio — zsh
                    </span>
                  </div>
                  <div
                    style={{
                      padding: '20px 20px 24px',
                      font: "500 13.5px/2 'Geist Mono',monospace",
                    }}
                  >
                    <div style={{ color: 'var(--muted)' }}>$ whoami</div>
                    <div style={{ color: 'var(--fg)' }}>
                      → Software &amp; AI Engineer
                    </div>
                    <div style={{ color: 'var(--muted)', marginTop: 8 }}>
                      $ stack --core
                    </div>
                    <div style={{ color: 'var(--brand-ink)' }}>
                      → Java · Spring Boot · Python · FastAPI
                    </div>
                    <div style={{ color: 'var(--brand-ink)' }}>
                      → Kafka · PostgreSQL · Docker · Kubernetes
                    </div>
                    <div style={{ color: 'var(--muted)', marginTop: 8 }}>
                      $ focus --now
                    </div>
                    <div style={{ color: 'var(--fg)' }}>
                      → GenAI · RAG · agentic systems
                      <span
                        style={
                          {
                            display: 'inline-block',
                            width: 9,
                            height: 17,
                            marginLeft: 3,
                            verticalAlign: -3,
                            background: 'var(--brand)',
                            animation: 'var(--pulse) 1.4s steps(1) infinite',
                            borderRadius: 1,
                          } as CSSProperties
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={
                  {
                    position: 'absolute',
                    top: -16,
                    right: -10,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 14px',
                    borderRadius: 12,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow)',
                    font: '600 12.5px Geist',
                    color: 'var(--fg)',
                    animation: 'var(--float) 5.5s ease-in-out infinite',
                  } as CSSProperties
                }
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'hsl(150 65% 48%)',
                    boxShadow: '0 0 0 3px hsl(150 65% 48% / .2)',
                  }}
                />
                99.9% uptime
              </div>
              <div
                style={
                  {
                    position: 'absolute',
                    bottom: -18,
                    left: -12,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 14px',
                    borderRadius: 12,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow)',
                    font: '600 12.5px Geist',
                    color: 'var(--fg)',
                    animation: 'var(--float) 6.5s ease-in-out infinite .6s',
                  } as CSSProperties
                }
              >
                <span
                  style={{
                    font: "600 12px 'Geist Mono',monospace",
                    color: 'var(--magenta)',
                  }}
                >
                  ▲
                </span>{' '}
                100k+ events/day
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          style={{
            padding: 'clamp(68px,8.5vw,108px) clamp(20px,4vw,40px)',
            maxWidth: 1180,
            margin: '0 auto',
          }}
        >
          <div data-reveal style={{ marginBottom: 44 }}>
            <p
              style={{
                margin: '0 0 10px',
                font: "600 13px 'Geist Mono',monospace",
                color: 'var(--brand-ink)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
            >
              / about
            </p>
            <h2
              style={{
                margin: 0,
                font: '700 clamp(30px,4.6vw,46px) Geist',
                letterSpacing: '-.03em',
                color: 'var(--fg)',
                maxWidth: '18ch',
                lineHeight: 1.04,
              }}
            >
              Engineer who ships across the whole stack
            </h2>
          </div>
          <div
            data-about-grid
            style={{
              display: 'grid',
              gridTemplateColumns: '300px 1fr',
              gap: 'clamp(28px,4vw,56px)',
              alignItems: 'start',
            }}
          >
            <div
              data-reveal
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <div style={{ position: 'relative', width: 210, height: 210 }}>
                <div
                  aria-hidden="true"
                  style={
                    {
                      position: 'absolute',
                      inset: -8,
                      borderRadius: '50%',
                      background:
                        'conic-gradient(from 180deg,var(--g1),var(--g2),var(--g3),var(--g1))',
                      filter: 'blur(11px)',
                      opacity: 0.85,
                      animation: 'var(--shimmer) 7s linear infinite',
                      backgroundSize: '200% 200%',
                    } as CSSProperties
                  }
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    padding: 3,
                    background: 'var(--grad)',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'var(--surface)',
                      display: 'grid',
                      placeItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={{
                        font: '700 64px Geist',
                        letterSpacing: '-.04em',
                        ...gradText,
                      }}
                    >
                      AG
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 999,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  font: '500 13px Geist',
                  color: 'var(--fg-soft)',
                }}
              >
                <MapPinIcon /> {aboutData.location}
              </div>
            </div>
            <div data-reveal>
              <p
                style={
                  {
                    margin: '0 0 18px',
                    font: '400 clamp(16px,1.8vw,19px) Geist',
                    lineHeight: 1.66,
                    color: 'var(--fg-soft)',
                    textWrap: 'pretty',
                  } as CSSProperties
                }
              >
                {aboutData.professionalSummary.description}
              </p>
              <div
                data-dual
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                  marginTop: 26,
                }}
              >
                {[
                  {
                    d: aboutData.dualExpertise.softwareEngineer,
                    hue: 268,
                    label: aboutData.dualExpertise.softwareEngineer.title,
                  },
                  {
                    d: aboutData.dualExpertise.dataScientist,
                    hue: 162,
                    label: aboutData.dualExpertise.dataScientist.title,
                  },
                ].map((col) => (
                  <div
                    key={col.label}
                    data-card
                    onMouseMove={onCardMove}
                    onMouseLeave={onCardLeave}
                    style={v({
                      '--ph': col.hue,
                      borderRadius: 18,
                      padding: 22,
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      boxShadow: 'var(--shadow)',
                    })}
                  >
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <h3
                        style={{
                          margin: '0 0 14px',
                          font: '600 15px Geist',
                          color: 'var(--fg)',
                          lineHeight: 1.2,
                        }}
                      >
                        {col.label}
                      </h3>
                      <ul
                        style={{
                          margin: 0,
                          padding: 0,
                          listStyle: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 9,
                        }}
                      >
                        {col.d.achievements.map((a) => (
                          <li
                            key={a}
                            style={{
                              display: 'flex',
                              gap: 9,
                              font: '400 13px Geist',
                              lineHeight: 1.5,
                              color: 'var(--fg-soft)',
                            }}
                          >
                            <span
                              style={{
                                color: `hsl(${col.hue} 70% 55%)`,
                                marginTop: 1,
                                flexShrink: 0,
                              }}
                            >
                              ▹
                            </span>
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 6,
                          marginTop: 14,
                        }}
                      >
                        {col.d.technologies.map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: '4px 10px',
                              borderRadius: 8,
                              font: "500 11.5px 'Geist Mono',monospace",
                              color: 'var(--fg-soft)',
                              background: `hsl(${col.hue} 70% 55% / .1)`,
                              border: `1px solid hsl(${col.hue} 70% 55% / .2)`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* stats */}
          <div
            data-reveal
            style={{
              marginTop: 34,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
              gap: 1,
              borderRadius: 20,
              overflow: 'hidden',
              background: 'var(--border)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            {[
              {
                val: stats.experience,
                dec: stats.experience.includes('.') ? 1 : 0,
                suf: '+',
                label: 'Years experience',
              },
              {
                val: stats.projects,
                dec: 0,
                suf: '+',
                label: 'Projects shipped',
              },
              { val: stats.gpa, dec: 2, suf: '', label: 'Graduate GPA' },
              {
                val: stats.publications,
                dec: 0,
                suf: '',
                label: 'Publication',
              },
            ].map((s) => {
              const num = parseFloat(s.val);
              return (
                <div
                  key={s.label}
                  style={{ padding: '26px 22px', background: 'var(--surface)' }}
                >
                  <div
                    style={{
                      font: '700 clamp(30px,4.4vw,42px) Geist',
                      letterSpacing: '-.03em',
                      ...gradText,
                    }}
                  >
                    <span
                      data-countup={num}
                      data-suffix={s.suf}
                      data-dec={s.dec}
                    >
                      {s.val}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      font: "500 12px 'Geist Mono',monospace",
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '.04em',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          style={{
            padding: 'clamp(68px,8.5vw,108px) clamp(20px,4vw,40px)',
            maxWidth: 1180,
            margin: '0 auto',
          }}
        >
          <div data-reveal style={{ marginBottom: 44 }}>
            <p
              style={{
                margin: '0 0 10px',
                font: "600 13px 'Geist Mono',monospace",
                color: 'var(--brand-ink)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
            >
              / skills
            </p>
            <h2
              style={{
                margin: 0,
                font: '700 clamp(30px,4.6vw,46px) Geist',
                letterSpacing: '-.03em',
                color: 'var(--fg)',
                lineHeight: 1.04,
              }}
            >
              The toolbox
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(258px,1fr))',
              gap: 16,
            }}
          >
            {aboutData.skillsMatrix.map((group) => {
              const meta = SKILL_META[group.category] ?? {
                hue: 286,
                icon: null,
              };
              return (
                <div
                  key={group.category}
                  data-card
                  data-reveal
                  onMouseMove={onCardMove}
                  onMouseLeave={onCardLeave}
                  style={v({
                    '--ph': meta.hue,
                    padding: 22,
                    borderRadius: 18,
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: 'var(--shadow)',
                  })}
                >
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        display: 'grid',
                        placeItems: 'center',
                        marginBottom: 15,
                        background: `hsl(${meta.hue} 85% 60% / .14)`,
                        border: `1px solid hsl(${meta.hue} 85% 60% / .3)`,
                        color: `hsl(${meta.hue} 78% 56%)`,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {meta.icon}
                      </svg>
                    </div>
                    <h3
                      style={{
                        margin: '0 0 12px',
                        font: '600 16px Geist',
                        color: 'var(--fg)',
                      }}
                    >
                      {group.category}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {group.items.map((s) => (
                        <span
                          key={s}
                          style={{
                            padding: '5px 11px',
                            borderRadius: 8,
                            font: "500 12px 'Geist Mono',monospace",
                            color: 'var(--fg-soft)',
                            background: `hsl(${meta.hue} 70% 56% / .1)`,
                            border: `1px solid hsl(${meta.hue} 70% 56% / .2)`,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          style={{
            padding: 'clamp(68px,8.5vw,108px) clamp(20px,4vw,40px)',
            maxWidth: 1180,
            margin: '0 auto',
          }}
        >
          <div
            data-reveal
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 20,
              flexWrap: 'wrap',
              marginBottom: 44,
            }}
          >
            <div>
              <p
                style={{
                  margin: '0 0 10px',
                  font: "600 13px 'Geist Mono',monospace",
                  color: 'var(--brand-ink)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                }}
              >
                / projects
              </p>
              <h2
                style={{
                  margin: 0,
                  font: '700 clamp(30px,4.6vw,46px) Geist',
                  letterSpacing: '-.03em',
                  color: 'var(--fg)',
                  lineHeight: 1.04,
                }}
              >
                Selected work
              </h2>
            </div>
            <a
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                font: '600 14px Geist',
                color: 'var(--brand-ink)',
                textDecoration: 'none',
                padding: '8px 0',
              }}
            >
              View all projects <ArrowUpRight />
            </a>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))',
              gap: 18,
              marginBottom: 18,
            }}
          >
            {featured.map((p) => (
              <ProjectCard
                key={p.title}
                p={p}
                featured
                onMove={onCardMove}
                onLeave={onCardLeave}
              />
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))',
              gap: 16,
            }}
          >
            {more.map((p) => (
              <ProjectCard
                key={p.title}
                p={p}
                featured={false}
                onMove={onCardMove}
                onLeave={onCardLeave}
              />
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          style={{
            padding: 'clamp(68px,8.5vw,108px) clamp(20px,4vw,40px)',
            maxWidth: 1180,
            margin: '0 auto',
          }}
        >
          <div data-reveal style={{ marginBottom: 44 }}>
            <p
              style={{
                margin: '0 0 10px',
                font: "600 13px 'Geist Mono',monospace",
                color: 'var(--brand-ink)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
            >
              / experience
            </p>
            <h2
              style={{
                margin: 0,
                font: '700 clamp(30px,4.6vw,46px) Geist',
                letterSpacing: '-.03em',
                color: 'var(--fg)',
                lineHeight: 1.04,
              }}
            >
              The journey so far
            </h2>
          </div>
          <div data-timeline style={{ position: 'relative', paddingLeft: 34 }}>
            <div
              style={{
                position: 'absolute',
                left: 9,
                top: 6,
                bottom: 6,
                width: 2,
                background: 'var(--border)',
                borderRadius: 2,
              }}
            />
            <div
              data-timeline-fill
              style={{
                position: 'absolute',
                left: 9,
                top: 6,
                width: 2,
                height: 0,
                background: 'var(--grad)',
                borderRadius: 2,
                transition: 'height .15s linear',
              }}
            />
            {aboutData.experience.map((e) => (
              <div
                key={`${e.company}-${e.period}`}
                data-reveal
                style={{ position: 'relative', paddingBottom: 30 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: -33,
                    top: 4,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'var(--surface)',
                    border: '2px solid var(--brand)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: 'var(--grad)',
                    }}
                  />
                </div>
                <div
                  data-card
                  onMouseMove={onCardMove}
                  onMouseLeave={onCardLeave}
                  style={v({
                    '--ph': 286,
                    borderRadius: 18,
                    padding: '22px 24px',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: 'var(--shadow)',
                  })}
                >
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 14,
                        flexWrap: 'wrap',
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            margin: 0,
                            font: '600 18px Geist',
                            color: 'var(--fg)',
                            letterSpacing: '-.01em',
                          }}
                        >
                          {e.role}
                        </h3>
                        <p
                          style={{
                            margin: '3px 0 0',
                            font: '500 14px Geist',
                            color: 'var(--brand-ink)',
                          }}
                        >
                          {e.company}
                        </p>
                      </div>
                      <span
                        style={{
                          flexShrink: 0,
                          padding: '5px 12px',
                          borderRadius: 999,
                          font: "500 12px 'Geist Mono',monospace",
                          color: 'var(--fg-soft)',
                          background: 'var(--bg-soft)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {e.period}
                      </span>
                    </div>
                    <ul
                      style={{
                        margin: '15px 0 0',
                        padding: 0,
                        listStyle: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 9,
                      }}
                    >
                      {e.bullets.map((b) => (
                        <li
                          key={b}
                          style={{
                            display: 'flex',
                            gap: 10,
                            font: '400 13.5px Geist',
                            lineHeight: 1.55,
                            color: 'var(--fg-soft)',
                          }}
                        >
                          <span
                            style={{
                              color: 'var(--brand)',
                              marginTop: 2,
                              flexShrink: 0,
                            }}
                          >
                            ▹
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* education */}
          <div data-reveal style={{ marginTop: 44 }}>
            <h3
              style={{
                margin: '0 0 18px',
                font: "600 18px 'Geist Mono',monospace",
                color: 'var(--fg)',
                letterSpacing: '-.01em',
              }}
            >
              Education
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
                gap: 16,
              }}
            >
              {aboutData.education.map((d) => (
                <div
                  key={d.degree}
                  style={{
                    borderRadius: 18,
                    padding: '22px 24px',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 12,
                    }}
                  >
                    <h4
                      style={{
                        margin: 0,
                        font: '600 16px Geist',
                        color: 'var(--fg)',
                        lineHeight: 1.3,
                      }}
                    >
                      {d.degree}
                    </h4>
                    <span
                      style={{
                        flexShrink: 0,
                        padding: '5px 11px',
                        borderRadius: 9,
                        font: "600 12.5px 'Geist Mono',monospace",
                        color: '#fff',
                        background: 'var(--grad)',
                      }}
                    >
                      {d.gpa}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '6px 0 14px',
                      font: '500 13.5px Geist',
                      color: 'var(--muted)',
                    }}
                  >
                    {d.school}
                    {d.graduated && ` · ${d.graduated}`}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {d.courses.map((c) => (
                      <span
                        key={c}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 7,
                          font: "500 11px 'Geist Mono',monospace",
                          color: 'var(--fg-soft)',
                          background: 'var(--bg-soft)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* certs + publication */}
          <div
            data-reveal
            data-about-grid
            style={{
              marginTop: 40,
              display: 'grid',
              gridTemplateColumns: '1.15fr .85fr',
              gap: 16,
            }}
          >
            <div
              style={{
                borderRadius: 18,
                padding: '22px 24px',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <h3
                style={{
                  margin: '0 0 16px',
                  font: "600 16px 'Geist Mono',monospace",
                  color: 'var(--fg)',
                }}
              >
                Certifications
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {certs.map((c) => (
                  <div
                    key={c.title}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      padding: '11px 14px',
                      borderRadius: 12,
                      background: 'var(--bg-soft)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 11,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          display: 'grid',
                          placeItems: 'center',
                          background: 'hsl(286 70% 58% / .14)',
                          color: 'var(--brand-ink)',
                        }}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="8" r="5" />
                          <path d="m9 12.5-1 8 4-2.4 4 2.4-1-8" />
                        </svg>
                      </span>
                      <span
                        style={{
                          font: '500 13px Geist',
                          color: 'var(--fg)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {c.title}
                      </span>
                    </div>
                    <span
                      style={{
                        flexShrink: 0,
                        font: "500 11.5px 'Geist Mono',monospace",
                        color: 'var(--muted)',
                      }}
                    >
                      {c.provider} · {c.year}
                    </span>
                  </div>
                ))}
                {extraCerts > 0 && (
                  <p
                    style={{
                      margin: '4px 2px 0',
                      font: "500 12px 'Geist Mono',monospace",
                      color: 'var(--muted)',
                    }}
                  >
                    + {extraCerts} more — Coursera, Infosys &amp; Udemy
                  </p>
                )}
              </div>
            </div>
            {pub && (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                data-card
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
                className="ag-hov-card"
                style={v({
                  '--ph': 330,
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: 18,
                  padding: 24,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: 'var(--shadow)',
                })}
              >
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      padding: '5px 11px',
                      borderRadius: 999,
                      font: "600 11px 'Geist Mono',monospace",
                      color: 'var(--magenta)',
                      background: 'hsl(330 70% 58% / .12)',
                      border: '1px solid hsl(330 70% 58% / .24)',
                      textTransform: 'uppercase',
                      letterSpacing: '.05em',
                    }}
                  >
                    Publication · {pub.year}
                  </span>
                  <h3
                    style={{
                      margin: '14px 0 8px',
                      font: '600 17px Geist',
                      color: 'var(--fg)',
                      lineHeight: 1.32,
                    }}
                  >
                    {pub.title}
                  </h3>
                  <p
                    style={{
                      margin: '0 0 14px',
                      font: '400 13px Geist',
                      lineHeight: 1.55,
                      color: 'var(--muted)',
                    }}
                  >
                    Surveys object detection, tracking algorithms, and semantic
                    segmentation for traffic-law enforcement — covering
                    occlusion, splits, and deep-learning methods.
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      font: '500 13px Geist',
                      color: 'var(--brand-ink)',
                    }}
                  >
                    IJISAE · Read paper <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            )}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          style={{
            padding:
              'clamp(68px,8.5vw,108px) clamp(20px,4vw,40px) clamp(52px,7vw,80px)',
            maxWidth: 1180,
            margin: '0 auto',
          }}
        >
          <div data-reveal style={{ marginBottom: 44 }}>
            <p
              style={{
                margin: '0 0 10px',
                font: "600 13px 'Geist Mono',monospace",
                color: 'var(--brand-ink)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
            >
              / contact
            </p>
            <h2
              style={{
                margin: 0,
                font: '700 clamp(30px,4.6vw,46px) Geist',
                letterSpacing: '-.03em',
                color: 'var(--fg)',
                lineHeight: 1.04,
                maxWidth: '16ch',
              }}
            >
              Let&apos;s build something
            </h2>
          </div>
          <div
            data-contact-grid
            style={{
              display: 'grid',
              gridTemplateColumns: '.85fr 1.15fr',
              gap: 'clamp(20px,3vw,40px)',
              alignItems: 'start',
            }}
          >
            <div data-reveal>
              <p
                style={
                  {
                    margin: '0 0 26px',
                    font: '400 15.5px Geist',
                    lineHeight: 1.6,
                    color: 'var(--fg-soft)',
                    textWrap: 'pretty',
                  } as CSSProperties
                }
              >
                Open to SDE and AI-Engineer roles. The fastest way to reach me
                is email — I usually reply within a day.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="ag-hov-lift"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  padding: '15px 17px',
                  borderRadius: 16,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  textDecoration: 'none',
                  marginBottom: 11,
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: 'grid',
                    placeItems: 'center',
                    background: 'var(--grad)',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: 'block',
                      font: "500 11.5px 'Geist Mono',monospace",
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '.04em',
                    }}
                  >
                    Email
                  </span>
                  <span
                    style={{
                      display: 'block',
                      font: '500 14.5px Geist',
                      color: 'var(--fg)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {EMAIL}
                  </span>
                </span>
              </a>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  padding: '15px 17px',
                  borderRadius: 16,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  marginBottom: 22,
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: 'grid',
                    placeItems: 'center',
                    background: 'var(--bg-soft)',
                    border: '1px solid var(--border)',
                    color: 'var(--brand-ink)',
                    flexShrink: 0,
                  }}
                >
                  <MapPinIcon size={18} />
                </span>
                <span>
                  <span
                    style={{
                      display: 'block',
                      font: "500 11.5px 'Geist Mono',monospace",
                      color: 'var(--muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '.04em',
                    }}
                  >
                    Location
                  </span>
                  <span
                    style={{
                      display: 'block',
                      font: '500 14.5px Geist',
                      color: 'var(--fg)',
                    }}
                  >
                    {aboutData.location}
                  </span>
                </span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  {
                    href: SOCIALS.linkedin,
                    label: 'LinkedIn',
                    icon: <LinkedinMark size={20} />,
                  },
                  {
                    href: SOCIALS.github,
                    label: 'GitHub',
                    icon: <GithubMark size={20} />,
                  },
                  {
                    href: SOCIALS.leetcode,
                    label: 'LeetCode',
                    icon: <LeetcodeMark size={19} />,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="ag-hov-social"
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 7,
                      padding: '15px 8px',
                      borderRadius: 12,
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--fg-soft)',
                      textDecoration: 'none',
                    }}
                  >
                    {s.icon}
                    <span style={{ font: "500 11.5px 'Geist Mono',monospace" }}>
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div
              data-reveal
              data-card
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
              style={v({
                '--ph': 286,
                borderRadius: 20,
                padding: 'clamp(22px,3vw,32px)',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                boxShadow: 'var(--shadow-lg)',
              })}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                {!contactFormEnabled ? (
                  <ContactFallback onResume={() => setResumeOpen(true)} />
                ) : !sent ? (
                  <form onSubmit={onSubmit} noValidate>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 14,
                      }}
                    >
                      <div>
                        <label
                          htmlFor="ag-name"
                          style={{
                            display: 'block',
                            font: "500 12px 'Geist Mono',monospace",
                            color: 'var(--fg-soft)',
                            marginBottom: 7,
                          }}
                        >
                          Name
                        </label>
                        <input
                          id="ag-name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={onField}
                          data-field
                          data-err={!!errors.name}
                          placeholder="Jane Doe"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: 12,
                            font: '400 14px Geist',
                            color: 'var(--fg)',
                            background: 'var(--bg-soft)',
                            border: '1px solid var(--border-strong)',
                            outline: 'none',
                          }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="ag-email"
                          style={{
                            display: 'block',
                            font: "500 12px 'Geist Mono',monospace",
                            color: 'var(--fg-soft)',
                            marginBottom: 7,
                          }}
                        >
                          Email
                        </label>
                        <input
                          id="ag-email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={onField}
                          data-field
                          data-err={!!errors.email}
                          placeholder="jane@company.com"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: 12,
                            font: '400 14px Geist',
                            color: 'var(--fg)',
                            background: 'var(--bg-soft)',
                            border: '1px solid var(--border-strong)',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <label
                        htmlFor="ag-subject"
                        style={{
                          display: 'block',
                          font: "500 12px 'Geist Mono',monospace",
                          color: 'var(--fg-soft)',
                          marginBottom: 7,
                        }}
                      >
                        Subject
                      </label>
                      <input
                        id="ag-subject"
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={onField}
                        data-field
                        data-err={!!errors.subject}
                        placeholder="Let's talk about a role"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 12,
                          font: '400 14px Geist',
                          color: 'var(--fg)',
                          background: 'var(--bg-soft)',
                          border: '1px solid var(--border-strong)',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <label
                        htmlFor="ag-message"
                        style={{
                          display: 'block',
                          font: "500 12px 'Geist Mono',monospace",
                          color: 'var(--fg-soft)',
                          marginBottom: 7,
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        id="ag-message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={onField}
                        data-field
                        data-err={!!errors.message}
                        placeholder="Tell me a bit about the opportunity…"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: 12,
                          font: '400 14px Geist',
                          color: 'var(--fg)',
                          background: 'var(--bg-soft)',
                          border: '1px solid var(--border-strong)',
                          outline: 'none',
                          resize: 'vertical',
                          minHeight: 104,
                        }}
                      />
                    </div>
                    {/* honeypot */}
                    <div
                      aria-hidden="true"
                      style={{ position: 'absolute', left: '-9999px' }}
                    >
                      <label htmlFor="ag-company">Company</label>
                      <input
                        ref={honeypot}
                        id="ag-company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="ag-hov-btn"
                      style={{
                        marginTop: 18,
                        width: '100%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 9,
                        padding: 14,
                        borderRadius: 12,
                        cursor: submitting ? 'default' : 'pointer',
                        font: '600 15px Geist',
                        color: '#fff',
                        background: 'var(--grad)',
                        backgroundSize: '170% auto',
                        border: 'none',
                        boxShadow: '0 12px 30px -10px hsl(286 80% 55% / .75)',
                        opacity: submitting ? 0.75 : 1,
                      }}
                    >
                      {submitting ? 'Sending…' : 'Send message'}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        margin: '0 auto 18px',
                        borderRadius: 18,
                        display: 'grid',
                        placeItems: 'center',
                        background: 'var(--grad)',
                        color: '#fff',
                        boxShadow: '0 14px 34px -10px hsl(286 80% 55% / .8)',
                      }}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <h3
                      style={{
                        margin: '0 0 8px',
                        font: '700 22px Geist',
                        color: 'var(--fg)',
                        letterSpacing: '-.02em',
                      }}
                    >
                      Message sent!
                    </h3>
                    <p
                      style={{
                        margin: '0 auto 22px',
                        maxWidth: '32ch',
                        font: '400 14.5px Geist',
                        lineHeight: 1.55,
                        color: 'var(--muted)',
                      }}
                    >
                      Thanks for reaching out — I&apos;ll get back to you
                      shortly.
                    </p>
                    <button
                      onClick={resetForm}
                      className="ag-hov-lift"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '11px 22px',
                        borderRadius: 12,
                        cursor: 'pointer',
                        font: '600 14px Geist',
                        color: 'var(--fg)',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-strong)',
                      }}
                    >
                      Send another
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid var(--border)',
          padding: '36px clamp(16px,4vw,40px)',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: 'var(--grad)',
                display: 'grid',
                placeItems: 'center',
                font: "700 12px 'Geist Mono',monospace",
                color: '#fff',
              }}
            >
              AG
            </span>
            <div>
              <div style={{ font: '600 14px Geist', color: 'var(--fg)' }}>
                Aditya Gambhir
              </div>
              <div
                style={{
                  font: "500 11.5px 'Geist Mono',monospace",
                  color: 'var(--muted)',
                }}
              >
                Software &amp; AI Engineer
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              flexWrap: 'wrap',
            }}
          >
            {['about', 'projects', 'experience', 'contact'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={onNav}
                style={{
                  font: '500 13px Geist',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  textTransform: 'capitalize',
                }}
              >
                {id}
              </a>
            ))}
            <span
              style={{
                font: "500 12px 'Geist Mono',monospace",
                color: 'var(--muted)',
              }}
            >
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>

      {/* résumé modal */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- dismiss-on-click backdrop; keyboard users close via Esc + the modal's Close button */}
      <div
        data-modal
        data-open={resumeOpen}
        onClick={() => setResumeOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          background: 'rgba(20,12,40,.5)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- stops the backdrop dismiss from firing on inner clicks */}
        <div
          data-modal-card
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 440,
            borderRadius: 20,
            padding: 28,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: 'var(--grad)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M8 13h8M8 17h6" />
                </svg>
              </span>
              <div>
                <h3
                  style={{
                    margin: 0,
                    font: '700 18px Geist',
                    color: 'var(--fg)',
                    letterSpacing: '-.01em',
                  }}
                >
                  {resume.title}
                </h3>
                <p
                  style={{
                    margin: '3px 0 0',
                    font: "500 12px 'Geist Mono',monospace",
                    color: 'var(--muted)',
                  }}
                >
                  PDF · {resume.fileSize} · updated {resume.lastUpdated}
                </p>
              </div>
            </div>
            <button
              onClick={() => setResumeOpen(false)}
              aria-label="Close"
              style={{
                flexShrink: 0,
                width: 34,
                height: 34,
                borderRadius: 10,
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                background: 'var(--bg-soft)',
                border: '1px solid var(--border)',
                color: 'var(--fg-soft)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p
            style={{
              margin: '18px 0 0',
              font: '400 14px Geist',
              lineHeight: 1.6,
              color: 'var(--fg-soft)',
            }}
          >
            {resume.description}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              margin: '18px 0',
            }}
          >
            {resume.highlights.slice(0, 4).map((h) => (
              <div
                key={h}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  font: '400 13px Geist',
                  color: 'var(--fg-soft)',
                }}
              >
                <span style={{ color: 'var(--brand)' }}>▹</span>
                {h}
              </div>
            ))}
          </div>
          <button
            onClick={downloadResume}
            className="ag-hov-btn"
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 9,
              padding: 13,
              borderRadius: 12,
              cursor: 'pointer',
              font: '600 14.5px Geist',
              color: '#fff',
              background: 'var(--grad)',
              backgroundSize: '170% auto',
              border: 'none',
              boxShadow: '0 12px 28px -10px hsl(286 80% 55% / .75)',
            }}
          >
            <DownloadIcon /> Download PDF
          </button>
        </div>
      </div>

      {/* toast */}
      <div
        data-toast
        data-show={!!toast}
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 28,
          transform: 'translateX(-50%)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 18px',
          borderRadius: 12,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          font: '500 13.5px Geist',
          color: 'var(--fg)',
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: 'hsl(150 65% 48%)',
            boxShadow: '0 0 0 3px hsl(150 65% 48% / .2)',
          }}
        />
        {toast}
      </div>
    </div>
  );
}
