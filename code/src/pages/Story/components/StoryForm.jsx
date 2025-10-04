import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StoryForm.css';

const StoryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    language: 'en',
    interests: [],
    story_type: 'astronaut_role'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [availableInterests] = useState([
    'Space exploration', 'Neutral Buoyancy Training', 'Spacewalks', 'ISS Technology Systems',
    'Observing the Cosmos', 'Earth Observation from Cupola', 'Astronomy', 'Discovery', 'Earth science'
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || formData.interests.length === 0) {
      alert('Please fill in all required fields and select at least one interest!');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      const storyData = await response.json();
      
      // Navigate to story display page with the generated story
      navigate('/story/display', { 
        state: { 
          storyData,
          userProfile: formData 
        } 
      });
      
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="story-form-container">
      <div className="story-form-wrapper">
        <div className="form-header">
          <h1>🚀 Create Your Space Adventure</h1>
          <p>Tell us about yourself to generate an amazing personalized astronaut story!</p>
        </div>

        <form onSubmit={handleSubmit} className="story-form">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">
              <span className="label-icon">👨‍🚀</span>
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name..."
              required
            />
          </div>

          {/* Age Input */}
          <div className="form-group">
            <label htmlFor="age">
              <span className="label-icon">🎂</span>
              How old are you?
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter your age..."
              min="5"
              max="99"
              required
            />
          </div>

          {/* Language Selection */}
          <div className="form-group">
            <label htmlFor="language">
              <span className="label-icon">🌍</span>
              Preferred Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
            >
              <option value="en">English</option>
              <option value="ar">Arabic (العربية)</option>
            </select>
          </div>

          {/* Story Type Selection */}
          <div className="form-group">
            <label htmlFor="story_type">
              <span className="label-icon">📖</span>
              Choose Your Story Adventure
            </label>
            <div className="story-type-selection">
              <div 
                className={`story-type-card ${formData.story_type === 'astronaut_role' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, story_type: 'astronaut_role' }))}
              >
                <div className="story-type-icon">🚀</div>
                <h3>Interactive Astronaut Role</h3>
                <p>Learn what it's like to be a real astronaut! This story teaches you about astronaut responsibilities, daily life in space, and includes memory games and interactive quizzes.</p>
                <div className="story-features">
                  <span>✅ 6 Interactive Chapters</span>
                  <span>✅ Memory Games</span>
                  <span>✅ Role-Playing</span>
                  <span>✅ Real NASA Facts</span>
                </div>
              </div>
              
              <div 
                className={`story-type-card ${formData.story_type === 'adventure' ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, story_type: 'adventure' }))}
              >
                <div className="story-type-icon">🌌</div>
                <h3>Space Adventure Story</h3>
                <p>Go on an exciting journey through space! Travel to different planets, meet alien life, solve space mysteries, and become a space explorer hero.</p>
                <div className="story-features">
                  <span>✅ 5 Adventure Chapters</span>
                  <span>✅ Space Exploration</span>
                  <span>✅ Problem Solving</span>
                  <span>✅ Educational Fun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interests Selection */}
          <div className="form-group">
            <label>
              <span className="label-icon">⭐</span>
              What interests you? (Select at least one)
            </label>
            <div className="interests-grid">
              {availableInterests.map(interest => (
                <button
                  key={interest}
                  type="button"
                  className={`interest-chip ${formData.interests.includes(interest) ? 'selected' : ''}`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Generating Your Story...
              </>
            ) : (
              <>
                <span>🚀</span>
                Generate My Space Story
              </>
            )}
          </button>
        </form>

        <div className="form-footer">
          <p>✨ Your personalized story will include interactive quizzes, memory games, and amazing space facts!</p>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;