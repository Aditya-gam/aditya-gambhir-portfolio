# API Documentation

## 🔗 API Overview

The portfolio website includes a RESTful API for handling contact form submissions. The API is built using Next.js App Router API routes and includes comprehensive validation, security measures, and database integration.

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://aditya-gambhir-portfolio.vercel.app/api`

### Authentication
Currently, no authentication is required for public endpoints. All security is handled through input validation, CAPTCHA verification, and rate limiting.

## 📬 Contact API

### Submit Contact Form

Submit a contact form message with validation and CAPTCHA verification.

#### Endpoint
```
POST /api/contact
```

#### Request Headers
```
Content-Type: application/json
```

#### Request Body

```typescript
interface ContactFormData {
  name: string;           // Required, min 2 characters
  email: string;          // Required, valid email format
  message: string;        // Required, 10-2000 characters
  captchaToken: string;   // Required, Google reCAPTCHA token
}
```

#### Example Request

```bash
curl -X POST https://aditya-gambhir-portfolio.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "message": "Hello, I would like to discuss a potential project opportunity.",
    "captchaToken": "03AGdBq25..."
  }'
```

#### Success Response

**Status**: `200 OK`

```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon."
}
```

#### Error Responses

**Status**: `400 Bad Request`

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "Name is required",
    "Invalid email format",
    "Message must be at least 10 characters long"
  ]
}
```

**Status**: `429 Too Many Requests`

```json
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later."
}
```

**Status**: `500 Internal Server Error`

```json
{
  "success": false,
  "error": "Failed to send message. Please try again later."
}
```

### Validation Rules

#### Name Validation
- **Required**: Yes
- **Type**: String
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Validation**: Trimmed, no HTML allowed

#### Email Validation
- **Required**: Yes
- **Type**: String
- **Format**: Valid email regex pattern
- **Validation**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

#### Message Validation
- **Required**: Yes
- **Type**: String
- **Min Length**: 10 characters
- **Max Length**: 2000 characters
- **Validation**: Trimmed, HTML sanitized

#### CAPTCHA Validation
- **Required**: Yes
- **Type**: String
- **Validation**: Verified against Google reCAPTCHA API
- **Score Threshold**: Standard verification

### Security Features

#### Input Sanitization

All user inputs are sanitized to prevent XSS attacks:

```javascript
function sanitizeHtml(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

#### Rate Limiting

- **Per IP**: 5 requests per 15 minutes
- **Per Email**: 3 requests per hour
- **Implementation**: In-memory rate limiting with Redis fallback

#### CAPTCHA Verification

```javascript
async function verifyRecaptcha(token) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
  });
  
  const result = await response.json();
  return result.success === true;
}
```

## 🗄️ Database Schema

### Contact Messages Collection

**Database**: `portfolio_messages`  
**Collection**: `contacts`

#### Document Structure

```typescript
interface ContactMessage {
  _id: ObjectId;           // MongoDB auto-generated ID
  name: string;            // Sender name (sanitized)
  email: string;           // Sender email (lowercase)
  message: string;         // Message content (sanitized)
  timestamp: Date;         // Message submission time
  ipAddress?: string;      // Sender IP (optional, for analytics)
  status: 'unread' | 'read' | 'archived';  // Message status
  source: 'contact_form';  // Message source identifier
}
```

#### Example Document

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "message": "Hello, I would like to discuss a potential project opportunity.",
  "timestamp": "2024-12-08T10:30:00.000Z",
  "ipAddress": "192.168.1.1",
  "status": "unread",
  "source": "contact_form"
}
```

#### Indexes

```javascript
// Ensure these indexes exist for optimal performance
db.contacts.createIndex({ "email": 1 });
db.contacts.createIndex({ "timestamp": -1 });
db.contacts.createIndex({ "status": 1 });
db.contacts.createIndex({ "ipAddress": 1, "timestamp": 1 });
```

## 📧 Email Integration

### Email Configuration

The API sends email notifications for each contact form submission:

#### SMTP Configuration

```typescript
const transporter = nodemailer.createTransporter({
  service: 'gmail',  // or custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

#### Email Template

**Subject**: `Portfolio Contact: [Sender Name]`

**HTML Template**:
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
    New Contact Form Submission
  </h2>
  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
    <p><strong>Name:</strong> {{name}}</p>
    <p><strong>Email:</strong> <a href="mailto:{{email}}">{{email}}</a></p>
  </div>
  <div style="margin: 20px 0;">
    <h3 style="color: #333;">Message:</h3>
    <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; border-radius: 3px;">
      {{message}}
    </div>
  </div>
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
    <p>This message was sent from your portfolio contact form.</p>
  </div>
</div>
```

## 🔧 Environment Variables

### Required Variables

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_messages

# reCAPTCHA
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Optional: Custom SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your-email@gmail.com
```

### Validation

Environment variables are validated on server startup:

```typescript
function validateEnvironmentVariables() {
  const requiredVars = [
    'MONGODB_URI',
    'RECAPTCHA_SECRET_KEY', 
    'EMAIL_USER',
    'EMAIL_PASS'
  ];
  
  const missingVars = requiredVars.filter(
    varName => !process.env[varName]
  );
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}
```

## 🧪 Testing the API

### Manual Testing

#### 1. Basic Contact Form Test

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "message": "This is a test message to verify the contact form is working properly.",
    "captchaToken": "test_token_for_development"
  }'
```

#### 2. Validation Error Test

```bash
# Test with invalid data
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "email": "invalid-email",
    "message": "Short",
    "captchaToken": ""
  }'
