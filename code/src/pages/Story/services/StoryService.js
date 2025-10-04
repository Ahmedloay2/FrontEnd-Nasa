/* eslint-disable */
// NOTE: This is a Node.js server file, not a frontend module
// It should be moved to a backend directory or a separate server project
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables from the root directory
require('dotenv').config({ path: path.join(__dirname, '../../../../.env') });

// AI and Audio Libraries
const OpenAI = require('openai');
// Using direct HTTP requests for ElevenLabs instead of their SDK
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Validate required environment variables
const requiredEnvVars = ['GROQ_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.error('Please ensure your .env file contains the following variables:');
  missingEnvVars.forEach(varName => console.error(`  - ${varName}`));
  process.exit(1);
}

console.log('✅ Environment variables loaded successfully');
console.log('🔑 GROQ API Key:', process.env.GROQ_API_KEY ? 'Configured' : 'Missing');
console.log('🔑 ElevenLabs API Key:', process.env.ELEVENLABS_API_KEY ? 'Configured' : 'Missing');

// Load story data from JSON files
const missionSpecialistData = require('../data/stories_mission_specialist.json');
const youngExplorerData = require('../data/stories_young_explorer.json');

// --- AI and Audio Client Setup ---

// Groq (for story text generation)
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// ElevenLabs (for audio narration) - Using direct API calls
let elevenLabsApiKey = null;
if (process.env.ELEVENLABS_API_KEY) {
  elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
  console.log('🔊 ElevenLabs audio service enabled');
} else {
  console.log('ℹ️  ElevenLabs API key not provided - audio features disabled');
}

// --- Static Image Locations for Chapters ---
const STATIC_IMAGES = {
  role_selection: '/images/astronaut-roles.jpg',
  hook: '/images/space-emergency.jpg',
  characteristics: '/images/astronaut-training.jpg',
  life: '/images/iss-daily-life.jpg',
  impact: '/images/earth-from-space.jpg',
  characteristics_revisit: '/images/astronaut-reflection.jpg',
  space_walk: '/images/spacewalk-iss.jpg',
  mission_control: '/images/mission-control-houston.jpg',
  earth_observation: '/images/earth-observation.jpg',
  technology: '/images/space-technology.jpg'
};

// --- Enhanced Story Generation Functions ---

