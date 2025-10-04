import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
    message = "Loading...", 
    size = "medium", 
    theme = "space" 
}) => {
    return (
        <div className={`loading-container ${size} ${theme}`}>
            <div className="loading-spinner">
                <div className="spinner-orbit">
                    <div className="spinner-planet"></div>
                </div>
                <div className="spinner-orbit spinner-orbit-2">
                    <div className="spinner-satellite"></div>
                </div>
            </div>
            <p className="loading-message">{message}</p>
        </div>
    );
};

export default LoadingSpinner;