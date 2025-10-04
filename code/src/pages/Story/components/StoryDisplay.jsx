import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StoryDisplay.css';

const StoryDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState('');
  const [selectedSecondaryQuizAnswer, setSelectedSecondaryQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState(null);
  const [secondaryQuizResult, setSecondaryQuizResult] = useState(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (location.state?.storyData) {
      setStoryData(location.state.storyData);
    } else {
      navigate('/story/form');
    }
  }, [location, navigate]);

  const validateQuizAnswer = async (question, selectedAnswer, correctAnswer, wrongExplanations, correctExplanation, isSecondary = false) => {
    try {
      const response = await fetch('http://localhost:3001/api/validate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          selectedAnswer,
          correctAnswer,
          wrongExplanations,
          correctExplanation
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (isSecondary) {
          setSecondaryQuizResult(result);
        } else {
          setQuizResult(result);
        }
      }
    } catch (error) {
      console.error('Error validating quiz:', error);
    }
  };

  const generateAudio = async (text, language) => {
    setIsLoadingAudio(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          language: language || 'en'
        }),
      });

      if (response.ok) {
        const audioData = await response.json();
        const audio = new Audio(audioData.audioUrl);
        setCurrentAudio(audio);
        audio.play();
        setIsPlaying(true);
        
        audio.onended = () => setIsPlaying(false);
      } else {
        const errorData = await response.json();
        if (response.status === 503) {
          // Audio service not available
          alert('Audio feature is not available. The service is running without audio support.');
        } else {
          console.error('Audio generation failed:', errorData);
          alert('Failed to generate audio. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      alert('Failed to connect to audio service. Audio features may be unavailable.');
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const handleQuizSubmit = (card, isSecondary = false) => {
    const selectedAnswer = isSecondary ? selectedSecondaryQuizAnswer : selectedQuizAnswer;
    if (!selectedAnswer) return;
    
    const quiz = isSecondary ? card.secondary_quiz : card.interactive_quiz;
    if (!quiz) return;
    
    validateQuizAnswer(
      quiz.question,
      selectedAnswer,
      quiz.correct_answer,
      quiz.wrong_explanations,
      quiz.correct_explanation,
      isSecondary
    );
  };

  const nextCard = () => {
    if (currentCardIndex < storyData.story_cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setSelectedQuizAnswer('');
      setSelectedSecondaryQuizAnswer('');
      setQuizResult(null);
      setSecondaryQuizResult(null);
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setSelectedQuizAnswer('');
      setSelectedSecondaryQuizAnswer('');
      setQuizResult(null);
      setSecondaryQuizResult(null);
    }
  };

  const toggleAudio = () => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(false);
      } else {
        currentAudio.play();
        setIsPlaying(true);
      }
    }
  };

  if (!storyData) {
    return (
      <div className="story-loading">
        <div className="loading-spinner"></div>
        <p>Loading your space adventure...</p>
      </div>
    );
  }

  const currentCard = storyData.story_cards[currentCardIndex];
  const isArabic = storyData.language === 'ar' || storyData.language === 'arabic';

  return (
    <div className={`story-display-container ${isArabic ? 'rtl' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="story-header">
        <h1>{storyData.story_title}</h1>
        <div className="story-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentCardIndex + 1) / storyData.story_cards.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {currentCardIndex + 1} / {storyData.story_cards.length}
          </span>
        </div>
      </div>

      <div className="story-card">
        {/* Card Header */}
        <div className="card-header">
          <h2>{currentCard.card_title}</h2>
          <div className="card-controls">
            <button 
              className="audio-button"
              onClick={() => generateAudio(currentCard.content, storyData.language)}
              disabled={isLoadingAudio}
            >
              {isLoadingAudio ? '🔄' : '🔊'}
            </button>
            {currentAudio && (
              <button 
                className="play-pause-button"
                onClick={toggleAudio}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
            )}
          </div>
        </div>

        {/* Story Image */}
        {currentCard.static_image_url && (
          <div className="story-image">
            <img src={currentCard.static_image_url} alt={currentCard.card_title} />
          </div>
        )}

        {/* Story Content */}
        <div className="story-content">
          <p>{currentCard.content}</p>
          
          {/* Memory Item Display */}
          {currentCard.memory_item && (
            <div className="memory-item">
              <span className="memory-icon">🎁</span>
              <p><strong>Remember this:</strong> {currentCard.memory_item}</p>
            </div>
          )}
          
          {/* Memory Callback */}
          {currentCard.memory_callback && (
            <div className="memory-callback">
              <span className="memory-icon">🤔</span>
              <p><strong>Do you remember?</strong> {currentCard.memory_callback}</p>
            </div>
          )}

          {/* Interactive Element */}
          {currentCard.interactive_element && (
            <div className="interactive-element">
              {currentCard.interactive_element.type === 'role_choice' && (
                <div className="role-choice">
                  <p className="interactive-question"><em>{currentCard.interactive_element.question}</em></p>
                  <div className="choice-options">
                    {currentCard.interactive_element.options?.map((option, index) => (
                      <button key={index} className="choice-option">
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {currentCard.interactive_element.type === 'wonder_question' && (
                <div className="wonder-question">
                  <p className="interactive-question"><em>{currentCard.interactive_element.question}</em></p>
                </div>
              )}
              
              {currentCard.interactive_element.type === 'memory_challenge' && (
                <div className="memory-challenge">
                  <p className="interactive-instruction"><em>{currentCard.interactive_element.instruction}</em></p>
                </div>
              )}
              
              {currentCard.interactive_element.type === 'scenario_question' && (
                <div className="scenario-question">
                  <p className="interactive-question"><em>{currentCard.interactive_element.question}</em></p>
                </div>
              )}
              
              {currentCard.interactive_element.type === 'consequence_question' && (
                <div className="consequence-question">
                  <p className="interactive-question"><em>{currentCard.interactive_element.question}</em></p>
                </div>
              )}
              
              {currentCard.interactive_element.type === 'memory_recall' && (
                <div className="memory-recall">
                  <p className="interactive-question"><em>{currentCard.interactive_element.question}</em></p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quiz Section */}
        {currentCard.interactive_quiz && (
          <div className="quiz-section">
            <h3>🧠 Quiz Time!</h3>
            <p className="quiz-question">{currentCard.interactive_quiz.question}</p>
            
            <div className="quiz-options">
              {currentCard.interactive_quiz.options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${selectedQuizAnswer === option ? 'selected' : ''}`}
                  onClick={() => setSelectedQuizAnswer(option)}
                  disabled={!!quizResult}
                >
                  {option}
                </button>
              ))}
            </div>

            {!quizResult && selectedQuizAnswer && (
              <button 
                className="submit-quiz-button"
                onClick={() => handleQuizSubmit(currentCard)}
              >
                Submit Answer
              </button>
            )}

            {/* Quiz Result */}
            {quizResult && (
              <div className={`quiz-result ${quizResult.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-icon">
                  {quizResult.isCorrect ? '✅' : ''}
                </div>
                <div className="result-content">
                  <p className="result-message">{quizResult.message}</p>
                  {quizResult.correctExplanation && !quizResult.isCorrect && (
                    <p className="correct-explanation">{quizResult.correctExplanation}</p>
                  )}
                  <p className="encouragement">{quizResult.encouragement}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Secondary Quiz Section */}
        {currentCard.secondary_quiz && (
          <div className="quiz-section secondary-quiz">
            <h3>🌟 Bonus Quiz!</h3>
            <p className="quiz-question">{currentCard.secondary_quiz.question}</p>
            
            <div className="quiz-options">
              {currentCard.secondary_quiz.options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${selectedSecondaryQuizAnswer === option ? 'selected' : ''}`}
                  onClick={() => setSelectedSecondaryQuizAnswer(option)}
                  disabled={!!secondaryQuizResult}
                >
                  {option}
                </button>
              ))}
            </div>

            {!secondaryQuizResult && selectedSecondaryQuizAnswer && (
              <button 
                className="submit-quiz-button"
                onClick={() => handleQuizSubmit(currentCard, true)}
              >
                Submit Bonus Answer
              </button>
            )}

            {/* Secondary Quiz Result */}
            {secondaryQuizResult && (
              <div className={`quiz-result ${secondaryQuizResult.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="result-icon">
                  {secondaryQuizResult.isCorrect ? '✅' : ''}
                </div>
                <div className="result-content">
                  <p className="result-message">{secondaryQuizResult.message}</p>
                  {secondaryQuizResult.correctExplanation && !secondaryQuizResult.isCorrect && (
                    <p className="correct-explanation">{secondaryQuizResult.correctExplanation}</p>
                  )}
                  <p className="encouragement">{secondaryQuizResult.encouragement}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="story-navigation">
          <button 
            className="nav-button prev"
            onClick={previousCard}
            disabled={currentCardIndex === 0}
          >
            ← Previous
          </button>
          
          {currentCardIndex === storyData.story_cards.length - 1 ? (
            <button 
              className="nav-button finish"
              onClick={() => navigate('/story/form')}
            >
              🎉 Create Another Story
            </button>
          ) : (
            <button 
              className="nav-button next"
              onClick={nextCard}
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Story Metadata */}
      <div className="story-metadata">
        <p>Generated for: <strong>{storyData.user_profile?.name}</strong></p>
        <p>Age: <strong>{storyData.user_profile?.age}</strong></p>
        <p>Interests: <strong>{storyData.user_profile?.interests?.join(', ')}</strong></p>
      </div>
    </div>
  );
};

export default StoryDisplay;