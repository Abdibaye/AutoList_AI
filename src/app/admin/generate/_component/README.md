# Generate Content API Setup

This component uses Google's Gemini API for AI-powered content generation.

## Setup Instructions

### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Environment Variables

Create a `.env.local` file in your project root and add:

```bash
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# App Configuration (optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. API Features

- **Model**: Gemini 1.5 Flash
- **Temperature**: 0.7 (balanced creativity)
- **Max Output Tokens**: 1000
- **Fallback**: Mock data in development

### 4. Error Handling

- Automatic fallback to mock data in development
- Graceful error handling with user-friendly messages
- Toast notifications for success/error states

### 5. Content Generation

The AI generates content for:
- **Instagram**: Emoji-rich posts with hashtags
- **Facebook**: Community-focused detailed posts
- **Twitter**: Concise posts under 280 characters
- **LinkedIn**: Professional business-focused content

### 6. Tone Options

- **Professional**: Formal, business-like language
- **Hype**: Exciting, energetic with exclamation marks
- **Chill**: Relaxed, casual, friendly language
- **Luxury**: Elegant, sophisticated, premium language

### 7. API Rate Limits

- Gemini 1.5 Flash: 15 requests per minute
- Free tier includes generous usage limits
- Paid tier available for higher usage 