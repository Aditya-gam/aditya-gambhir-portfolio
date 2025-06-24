/**
 * ProfileBadge Component
 *
 * A reusable component for displaying profile badges from various platforms.
 * Currently supports LinkedIn with full functionality, GitHub and LeetCode with placeholder implementations.
 *
 * @example
 * ```tsx
 * // LinkedIn Badge
 * <ProfileBadge
 *   platform="linkedin"
 *   username="aditya-gambhir"
 *   size="medium"
 *   theme="light"
 *   type="horizontal"
 * />
 *
 * // GitHub Badge (placeholder)
 * <ProfileBadge
 *   platform="github"
 *   username="aditya-gambhir"
 * />
 *
 * // LeetCode Badge (placeholder)
 * <ProfileBadge
 *   platform="leetcode"
 *   username="aditya-gambhir"
 * />
 * ```
 */

'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Github, Code } from 'lucide-react';

// Supported profile platforms
export type ProfilePlatform = 'linkedin' | 'github' | 'leetcode';

interface ProfileBadgeProps {
  readonly platform: ProfilePlatform;
  readonly username: string;
  readonly size?: 'small' | 'medium' | 'large';
  readonly theme?: 'light' | 'dark';
  readonly type?: 'horizontal' | 'vertical';
  readonly className?: string;
  readonly enableRetry?: boolean;
  readonly maxRetries?: number;
}

// LinkedIn-specific badge props
interface LinkedInBadgeData {
  'data-locale': string;
  'data-size': string;
  'data-theme': string;
  'data-type': string;
  'data-vanity': string;
  'data-version': string;
}

