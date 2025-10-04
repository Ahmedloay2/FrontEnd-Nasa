#!/bin/bash

# NASA Story Service Startup Script

echo "🚀 Starting NASA Story Service..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "StoryService.js" ]; then
    echo "❌ StoryService.js not found. Please run this script from the services directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f "../../../.env" ]; then
    echo "⚠️  Warning: .env file not found in project root."
    echo "Please create a .env file with your API keys:"
    echo "GROQ_API_KEY=your_groq_api_key_here"
    echo "ELEVENLABS_API_KEY=your_elevenlabs_api_key_here"
fi

# Start the service
echo "🌟 Starting Enhanced Story Service on port 3001..."
echo "📖 Story generation with 6-part structure available"
echo "🎯 Interactive quizzes with feedback system"
echo "🌍 Bilingual support (English/Arabic)"
echo "🖼️  Static image locations included"
echo ""
echo "Press Ctrl+C to stop the service"
echo ""

npm start