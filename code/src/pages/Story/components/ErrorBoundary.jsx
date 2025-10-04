import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Story Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h1>🚀 Houston, We Have a Problem!</h1>
            <p>Something went wrong with your space adventure.</p>
            <p>Don't worry, our mission control team is on it!</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              🔄 Try Again
            </button>
            <button 
              className="home-button"
              onClick={() => window.location.href = '/'}
            >
              🏠 Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;