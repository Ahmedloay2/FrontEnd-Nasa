import "./EBook.css";

const EBook = () => {
  return (
    <div className="ebook-page-container">
      <div className="ebook-main-row">
        <div className="ebook-info-section">
          <h1 className="ebook-title">Orbiting the Void: An Astronaut's Life</h1>
          <p className="ebook-description">
            What is it like to make a home in the emptiness? Orbiting the Void takes you inside the profound and daily reality of life in space. This captivating ebook moves beyond the science to explore the human experience: the surreal tranquility of a spacewalk, the challenge of a simple meal in microgravity, the camaraderie of the crew, and the constant, humbling view of our world—a vibrant oasis against the infinite black. It is a story of transformation, where the stark contrast between human fragility and the cosmos's scale forever changes those who experience it. Through stunning photography and personal stories, discover what it truly means to live suspended between the structured world of orbit and the vast, silent void, and how that perspective reshapes our understanding of home.
          </p>
        </div>
        <div className="ebook-viewer-section">
          <div className="ebook-viewer-card">
            {/* Replace with your actual e-book viewer component or iframe */}
            <iframe
              src="/ebook-viewer"
              title="Space Journey E-Book"
              className="ebook-viewer-iframe"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="ebook-audio-row">
              <span className="ebook-audio-label">Not a fan of reading? No worries! Tune into the podcast version of the e-book and enjoy it on the go.</span>
              <div className="ebook-audio-bar-wrap">
                <audio controls className="ebook-audio-player">
                  <source src="/audio/ebook-podcast.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ebook-quiz-section">
            <h2 className="ebook-quiz-title">"Prove Your Planetary Expertise"</h2>
            <p className="ebook-quiz-desc">Challenge yourself and unlock new cosmic insights.</p>
            <button className="ebook-quiz-btn">Start Quiz</button>
          </div>
    </div>
  );
};

export default EBook