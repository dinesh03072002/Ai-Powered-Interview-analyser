import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AniText = () => {
  const textArray = ["C", "C++", "Python", "Java", "Data Structures", "MySQL"];
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [textArray.length]);

  return (
    <div
      style={{
        marginTop: "0.5rem",
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem",
        background: "linear-gradient(to right, #6366f1, #3b82f6)",
        // background: "red",
        width: "14rem",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        borderRadius: "0.375rem",
        padding: "0.5rem",
        color: "white",
        transition: "all 300ms",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
        >
          {textArray[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AniText;
