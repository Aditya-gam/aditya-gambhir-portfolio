import PortfolioClient from '@/components/PortfolioClient';

export default function HomePage() {
  // The contact form needs the email service. Until RESEND_API_KEY is set, the
  // contact section shows direct email/résumé CTAs instead of a form that would
  // fail on submit. Read at build time, so setting the key needs a redeploy.
  const contactFormEnabled = Boolean(process.env.RESEND_API_KEY);
  return <PortfolioClient contactFormEnabled={contactFormEnabled} />;
}
