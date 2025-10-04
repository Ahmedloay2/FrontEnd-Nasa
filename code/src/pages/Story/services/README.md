# 🚀 NASA Story Service Setup

## Prerequisites

- Node.js 16+ installed
- GROQ API key (for AI story generation)
- ElevenLabs API key (optional, for audio narration)

## Quick Start

### 1. Install Dependencies
```bash
cd src/pages/Story/services
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root (`code/.env`) with your API keys:

```env
GROQ_API_KEY=your_groq_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
PORT=3001
```

### 3. Start the Service

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Manual:**
```bash
npm start
```

## API Endpoints

Once running on `http://localhost:3001`:

- `POST /api/generate-story` - Generate interactive stories
- `POST /api/validate-quiz` - Validate quiz answers
- `POST /api/generate-audio` - Generate audio narration
- `GET /api/story-data/:type` - Get story data

## Testing the Service

1. Start the service (port 3001)
2. Start the frontend (port 5173)
3. Navigate to `/story` in your browser
4. Fill out the form and generate a story

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | API key for Groq AI story generation |
| `ELEVENLABS_API_KEY` | No | API key for audio narration |
| `PORT` | No | Server port (default: 3001) |

## Troubleshooting

### Common Issues

1. **"Missing GROQ_API_KEY"**
   - Ensure `.env` file exists in project root
   - Verify API key is correct and active

2. **"Cannot find module 'openai'"**
   - Run `npm install` in the services directory

3. **"Port 3001 already in use"**
   - Change PORT in `.env` file
   - Update frontend API calls to match new port

4. **CORS errors from frontend**
   - Ensure both frontend and backend are running
   - Check that frontend is calling correct backend URL

### Development Mode

For development with auto-restart:
```bash
npm run dev
```

## Dependencies

- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable loading
- `openai` - Groq API client (OpenAI compatible)
- `elevenlabs` - Audio generation service

## API Key Setup

### GROQ API Key
1. Visit [console.groq.com](https://console.groq.com)
2. Create account and get API key
3. Add to `.env` file

### ElevenLabs API Key (Optional)
1. Visit [elevenlabs.io](https://elevenlabs.io)
2. Create account and get API key
3. Add to `.env` file

Without ElevenLabs, audio features will be disabled but stories will still work.