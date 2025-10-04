# 🚀 NASA Story System - Complete Setup Guide

## 🎯 Quick Start (2-Step Process)

### Step 1: Start the Story Service (Backend)
```bash
# Navigate to services directory
cd src/pages/Story/services

# Install dependencies (first time only)
npm install

# Start the story service
npm start
```
**OR** use the convenience scripts:
- Windows: Double-click `start.bat`
- Linux/Mac: Run `./start.sh`

### Step 2: Start the Frontend
```bash
# In a new terminal, go to project root
cd code

# Start the frontend development server
npm run dev
```

## 🌐 Access the Application

1. **Frontend**: http://localhost:5173
2. **Story Service API**: http://localhost:3001
3. **Story Form**: http://localhost:5173/story

## 🔧 Configuration

### Required: GROQ API Key
```env
# In code/.env
GROQ_API_KEY=your_groq_api_key_here
```

### Optional: ElevenLabs API Key (for audio)
```env
# In code/.env
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

## ✨ Features Available

### 📖 Story Generation
- **6-part interactive structure**
- **Personalized content** based on name, age, interests
- **Bilingual support** (English/Arabic)
- **Real NASA facts** integration

### 🧠 Interactive Elements
- **Smart quizzes** with explanations
- **Memory games** with callbacks
- **Progress tracking**
- **Role selection** activities

### 🔊 Audio Features (Optional)
- **Text-to-speech** narration
- **Language-specific voices**
- **Play/pause controls**

## 🔍 Testing the System

1. **Navigate to story section**: http://localhost:5173/story
2. **Fill out the form**:
   - Enter your name (e.g., "Ahmed")
   - Set your age (e.g., 12)
   - Select interests (e.g., "Space exploration", "Technology")
   - Choose language (English/Arabic)
3. **Generate story**: Click "Generate My Space Story"
4. **Interact with story**:
   - Read each chapter
   - Answer quizzes
   - Remember memory items
   - Use audio features (if available)
   - Navigate through all 6 parts

## 🛠️ Troubleshooting

### Backend Issues
- **Port 3001 in use**: Change PORT in .env
- **Missing dependencies**: Run `npm install` in services directory
- **API key errors**: Check .env file has GROQ_API_KEY

### Frontend Issues
- **CORS errors**: Ensure backend is running on port 3001
- **Build errors**: Run `npm install` in code directory
- **Route not found**: Ensure you're accessing /story path

### Audio Issues
- **Audio disabled**: ElevenLabs API key not configured (audio is optional)
- **Audio fails**: Check internet connection and API key validity

## 📁 Project Structure
```
code/
├── .env                          # Environment variables
├── src/
│   └── pages/Story/
│       ├── Story.jsx            # Main story component
│       ├── components/
│       │   ├── StoryForm.jsx    # User input form
│       │   └── StoryDisplay.jsx # Story presentation
│       └── services/
│           ├── StoryService.js  # Backend API service
│           ├── package.json     # Service dependencies
│           ├── start.bat        # Windows startup script
│           └── start.sh         # Linux/Mac startup script
```

## 🎉 Success Indicators

When everything is working:
- ✅ Backend shows: "Enhanced Multi-Story Server running at http://localhost:3001"
- ✅ Frontend shows: Story form with space-themed design
- ✅ Story generation creates 6-part interactive adventures
- ✅ Quizzes provide educational feedback
- ✅ Progress tracking works smoothly
- ✅ Audio features work (if configured)

## 🆘 Need Help?

1. Check both services are running (ports 3001 and 5173)
2. Verify .env file has correct API keys
3. Check browser console for errors
4. Ensure all dependencies are installed

The system is designed to work even without audio - GROQ API key is the only requirement!