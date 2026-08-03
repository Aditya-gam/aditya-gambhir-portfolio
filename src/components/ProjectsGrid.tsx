'use client';

import { type CSSProperties, type MouseEvent } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { getAllProjects } from '@/data/projects';
import type { ProjectData } from '@/types';

const v = (o: Record<string, string | number>) => o as CSSProperties;

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

function Card({ p }: { p: ProjectData }) {
  const hue = p.hue ?? 280;
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', `${e.clientX - r.left}px`);
    c.style.setProperty('--my', `${e.clientY - r.top}px`);
    c.style.setProperty('--glow', '1');
  };
  const onLeave = (e: MouseEvent<HTMLDivElement>) =>
    e.currentTarget.style.setProperty('--glow', '0');
  return (
    <div
      data-card
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="ag-hov-card"
      style={v({
        '--ph': hue,
        borderRadius: 18,
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
            height: 118,
            borderRadius: '18px 18px 0 0',
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
              top: -28,
              right: -18,
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,.28)',
            }}
          />
          {p.tag && (
            <span
              style={{
                position: 'absolute',
                left: 16,
                bottom: 12,
                font: "500 12px 'Geist Mono',monospace",
                color: 'rgba(255,255,255,.92)',
              }}
            >
              // {p.tag}
            </span>
          )}
          {p.featured && (
            <span
              style={{
                position: 'absolute',
                left: 16,
                top: 14,
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
        <div style={{ padding: 20 }}>
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
                font: '600 17px Geist',
                color: 'var(--fg)',
                letterSpacing: '-.01em',
                lineHeight: 1.25,
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
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--fg-soft)',
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--border)',
                })}
              >
                <GithubMark />
              </a>
            )}
          </div>
          <p
            style={{
              margin: '9px 0 14px',
              font: '400 13.5px Geist',
              lineHeight: 1.5,
              color: 'var(--muted)',
            }}
          >
            {p.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
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

export default function ProjectsGrid() {
  const projects = getAllProjects();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--fg)',
      }}
    >
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
                'radial-gradient(circle,hsl(276 88% 62% / .35),transparent 70%)',
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
              bottom: '-24%',
              right: '4%',
              width: '40vw',
              height: '40vw',
              borderRadius: '50%',
              background:
                'radial-gradient(circle,hsl(322 86% 60% / .28),transparent 70%)',
              filter: 'blur(92px)',
              opacity: 'var(--mesh)',
              animation: 'var(--drift2) 34s ease-in-out infinite',
            } as CSSProperties
          }
        />
      </div>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px clamp(16px,4vw,40px)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            textDecoration: 'none',
            color: 'var(--fg)',
            font: '600 14px Geist',
          }}
        >
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
          <span
            style={{
              font: "500 13px 'Geist Mono',monospace",
              color: 'var(--muted)',
            }}
          >
            ← back home
          </span>
        </Link>
        <button
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
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
      </header>

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1180,
          margin: '0 auto',
          padding: '40px clamp(20px,4vw,40px) 80px',
        }}
      >
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
        <h1
          style={{
            margin: 0,
            font: '700 clamp(32px,5vw,48px) Geist',
            letterSpacing: '-.03em',
            color: 'var(--fg)',
            lineHeight: 1.04,
          }}
        >
          All projects
        </h1>
        <p
          style={{
            margin: '14px 0 40px',
            maxWidth: '52ch',
            font: '400 16px Geist',
            lineHeight: 1.6,
            color: 'var(--fg-soft)',
          }}
        >
          Software, applied-AI and data-science work — from multi-tenant
          platforms and LLM pipelines to geospatial big-data and transformer
          research.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: 18,
          }}
        >
          {projects.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </div>
      </main>
    </div>
  );
}
