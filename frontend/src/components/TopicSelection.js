import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/TopicSelection.css";

function TopicSelection() {
    const topics = [
        { name: "C Programming", image: "/images/c-prm.webp" },
        { name: "C++", image: "/images/c++.jpg" },
        { name: "Java", image: "/images/java.webp" },
        { name: "DBMS", image: "/images/dbms.jpg" },
        { name: "Python", image: "/images/python.jpeg" },
        { name: "Data Structures", image: "/images/ds.jpeg" }
    ];

    const navigate = useNavigate();
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        // Preload images and mark as loaded
        topics.forEach(topic => {
            const img = new Image();
            img.src = topic.image;
            img.onload = () => {
                setLoadedImages(prev => ({ ...prev, [topic.image]: true }));
            };
        });
    }, []);

    const handleSelect = (topic) => {
        navigate(`/topics/${topic}`);
    };

    return (
        <div className="container">
            <h2 className="title">Select a Topic</h2>
            <div className="grid-container">
                {topics.map((topic) => (
                    <div 
                        key={topic.name} 
                        className="topic-box"
                        onClick={() => handleSelect(topic.name)}
                    >
                        {loadedImages[topic.image] ? (
                            <img src={topic.image} alt={topic.name} className="topic-image" />
                        ) : (
                            <div className="image-placeholder">Loading...</div>
                        )}
                        <div className="overlay">
                            <span className="topic-text">{topic.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopicSelection;
