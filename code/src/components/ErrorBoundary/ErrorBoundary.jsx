import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        
        // Log error in production for monitoring
        if (import.meta.env.PROD) {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary-content">
                        <div className="error-icon">🚀💥</div>
                        <h1>Houston, We Have a Problem!</h1>
                        <p className="error-message">
                            Something went wrong during your space mission.
                            Our ground control team has been notified.
                        </p>
                        <div className="error-actions">
                            <button 
                                className="error-button primary" 
                                onClick={this.handleReload}
                            >
                                🔄 Restart Mission
                            </button>
                            <button 
                                className="error-button secondary" 
                                onClick={() => window.history.back()}
                            >
                                ← Return to Base
                            </button>
                        </div>
                        {import.meta.env.DEV && this.state.error && (
                            <details className="error-details">
                                <summary>Technical Details (Development Only)</summary>
                                <pre className="error-stack">
                                    {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;