function createAstronautImpactStoryPrompt(userInputs) {
  const { age, language, interests, name } = userInputs;
  
  // Age-based configuration
  const isChild = age < 12;
  const ageGroup = isChild ? "child" : "teen_adult";
  
  // Language configuration
  const isArabic = language.toLowerCase().includes('arabic');
  const targetLanguage = isArabic ? "Egyptian Arabic" : "English";

  const ageConfig = {
    child: {
      tone: "funny, playful, and engaging with silly space sounds",
      complexity: "simple words and short sentences",
      engagement: "interactive questions that make them wonder and imagine",
      feedback: "encouraging and celebratory",
      consequences: "show simple cause-effect in a funny way",
      memory_game: "simple item or character to remember"
    },
    teen_adult: {
      tone: "realistic, dramatic, and thought-provoking",
      complexity: "detailed descriptions and realistic scenarios",
      engagement: "deep thinking questions about real-world impacts",
      feedback: "reflective and informative",
      consequences: "show realistic chain of events from data errors",
      memory_game: "complex technical detail or procedure to remember"
    }
  };

  const languageConfig = {
    arabic: {
      titles: {
        role_selection: "اختر دور رائد الفضاء",
        hook: "بداية المغامرة: رسالة غامضة من الفضاء",
        characteristics: "الصفات السرية لرواد الفضاء",
        life: "يوم في حياة رائد فضاء",
        impact: "ماذا لو اختفوا؟ الكارثة القادمة",
        revisit: "الاختبار النهائي: هل تتذكر؟"
      },
      cultural: "Use Egyptian Arabic with local humor and references"
    },
    english: {
      titles: {
        role_selection: "Choose Your Astronaut Role",
        hook: "Mission Start: Mysterious Space Signal",
        characteristics: "The Secret Traits of Astronauts", 
        life: "A Day in an Astronaut's Life",
        impact: "The Disappearance: World Without Astronauts",
        revisit: "Final Test: Do You Remember?"
      },
      cultural: "Use engaging English with universal references"
    }
  };

  const config = ageConfig[ageGroup];
  const langConfig = isArabic ? languageConfig.arabic : languageConfig.english;

  return `
ROLE: You are an expert storyteller creating an immersive, interactive story about the critical importance of astronauts and the dangers of space data errors.

USER PROFILE:
- Name: ${name}
- Age: ${age} years old (${ageGroup})
- Language: ${targetLanguage}
- Interests: ${interests.join(', ')}

STORY THEME: "The Vital Role of Astronauts and Consequences of Data Errors"

STORY FLOW (6 Interactive Parts):

1. **ASTRONAUT ROLE SELECTION** - ${langConfig.titles.role_selection}
   Present 3 critical astronaut roles that protect Earth:
   - Space Data Analyst (monitors Earth from space for disasters)
   - Communication Specialist (handles vital space-Earth data flow)
   - Navigation Expert (prevents satellite collisions and space junk)

2. **HOOK: THE MYSTERIOUS DATA ERROR** - ${langConfig.titles.hook}
   Start with ${name} receiving strange, conflicting data from space that could mean:
   ${isChild ? 
     '• A giant space pizza is heading to Earth?' : 
     '• An asteroid trajectory calculation shows conflicting paths?'}
   Build suspense about what happens with misleading space information.

3. **CHARACTERISTICS OF ASTRONAUTS** - ${langConfig.titles.characteristics}
   Focus on traits that prevent disasters:
   - Extreme attention to detail
   - Ability to work under pressure  
   - Problem-solving in emergencies
   Include a memory challenge: ${config.memory_game}

4. **LIFE OF ASTRONAUT & DATA RESPONSIBILITY** - ${langConfig.titles.life}
   Show how astronauts' daily work prevents real-world disasters:
   - Monitoring climate change data
   - Tracking natural disasters from space
   - Maintaining satellite communications
   - Preventing space junk collisions

5. **IMPACT: WORLD WITHOUT ASTRONAUTS** - ${langConfig.titles.impact}
   Dramatize what happens when space data goes wrong:
   ${isChild ?
     `• Weather forecasts show "sunny" during hurricanes ☀️🌪️
     • GPS sends cars to the wrong planets 🚗🪐
     • Satellites start playing hide and seek 📡🙈` :
     `• Early warning systems for natural disasters fail
     • Global communications networks collapse
     • Climate change monitoring becomes unreliable
     • Space debris threatens all satellites`}

6. **CHARACTERISTICS REVISITED & RESOLUTION** - ${langConfig.titles.revisit}
   Return to the memory challenge and show how ${name}'s attention to detail saves the mission from the data error.

STORYTELLING CONFIGURATION:
AGE ADAPTATION (${ageGroup.toUpperCase()}):
• Tone: ${config.tone}
• Language: ${config.complexity}
• Engagement: ${config.engagement}
• Consequences: ${config.consequences}

INTERACTIVE ELEMENTS (NO QUIZZES):
• Use thought-provoking questions that make ${name} wonder
• Include "what would you do?" scenarios
• Create suspense about the data error mystery
• Build emotional connection to the astronaut's responsibility

CRITICAL MESSAGES TO CONVEY:
1. Astronauts protect Earth from space-based threats
2. Small data errors can create big disasters
3. Attention to detail saves lives
4. Space technology is essential for modern life
5. Teamwork and precision prevent catastrophes

OUTPUT REQUIREMENTS:
Return ONLY valid JSON in this exact structure:
{
  "story_title": "${isArabic ? 'مهمة' : 'Mission:'} ${name} ${isArabic ? 'وأسرار البيانات الفضائية' : 'and the Space Data Mystery'}",
  "language": "${language}",
  "target_age": ${age},
  "story_cards": [
    {
      "id": "role_selection",
      "card_title": "${langConfig.titles.role_selection}",
      "content": "Engaging introduction to astronaut roles and their Earth-protecting missions...",
      "interactive_element": {
        "type": "role_choice",
        "question": "${isArabic ? 'أي دور تريد أن تلعب لحماية الأرض؟' : 'Which role will you choose to protect Earth?'}",
        "options": [
          "${isArabic ? 'محلل البيانات الفضائية' : 'Space Data Analyst'}",
          "${isArabic ? 'أخصائي الاتصالات' : 'Communication Specialist'}", 
          "${isArabic ? 'خبير الملاحة' : 'Navigation Expert'}"
        ]
      }
    },
    {
      "id": "hook",
      "card_title": "${langConfig.titles.hook}",
      "content": "Suspenseful opening about mysterious data conflict...",
      "interactive_element": {
        "type": "wonder_question",
        "question": "${isArabic ? 'برأيك، ماذا يعني هذا البيانات المتضاربة؟' : 'What do you think this conflicting data means?'}"
      }
    },
    {
      "id": "characteristics", 
      "card_title": "${langConfig.titles.characteristics}",
      "content": "Description of astronaut traits with memory challenge...",
      "memory_item": "${config.memory_game}",
      "interactive_element": {
        "type": "memory_challenge",
        "instruction": "${isArabic ? 'احفظ هذا الشيء جيداً، ستحتاجه لاحقاً!' : 'Remember this carefully, you will need it later!'}"
      }
    },
    {
      "id": "life",
      "card_title": "${langConfig.titles.life}",
      "content": "Daily life showing data responsibility and disaster prevention...",
      "interactive_element": {
        "type": "scenario_question", 
        "question": "${isArabic ? 'كيف ستشعر وأنت مسؤول عن بيانات قد تنقذ ملايين الأشخاص؟' : 'How would you feel being responsible for data that could save millions?'}"
      }
    },
    {
      "id": "impact",
      "card_title": "${langConfig.titles.impact}",
      "content": "Dramatic visualization of world without accurate space data...",
      "interactive_element": {
        "type": "consequence_question",
        "question": "${isArabic ? 'تخيل لو اختفى كل رواد الفضاء فجأة، ماذا سيحدث لعالمنا؟' : 'Imagine if all astronauts disappeared suddenly, what would happen to our world?'}"
      }
    },
    {
      "id": "revisit",
      "card_title": "${langConfig.titles.revisit}", 
      "content": "Resolution using the memory item to fix the data error...",
      "interactive_element": {
        "type": "memory_recall",
        "question": "${isArabic ? 'هل تتذكر الشيء الذي طلبنا منك حفظه؟ كيف يساعدنا الآن؟' : 'Do you remember what we asked you to remember? How does it help us now?'}"
      }
    }
  ]
}

SPECIAL INSTRUCTIONS FOR ${name.toUpperCase()}:
${isChild ?
  `• Make it FUNNY with silly space sounds and wacky aliens
  • Use EXAGGERATED consequences (like pizza rain or dancing satellites)
  • Include CELEBRATIONS when they remember the memory item
  • Keep the mystery SOLVABLE and satisfying` :
  `• Focus on REALISTIC scenarios and actual space missions
  • Include TECHNICAL details about space data systems
  • Create GENUINE suspense about the data error consequences
  • Show REAL-WORLD impact of astronaut work`}

Now, create an immersive story for ${name} about how astronauts protect our world and what happens when space data goes wrong!
  `.trim();
}
// Legacy adventure prompt (keeping for compatibility)
function createAdventurePrompt(userInputs) {
  const { age, language, interests, name } = userInputs;
  
  // Age-based configuration
  const isChild = age < 12;
  const ageGroup = isChild ? "child" : "teen_adult";
  
  // Language configuration
  const isArabic = language.toLowerCase().includes('arabic');
  const targetLanguage = isArabic ? "Egyptian Arabic" : "English";
  
  const ageConfig = {
    child: {
      tone: "very funny, playful, and whimsical",
      complexity: "use simple words and short sentences",
      engagement: "highly interactive with silly sound effects and funny characters",
      feedback: "encouraging, funny feedback with lots of emojis and celebrations",
      educational: "simple space facts wrapped in fun stories",
      length: "shorter segments to maintain attention"
    },
    teen_adult: {
      tone: "realistic, inspiring, and scientifically plausible", 
      complexity: "rich vocabulary and detailed descriptions",
      engagement: "thought-provoking scenarios with meaningful choices",
      feedback: "constructive, informative responses",
      educational: "accurate NASA science and space exploration concepts",
      length: "detailed and immersive narratives"
    }
  };

  const languageConfig = {
    arabic: {
      storytelling: "Use Egyptian Arabic dialect with local cultural references and humor where appropriate",
      format: "Right-to-left friendly content structure",
      cultural: "Include relatable Middle Eastern/North African context when possible"
    },
    english: {
      storytelling: "Use clear, engaging English with universal cultural references",
      format: "Standard left-to-right content structure", 
      cultural: "Diverse, inclusive cultural context"
    }
  };

  const config = ageConfig[ageGroup];
  const langConfig = isArabic ? languageConfig.arabic : languageConfig.english;

  return `
ROLE: You are NOVA, an empathetic NASA-inspired storyteller and interactive learning guide.

USER PROFILE:
- Name: ${name}
- Age: ${age} years old
- Language: ${targetLanguage}
- Interests: ${interests.join(', ')}

STORYTELLING CONFIGURATION:
AGE ADAPTATION (${ageGroup.toUpperCase()}):
• Tone: ${config.tone}
• Language Complexity: ${config.complexity} 
• Engagement: ${config.engagement}
• Feedback Style: ${config.feedback}
• Educational Content: ${config.educational}
• Story Length: ${config.length}

LANGUAGE & CULTURAL ADAPTATION:
• ${langConfig.storytelling}
• ${langConfig.format}
• ${langConfig.cultural}

STORY CREATION GUIDELINES:
1. Create an ORIGINAL space adventure story incorporating ${name}'s interests: ${interests.join(', ')}
2. Weave in age-appropriate educational content about space exploration
3. Include interactive decision points that affect the story outcome
4. Provide ${config.feedback} based on user choices
5. Maintain ${config.tone} throughout the narrative
6. Use ${targetLanguage} with appropriate cultural context

OUTPUT REQUIREMENTS:
• Return ONLY valid JSON format
• Structure: {
  "story_title": "Creative title here",
  "story_cards": [
    {
      "card_id": 1,
      "content": "Story content with interactive elements",
      "question": "Age-appropriate question",
      "choices": ["Option 1", "Option 2", "Option 3"],
      "feedback_rules": {
        "correct": "Positive feedback message",
        "incorrect": "Constructive feedback message" 
      }
    }
  ]
}

SPECIAL INSTRUCTIONS FOR ${name.toUpperCase()}:
${isChild ? 
  `• Use FUNNY character voices and SILLY space sounds
• Include WACKY alien friends and FUN space gadgets
• Add CELEBRATIONS and virtual HIGH-FIVES for correct answers
• Keep everything BRIGHT and EXCITING like a space carnival!` : 
  `• Focus on REAL NASA missions and SCIENTIFIC discoveries
• Include challenging PROBLEM-SOLVING scenarios  
• Provide DEEP educational content about space technology
• Create IMMERSIVE, realistic space exploration experiences`}

Now, generate an amazing ${targetLanguage} space adventure for ${name}, the ${age}-year-old future astronaut!
  `.trim();
}
// Enhanced story data integration functions
function getRelevantStoryData(age, interests) {
  // Use young explorer data for kids, mission specialist for teens/adults
  const baseData = age <= 12 ? youngExplorerData : missionSpecialistData;
  
  // Filter and enhance based on interests
  return baseData.filter(story => {
    const storyText = (story.text || story.read_content || '').toLowerCase();
    return interests.some(interest => 
      storyText.includes(interest.toLowerCase()) ||
      story.title.toLowerCase().includes(interest.toLowerCase())
    );
  });
}

