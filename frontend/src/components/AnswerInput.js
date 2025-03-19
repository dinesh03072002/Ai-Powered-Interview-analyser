import React, { useState } from "react";
import "./styles/AnswerInput.css"; 

function AnswerInput({ question, setFeedback, answer, setAnswer }) {
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);

    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();
        setListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setAnswer(transcript);
            setListening(false);
        };

        recognition.onerror = () => {
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };
    };

    const submitAnswer = async () => {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/analyze_answer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, answer })
        });
        const data = await response.json();
        setFeedback(data.feedback);
        setLoading(false);
    };

    return (
        <div className="answer-container">
            <textarea
                className="answer-textarea"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer or use voice input..."
                onPaste={(e) => e.preventDefault()}  // Disable paste
                onCopy={(e) => e.preventDefault()}   // Disable copy
                onCut={(e) => e.preventDefault()}    // Disable cut
            />
            <div className="button-group">
                <button className={`mic-button ${listening ? "listening" : ""}`} onClick={startListening} disabled={listening}>
                    🎤 {listening ? "Listening..." : "Speak"}
                </button>
                <button className={`submit-button ${loading ? "loading" : ""}`} onClick={submitAnswer} disabled={loading}>
                    Submit
                    {loading && <div className="loading-spinner"></div>}
                </button>
            </div>
        </div>
    );
}

export default AnswerInput;
