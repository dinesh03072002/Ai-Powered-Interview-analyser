import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import TopicSelection from "./components/TopicSelection";
import QuestionDisplay from "./components/QuestionDisplay";
import AnswerInput from "./components/AnswerInput";
import "./App.css";
import LandingPage from "./components/LandingPage";

function TopicPage() {
  const { topic } = useParams();
  const [question, setQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuestion = useCallback(async () => {
    setFeedback("");
    setLoading(true);
    setAnswer("");
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/generate_question?topic=${encodeURIComponent(
          topic
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch question");
      const data = await response.json();
      if (!data.question) throw new Error("No question found");
      setQuestion(data.question);
    } catch (error) {
      console.error(error);
      setQuestion("");
      setFeedback("Error fetching question. Please try again.");
    }
    setLoading(false);
  }, [topic]);

  return (
    <div className="container">
      <h2>
        Selected Topic: <span className="selected-topic">{topic}</span>
      </h2>
      <button
        className="generate-button"
        onClick={fetchQuestion}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Question"}
      </button>
      {question ? (
        <QuestionDisplay question={question} />
      ) : (
        <p className="question">
          {loading
            ? "Loading question..."
            : "Click 'Generate Question' to get a question."}
        </p>
      )}
      {question && (
        <AnswerInput
          question={question}
          setFeedback={setFeedback}
          answer={answer}
          setAnswer={setAnswer}
        />
      )}
      {feedback && <p className="feedback-box">Feedback: {feedback}</p>}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/topics" element={<TopicSelection />} />
        <Route path="/topics/:topic" element={<TopicPage />} />
      </Routes>
    </Router>
  );
}

export default App;