function enhanceStoryWithData(storyContent, relevantData) {
  // Integrate real NASA facts and data into the generated story
  if (relevantData.length > 0) {
    const randomFact = relevantData[Math.floor(Math.random() * relevantData.length)];
    return storyContent + `\n\n📚 Fun Fact: ${randomFact.text || randomFact.read_content}`;
  }
  return storyContent;
}

// --- API Endpoints ---

// Enhanced Story Generation Endpoint
app.post('/api/generate-story', async (req, res) => {
  let text = ''; 
  try {
    const userInputs = req.body;
    console.log("Received request for story type:", userInputs.story_type);

    if (!userInputs.name || !userInputs.age || !userInputs.interests || !userInputs.story_type) {
      return res.status(400).json({ error: "Name, age, interests, and story_type are required." });
    }

    let masterPrompt;
    let relevantData = [];

    // Get relevant story data from JSON files
    relevantData = getRelevantStoryData(userInputs.age, userInputs.interests);

    // Choose the appropriate prompt based on story type
    if (userInputs.story_type === 'astronaut_role') {
      masterPrompt = createAstronautImpactStoryPrompt(userInputs);
    } else {
      masterPrompt = createAdventurePrompt(userInputs);
    }


    console.log("Sending enhanced prompt to Groq...");

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful assistant designed to output JSON. Create engaging, educational space stories for children and teenagers." 
        },
        { role: "user", content: masterPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8, // Add creativity
      max_tokens: 3000  // Allow longer responses
    });

    const jsonResponse = completion.choices[0].message.content;
    text = jsonResponse;

    console.log("AI Raw Response received from Groq. Parsing and enhancing...");
    
    const storyJson = JSON.parse(text);
    
    // Enhance story with static image locations
    if (storyJson.story_cards) {
      storyJson.story_cards.forEach(card => {
        if (card.image_location && STATIC_IMAGES[card.image_location]) {
          card.static_image_url = STATIC_IMAGES[card.image_location];
        }
        
        // Enhance content with real NASA data
        if (card.content) {
          card.content = enhanceStoryWithData(card.content, relevantData);
        }
      });
    }

    // Add metadata
    storyJson.generated_at = new Date().toISOString();
    storyJson.user_profile = {
      name: userInputs.name,
      age: userInputs.age,
      language: userInputs.language,
      interests: userInputs.interests
    };

    res.json(storyJson);

  } catch (error) {
    console.error("Error generating enhanced story:", error);
    res.status(500).json({ 
      error: "Failed to generate story. The AI may be busy. Please try again.",
      details: error.message 
    });
  }
});

