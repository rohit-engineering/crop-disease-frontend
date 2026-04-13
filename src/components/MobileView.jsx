// components/MobileView.jsx
// FINAL COMPLETE MOBILE FILE

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaCamera,
  FaUpload,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

export default function MobileView({
  preview,
  result,
  loading,
  language,
  LANGUAGES,
  t,
  BASE_TEXT,
  handleLanguageChange,
  handleImageChange,
  handleSubmit,
  formatConfidence,
}) {
  const [showResult, setShowResult] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    if (!result) {
      setShowResult(false);
      setChatMessages([]);
      setTypingText("");
      return;
    }

    setShowResult(true);
    setChatMessages([]);
    setTypingText("");

    const data = result.solution || {};

    const messages = [
      "Disease analyzed successfully ✅",
      `Cause: ${data.cause || "Crop infection detected."}`,
      `Symptoms: ${
        data.symptoms?.length
          ? data.symptoms.join(", ")
          : "Leaf damage symptoms found."
      }`,
      `Organic Treatment: ${
        data.organic_treatment?.length
          ? data.organic_treatment.join(", ")
          : "Use neem spray weekly."
      }`,
      `Chemical Treatment: ${
        data.chemical_treatment?.length
          ? data.chemical_treatment.join(", ")
          : "Use recommended fungicide."
      }`,
      `Prevention: ${
        data.prevention?.length
          ? data.prevention.join(", ")
          : "Avoid excess moisture and keep field clean."
      }`,
    ];

    let msgIndex = 0;

    const typeMessage = () => {
      if (msgIndex >= messages.length) return;

      const currentMessage = messages[msgIndex];
      let charIndex = 0;

      setTypingText("");

      const typer = setInterval(() => {
        charIndex++;

        setTypingText(currentMessage.slice(0, charIndex));

        if (charIndex >= currentMessage.length) {
          clearInterval(typer);

          setTimeout(() => {
            setChatMessages((prev) => [...prev, currentMessage]);
            setTypingText("");
            msgIndex++;
            typeMessage();
          }, 600);
        }
      }, 24);
    };

    typeMessage();
  }, [result]);

  const confidenceWidth = result?.confidence
    ? `${(result.confidence * 100).toFixed(0)}%`
    : "0%";

  return (
    <div className="ultra-bg">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="ultra-header"
      >
        <h3 className="mb-2">
          <FaLeaf className="me-2" />
          {t.title || BASE_TEXT.title}
        </h3>

        <p className="mb-3">
          Smart Crop Disease Detection
        </p>

        {!loading && !result && (
          <select
            className="ultra-select"
            value={language}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        )}
      </motion.div>

      {/* START SCREEN */}
      {!preview && !loading && !result && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <h5 className="text-center fw-bold mb-3 text-success">
            Upload Crop Leaf
          </h5>

          <img
            src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
            alt="leaf"
            className="leaf-top-img"
          />

          <label className="ultra-btn mb-3">
            <FaCamera className="me-2" />
            Capture Image

            <input
              hidden
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
            />
          </label>

          <label className="ultra-btn secondary">
            <FaUpload className="me-2" />
            Upload Image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </motion.div>
      )}

      {/* PREVIEW */}
      {preview && !loading && !result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
        >
          <img
            src={preview}
            alt="Crop preview"
            className="ultra-preview"
          />

          <button
            className="scan-btn mt-3"
            onClick={handleSubmit}
          >
            Scan Disease
          </button>
        </motion.div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="glass-card text-center">
          <div className="loader-big mb-4"></div>

          <h5 className="fw-bold text-success">
            Scanning Your Image...
          </h5>

          <p className="typing-title">
            Detecting disease with AI...
          </p>
        </div>
      )}

      {/* RESULT */}
      {result && showResult && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <h5 className="text-success text-center fw-bold">
            <FaCheckCircle className="me-2" />
            Analysis Complete
          </h5>

          <p className="text-center small text-muted mb-3">
            Your crop report is ready 🌱
          </p>

          {/* Disease */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="result-box disease-card"
          >
            <small>Disease Detected</small>
            <h6 className="disease-text">
              🌿 {result.prediction}
            </h6>
          </motion.div>

          {/* Confidence */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="result-box confidence-card"
          >
            <small>AI Confidence Score</small>

            <div className="progress mt-3">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                style={{ width: confidenceWidth }}
              >
                {formatConfidence(result.confidence)}
              </div>
            </div>
          </motion.div>

          {/* AI Chat */}
          <div className="solution-box mt-3">

            <h6 className="fw-bold text-success mb-3">
              🤖 AI Treatment Assistant
            </h6>

            <div className="chat-thread">

              {chatMessages.map((msg, i) => (
                <div key={i} className="chat-msg">
                  <div className="chat-avatar">🤖</div>

                  <div className="chat-bubble">
                    {msg}
                  </div>
                </div>
              ))}

              {typingText && (
                <div className="chat-msg">
                  <div className="chat-avatar">🤖</div>

                  <div className="chat-bubble">
                    {typingText}
                    <span className="cursor-blink">|</span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Back Button */}
          <button
            className="back-btn mt-4"
            onClick={() => window.location.reload()}
          >
            <FaArrowLeft className="me-2" />
            Check Another Leaf
          </button>
        </motion.div>
      )}

      {/* Marquee */}
      <div className="crop-marquee">
        <div className="marquee-track">
          🌿 You can upload leaf of Tomato • Potato • Orange • Blueberry • Apple • Corn • Grape • Pepper • Cherry • Peach 🌱
        </div>
      </div>

      <div className="text-center mt-3 small text-muted">
        Smart Farming AI 🌱 | Made for Farmers 🇮🇳
      </div>
    </div>
  );
}