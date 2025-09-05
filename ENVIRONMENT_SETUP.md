# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Spotify Configuration
PUBLIC_SPOTIFY_CLIENT_ID=1536003d1c914fe6b08990204b2c2cad

# Formspree Configuration
PUBLIC_FORMSPREE_FORM=your_formspree_endpoint

# Firebase Configuration (if needed)
FIREBASE_API_KEY=your_firebase_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

## Vercel Deployment

In your Vercel dashboard, add these environment variables:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable with its value
4. Make sure to mark them as "Public" if they start with `PUBLIC_`

## Benefits

- ✅ **Security** - Client ID not hardcoded in source
- ✅ **Flexibility** - Easy to change without code changes
- ✅ **Environment-specific** - Different values for dev/prod
- ✅ **Fallback** - Code has default value if env var not set