// NEW: Interactive Quiz Validation Endpoint
app.post('/api/validate-quiz', async (req, res) => {
  try {
    const { question, selectedAnswer, correctAnswer, wrongExplanations, correctExplanation } = req.body;
    
    console.log('Quiz validation request:', { question, selectedAnswer, correctAnswer });
    
    if (!question || !selectedAnswer || !correctAnswer) {
      return res.status(400).json({ error: "Question, selected answer, and correct answer are required." });
    }

    // Normalize strings for comparison (trim whitespace and normalize case)
    const normalizedSelected = selectedAnswer.toString().trim();
    const normalizedCorrect = correctAnswer.toString().trim();
    
    // Also try to match if the selected answer contains the correct answer
    // This handles cases like "Option A: Text" vs "Option A"
    const isCorrect = normalizedSelected === normalizedCorrect || 
                     normalizedSelected.startsWith(normalizedCorrect + ":") ||
                     normalizedCorrect.startsWith(normalizedSelected + ":");
    
    console.log('Quiz validation result:', { normalizedSelected, normalizedCorrect, isCorrect });
    
    let response = {
      isCorrect: isCorrect,
      selectedAnswer: selectedAnswer,
      correctAnswer: correctAnswer
    };

    if (isCorrect) {
      response.message = correctExplanation || "Correct! Well done! 🎉";
      response.encouragement = "Great job! You're learning about space exploration! 🚀";
    } else {
      response.message = wrongExplanations && wrongExplanations[selectedAnswer] 
        ? wrongExplanations[selectedAnswer] 
        : `That's not quite right. The correct answer is: ${correctAnswer}`;
      response.correctExplanation = correctExplanation || "Here's why this is the right answer...";
      response.encouragement = "Don't worry! Learning is all about trying. Keep going! 💪";
    }

    res.json(response);

  } catch (error) {
    console.error("Error validating quiz:", error);
    res.status(500).json({ error: "Failed to validate quiz answer." });
  }
});

