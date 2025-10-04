@echo off
echo 🚀 Starting NASA Story Service...
echo ==================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "StoryService.js" (
    echo ❌ StoryService.js not found. Please run this script from the services directory.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Check if .env file exists
if not exist "..\..\..\env" (
    echo ⚠️  Warning: .env file not found in project root.
    echo Please create a .env file with your API keys:
    echo GROQ_API_KEY=your_groq_api_key_here
    echo ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
    echo.
)

REM Start the service
echo 🌟 Starting Enhanced Story Service on port 3001...
echo 📖 Story generation with 6-part structure available
echo 🎯 Interactive quizzes with feedback system
echo 🌍 Bilingual support (English/Arabic)
echo 🖼️  Static image locations included
echo.
echo Press Ctrl+C to stop the service
echo.

npm start