```

#### 3. Rate Limiting Test

```bash
# Send multiple requests quickly
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","message":"Rate limit test","captchaToken":"test"}' &
done
```

### Automated Testing

#### Jest Test Example

```javascript
// __tests__/api/contact.test.js
import { POST } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

describe('/api/contact', () => {
  it('should validate required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        email: 'invalid',
        message: 'short',
        captchaToken: ''
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.details).toContain('Name is required');
  });
});
```

## 📊 Monitoring & Analytics

### API Metrics

Track these metrics for API health:

#### Performance Metrics
- **Response Time**: Average API response time
- **Success Rate**: Percentage of successful requests
- **Error Rate**: Percentage of failed requests
- **Throughput**: Requests per minute/hour

#### Business Metrics
- **Contact Submissions**: Total form submissions
- **Conversion Rate**: Unique visitors to contact submissions
- **Popular Contact Times**: Peak submission hours
- **Geographic Distribution**: Contact origins by location

### Logging

#### Server Logs

```javascript
// Log all API requests
console.log(`[${new Date().toISOString()}] ${method} ${url} - ${status} - ${responseTime}ms`);

// Log errors with context
console.error(`[${new Date().toISOString()}] Contact API Error:`, {
  error: error.message,
  stack: error.stack,
  requestData: sanitizedData,
  userAgent: request.headers.get('user-agent')
});
```

#### MongoDB Logs

Monitor database operations:
- Connection pool usage
- Query performance
- Failed operations
- Storage usage

## 🚨 Error Handling

### Error Types

#### Validation Errors (400)
```javascript
{
  success: false,
  error: "Validation failed",
  details: ["Specific validation messages"]
}
```

#### Authentication Errors (401)
```javascript
{
  success: false,
  error: "reCAPTCHA verification failed"
}
```

#### Rate Limiting (429)
```javascript
{
  success: false,
  error: "Rate limit exceeded. Please try again later.",
  retryAfter: 900 // seconds
}
```

#### Server Errors (500)
```javascript
{
  success: false,
  error: "Internal server error. Please try again later."
}
```

### Error Recovery

#### Automatic Retries
- **Database Operations**: 3 retries with exponential backoff
- **Email Sending**: 2 retries with 5-second delay
- **CAPTCHA Verification**: 1 retry

#### Graceful Degradation
- **Database Offline**: Store messages in fallback queue
- **Email Service Down**: Log messages for manual processing
- **CAPTCHA Service Down**: Log attempts for review

## 🔮 Future Enhancements

### Planned Features

#### Authentication System
- Admin dashboard for message management
- JWT-based authentication
- Role-based access control

#### Enhanced Analytics
- Real-time dashboard
- Contact source tracking
- A/B testing for contact forms

#### Message Management
```
GET /api/admin/contacts      # List all messages
PUT /api/admin/contacts/:id  # Update message status
DELETE /api/admin/contacts/:id # Delete message
```

#### Webhooks
```
POST /api/webhooks/contact   # External service integration
```

#### File Uploads
```
POST /api/upload             # Resume/portfolio uploads
```

This API documentation provides complete coverage of the backend functionality, enabling developers to integrate with and extend the portfolio website's contact system effectively. 