// NEW: Get Story Data Endpoint (for additional context)
app.get('/api/story-data/:type', async (req, res) => {
  try {
    const { type } = req.params;
    let data = [];

    switch (type) {
      case 'mission-specialist':
        data = missionSpecialistData;
        break;
      case 'young-explorer':
        data = youngExplorerData;
        break;
      case 'static-images':
        data = STATIC_IMAGES;
        break;
      default:
        return res.status(400).json({ error: "Invalid data type. Use 'mission-specialist', 'young-explorer', or 'static-images'" });
    }

    res.json({ type, data });

  } catch (error) {
    console.error("Error fetching story data:", error);
    res.status(500).json({ error: "Failed to fetch story data." });
  }
});

// NEW: Audio Generation Endpoint (Enhanced with language support)
app.post('/api/generate-audio', async (req, res) => {
    try {
      const { text, language = 'en' } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required." });
      }

      // Check if ElevenLabs is available
      if (!elevenLabsApiKey) {
        return res.status(503).json({ 
          error: "Audio service is not available. ElevenLabs API key not configured.",
          message: "Audio features are disabled. Please configure ELEVENLABS_API_KEY in your .env file."
        });
      }

      console.log("Received request to generate audio in language:", language);

      // Choose appropriate voice based on language - using pre-made voice IDs
      const voiceId = language === 'ar' || language === 'arabic' 
        ? "pNInz6obpgDQGcFmaJgB" // Adam - works well with multilingual
        : "21m00Tcm4TlvDq8ikWAM"; // Rachel's actual voice ID
      
      console.log(`Generating audio with voice ID: ${voiceId} for language: ${language}`);
      
      const fileName = `story_audio_${Date.now()}.mp3`;
      const audioDir = path.join(process.cwd(), 'public', 'audio');
      
      // Ensure audio directory exists
      if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
      }
      
      const filePath = path.join(audioDir, fileName);

      // Prepare the request data
      const postData = JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      });

      // Make HTTPS request to ElevenLabs API
      const options = {
        hostname: 'api.elevenlabs.io',
        port: 443,
        path: `/v1/text-to-speech/${voiceId}`,
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey,
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const httpsReq = https.request(options, (httpsRes) => {
        if (httpsRes.statusCode !== 200) {
          console.error(`ElevenLabs API Error: ${httpsRes.statusCode}`);
          return res.status(500).json({ 
            error: "Failed to generate audio from ElevenLabs API",
            details: `HTTP ${httpsRes.statusCode}` 
          });
        }

        // Write the audio stream directly to file
        const fileStream = fs.createWriteStream(filePath);
        httpsRes.pipe(fileStream);

        fileStream.on('finish', () => {
          console.log("Audio file saved:", fileName);
          res.json({ 
            audioUrl: `http://localhost:${PORT}/audio/${fileName}`,
            language: language,
            voice: voiceId 
          });
        });

        fileStream.on('error', (err) => {
          console.error("Error writing audio file:", err);
          res.status(500).json({ error: "Failed to save audio file." });
        });
      });

      httpsReq.on('error', (error) => {
        console.error("HTTPS request error:", error);
        res.status(500).json({ 
          error: "Failed to connect to ElevenLabs API",
          details: error.message 
        });
      });

      // Send the request data
      httpsReq.write(postData);
      httpsReq.end();

    } catch (error) {
      console.error("Error generating audio:", error);
      res.status(500).json({ 
        error: "Failed to generate audio.",
        details: error.message 
      });
    }
});

// --- Start the Enhanced Server ---
app.listen(PORT, () => {
    console.log(`🚀 Enhanced Multi-Story Server (Groq & ElevenLabs Edition) is running at http://localhost:${PORT}`);
    console.log(`📖 Story generation with 6-part structure available`);
    console.log(`🎯 Interactive quizzes with feedback system`);
    console.log(`🌍 Bilingual support (English/Arabic)`);
    console.log(`🖼️  Static image locations included`);
    console.log(`🔗 API Endpoints:`);
    console.log(`   POST /api/generate-story - Generate enhanced stories`);
    console.log(`   POST /api/validate-quiz - Validate quiz answers`);
    console.log(`   POST /api/generate-audio - Generate audio narration`);
    console.log(`   GET  /api/story-data/:type - Get story data`);
});

module.exports = app;