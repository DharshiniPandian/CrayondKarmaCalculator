import React, { useState } from "react";
import Group1 from "../../assets/successvid.mp4";
import Group2 from "../../assets/successimg.png";
import './Complete.css'; 

const Complete = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleVideoEnd = () => {
        setShowSuccess(true);
    };

    return (
        <div className="complete-container">
            {!showSuccess ? (
                <video
                    src={Group1} 
                    poster={Group2} 
                    width="400" 
                    height="auto" 
                    autoPlay
                    muted 
                    playsInline 
                    className="complete-video"
                    onEnded={handleVideoEnd} 
                >
                    Sorry, your browser doesn't support HTML5 video tag.
                </video>
            ) : (
                <div className="success-message">
                    <img src={Group2} alt="Success" className="success-image" />
                    <h1>Form submitted successfully</h1>
                </div>
            )}
        </div>
    );
};

export default Complete;
