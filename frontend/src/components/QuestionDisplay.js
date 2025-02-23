import React from "react";
import "./styles/QuestionDisplay.css"; // Import the CSS file

function QuestionDisplay({ question }) {
    return (
        <div className="question-container">
            <h3 className="question-title">Question:</h3>
            <p className="question-text">{question}</p>
        </div>
    );
}

export default QuestionDisplay;