export default function ProfileBadge({
  platform,
  username,
  size = 'medium',
  theme = 'light',
  type = 'horizontal',
  className = '',
  enableRetry = true,
  maxRetries = 10,
}: ProfileBadgeProps) {
  const [isClient, setIsClient] = useState(false);

  // Track when component has mounted (hydrated)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // LinkedIn-specific implementation (extracted from page.tsx)
  useEffect(() => {
    if (!isClient || platform !== 'linkedin' || !enableRetry) return;

    console.log('🚀 Starting LinkedIn badge initialization...');

    // Helper functions moved inside useEffect to avoid dependency issues
    const checkLinkedInScript = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const linkedInAPI = (window as any).IN;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const linkedInRenderAll = (window as any).LIRenderAll;

      console.log('🔍 LinkedIn API check:', {
        hasIN: !!linkedInAPI,
        hasParse: !!linkedInAPI?.parse,
        hasLIRenderAll: !!linkedInRenderAll,
        scriptElement: !!document.querySelector('script[src*="linkedin.com"]'),
      });
      return { linkedInAPI, linkedInRenderAll };
    };

    const forceLinkedInBadgeRefresh = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const linkedInRenderAll = (window as any).LIRenderAll;

      if (!linkedInRenderAll) {
        console.log('❌ LIRenderAll not available');
        return false;
      }

      try {
        linkedInRenderAll();
        console.log('✅ LinkedIn badge refresh triggered via LIRenderAll');
        return true;
      } catch (error) {
        console.log('❌ LinkedIn badge refresh failed:', error);
        return false;
      }
    };

    const handleScriptLoad = () => {
      console.log('✅ LinkedIn script loaded manually');
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).LIRenderAll) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).LIRenderAll();
            console.log('✅ LinkedIn badge triggered after manual load');
          } catch (error) {
            console.log('❌ LinkedIn badge failed after manual load:', error);
          }
        }
      }, 100);
    };

    const loadLinkedInScriptManually = () => {
      const existingScript = document.querySelector(
        'script[src*="linkedin.com"]',
      );
      if (existingScript) {
        console.log('📄 LinkedIn script element exists');
        return;
      }

      console.log('📄 Loading LinkedIn script manually...');
      const script = document.createElement('script');
      script.src = 'https://platform.linkedin.com/badges/js/profile.js';
      script.async = true;
      script.onload = handleScriptLoad;
      script.onerror = () =>
        console.log('❌ LinkedIn script failed to load manually');
      document.head.appendChild(script);
    };

    let attempts = 0;
    const attemptInitialization = () => {
      console.log(`🔄 LinkedIn badge attempt ${attempts + 1}/${maxRetries}`);
      checkLinkedInScript();

      if (forceLinkedInBadgeRefresh()) {
        console.log('✅ LinkedIn badge initialization successful');
        return;
      }

      attempts++;
      if (attempts === 3) {
        loadLinkedInScriptManually();
      }

      if (attempts < maxRetries) {
        const delay = Math.min(200 * Math.pow(1.5, attempts - 1), 2000);
        console.log(`⏳ Retrying LinkedIn badge in ${delay}ms...`);
        setTimeout(attemptInitialization, delay);
      } else {
        console.log(
          '❌ LinkedIn badge initialization failed after all attempts',
        );
      }
    };

    attemptInitialization();
    const backupTimer = setTimeout(attemptInitialization, 500);

    return () => clearTimeout(backupTimer);
  }, [isClient, platform, maxRetries, enableRetry]);

  const handleLinkedInScriptLoad = () => {
    if (!isClient || platform !== 'linkedin') return;

    console.log('📡 LinkedIn script loaded via Next.js Script component');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).LIRenderAll) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).LIRenderAll();
        console.log('✅ LinkedIn badge triggered on script load');
      } catch (error) {
        console.log('❌ LinkedIn badge failed on script load:', error);
      }
    } else {
      console.log('⚠️ LinkedIn LIRenderAll not available on script load');
    }
  };

  // Platform-specific badge data attributes
  const getBadgeDataAttributes = (): LinkedInBadgeData => {
    if (platform === 'linkedin') {
      return {
        'data-locale': 'en_US',
        'data-size': size,
        'data-theme': theme,
        'data-type': type,
        'data-vanity': username,
        'data-version': 'v1',
      };
    }
    return {} as LinkedInBadgeData;
  };

  // Platform-specific profile URLs
  const getProfileUrl = () => {
    switch (platform) {
      case 'linkedin':
        return `https://www.linkedin.com/in/${username}?trk=profile-badge`;
      case 'github':
        return `https://github.com/${username}`;
      case 'leetcode':
        return `https://leetcode.com/${username}`;
      default:
        return '#';
    }
  };

  // Generate aria-label for accessibility
  const getAriaLabel = () => {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
    return `View ${username}'s ${platformName} profile`;
  };

  const badgeDataAttributes = getBadgeDataAttributes();

  return (
    <div className={`profile-badge-container ${className}`}>
      {/* LinkedIn Badge Implementation */}
      {platform === 'linkedin' && (
        <>
          <Script
            src="https://platform.linkedin.com/badges/js/profile.js"
            strategy="afterInteractive"
            onLoad={handleLinkedInScriptLoad}
          />
          <div
            className="badge-base LI-profile-badge mt-4"
            {...badgeDataAttributes}
          >
            <a
              className="badge-base__link LI-simple-link"
              href={getProfileUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={getAriaLabel()}
            >
              {username}
            </a>
          </div>
        </>
      )}

      {/* Placeholder for future platforms */}
      {platform === 'github' && (
        <div className="github-badge-placeholder mt-4">
          <a
            href={getProfileUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getAriaLabel()}
            className="inline-flex items-center px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub Profile
          </a>
        </div>
      )}

      {platform === 'leetcode' && (
        <div className="leetcode-badge-placeholder mt-4">
          <a
            href={getProfileUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getAriaLabel()}
            className="inline-flex items-center px-4 py-2 border border-primary/50 text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            <Code className="w-4 h-4 mr-2" />
            LeetCode Profile
          </a>
        </div>
      )}
    </div>
  );
}
