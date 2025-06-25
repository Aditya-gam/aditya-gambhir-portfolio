# reCAPTCHA Troubleshooting Guide

## Issue: reCAPTCHA Blocked with "This content is blocked. Contact the site owner to fix the issue."

### Root Cause
The issue was caused by overly restrictive Content Security Policy (CSP) headers that prevented Google reCAPTCHA from loading properly.

### Fixes Applied

#### 1. Updated CSP Headers in `next.config.ts`
Added the following domains to allow reCAPTCHA to function:

```typescript
// NEW CSP Configuration
"script-src 'self' 'unsafe-inline' 'unsafe-eval' ... https://www.recaptcha.net https://recaptcha.google.com https://www.googletagmanager.com"
"connect-src 'self' ... https://www.recaptcha.net https://recaptcha.google.com https://www.googletagmanager.com"
"frame-src 'self' https://www.google.com https://www.gstatic.com https://www.recaptcha.net https://recaptcha.google.com"
"child-src 'self' https://www.google.com https://www.recaptcha.net https://recaptcha.google.com"
"img-src 'self' data: ... https://www.recaptcha.net"
```

#### 2. Fixed X-Frame-Options Header
Changed from `DENY` to `SAMEORIGIN` to allow reCAPTCHA iframes:

```typescript
// OLD (caused reCAPTCHA blocking)
"X-Frame-Options": "DENY"

// NEW (allows reCAPTCHA iframes)
"X-Frame-Options": "SAMEORIGIN"
```

#### 3. Enhanced Error Handling
Added better debugging in `CaptchaField.tsx` component.

### Testing Steps

1. **Restart Development Server**
   ```bash
   npm run dev
   ```

2. **Clear Browser Cache**
   - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - Or open in incognito/private mode

3. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for any CSP errors in console
   - Check for reCAPTCHA debug info in development mode

4. **Verify Environment Variables**
   Ensure these are set in your `.env.local`:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   ```

5. **Test Form Submission**
   - Navigate to contact form
   - Fill out form fields
   - Complete reCAPTCHA challenge
   - Submit form

### Additional Verification

#### Check reCAPTCHA Domain Configuration
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Select your site
3. Verify domains include:
   - `localhost` (for development)
   - Your production domain
   - `127.0.0.1` (optional for local testing)

#### CSP Testing
You can test CSP compliance using browser developer tools:
1. Open Network tab
2. Look for blocked resources
3. Check Security tab for CSP violations

### Common Issues and Solutions

#### Issue: "Invalid site key"
- **Solution**: Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` matches your Google reCAPTCHA site key

#### Issue: "Domain not allowed"
- **Solution**: Add your domain to the allowed domains list in Google reCAPTCHA console

#### Issue: Still blocked after changes
- **Solution**: 
  1. Clear browser cache completely
  2. Try incognito/private browsing mode
  3. Check for browser extensions blocking content

#### Issue: Works in development but not production
- **Solution**: Ensure production environment variables are set correctly in your deployment platform

### Deployment Notes

When deploying to production:

1. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_production_site_key
   RECAPTCHA_SECRET_KEY=your_production_secret_key
   ```

2. **Verify Production Domain**
   Add your production domain to Google reCAPTCHA allowed domains

3. **Test Production Build Locally**
   ```bash
   npm run build
   npm start
   ```

### Security Considerations

The CSP has been configured to allow necessary reCAPTCHA functionality while maintaining security:

- Only allows specific Google domains
- Maintains `SAMEORIGIN` frame policy (more secure than removing entirely)
- Preserves other security headers

### Rollback Plan

If issues persist, you can temporarily disable CSP by commenting out the headers section in `next.config.ts`:

```typescript
// Temporarily disable CSP for testing
// async headers() {
//   return [];
// },
```

**Warning**: Only disable CSP temporarily for testing. Always re-enable for production. 