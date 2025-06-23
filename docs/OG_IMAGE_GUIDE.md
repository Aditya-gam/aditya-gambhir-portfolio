# OG Image Creation Guide

## Required Specifications

- **Dimensions**: 1200×630 pixels
- **Format**: PNG
- **File name**: `og-default.png`
- **Location**: `/public/og-default.png`

## Design Recommendations

### Content to Include:

1. **Name**: "Aditya Gambhir" (prominent, readable font)
2. **Title**: "Software Engineer & Data Scientist"
3. **Background**: Professional, clean design
4. **Color scheme**: Consistent with site theme (#0A66C2 blue)
5. **Optional**: Simple geometric shapes or subtle patterns

### Tools You Can Use:

#### Option 1: Figma (Recommended)

1. Create new design with 1200×630 dimensions
2. Add text layers with your name and title
3. Use consistent fonts (similar to Geist family if available)
4. Export as PNG

#### Option 2: Canva

1. Search for "Facebook Cover" template (similar dimensions)
2. Customize with your information
3. Download as PNG
4. Resize to 1200×630 if needed

#### Option 3: @vercel/og (Programmatic)

```bash
npm install @vercel/og
```

Create `scripts/generate-og.js`:

```javascript
import { ImageResponse } from '@vercel/og';
import { writeFileSync } from 'fs';

const og = new ImageResponse(
  (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
      }}
    >
      <div>Aditya Gambhir</div>
      <div style={{ fontSize: 30, marginTop: 20 }}>
        Software Engineer & Data Scientist
      </div>
    </div>
  ),
  {
    width: 1200,
    height: 630,
  },
);

// Convert to buffer and save
const buffer = await og.arrayBuffer();
writeFileSync('public/og-default.png', Buffer.from(buffer));
```

## Current Status

❌ **Missing**: The OG image file is currently referenced but doesn't exist
📍 **Action needed**: Create and place the image at `/public/og-default.png`

## Validation

After creating the image, test with:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
