// components/DesktopView.jsx
// FINAL PREMIUM DESKTOP FILE

import { motion } from "framer-motion";
import {
  FaLeaf,
  FaRobot,
  FaUpload,
  FaSearch,
  FaGlobeAsia,
  FaCheckCircle,
  FaShieldAlt,
  FaFlask,
  FaSeedling,
  FaBug,
} from "react-icons/fa";

export default function DesktopView({
  preview,
  result,
  loading,
  language,
  LANGUAGES,
  t,
  BASE_TEXT,
  solution,
  handleLanguageChange,
  handleImageChange,
  handleSubmit,
  formatConfidence,
}) {
  const confidenceWidth = result?.confidence
    ? `${(result.confidence * 100).toFixed(0)}%`
    : "0%";

  return (
    <div className="desktop-pro-bg">

      {/* PREMIUM HEADER */}
      <div className="desk-navbar premium-header">

        <div className="container-fluid px-5">

          <div className="row align-items-center">

            <div className="col-lg-8">
              <h1 className="desk-logo premium-title">
                <FaLeaf className="me-2" />
                {t.title || BASE_TEXT.title}
              </h1>

              <p className="premium-tagline">
                <FaRobot className="me-2" />
                Smart AI Powered Crop Disease Detection
              </p>
            </div>

            <div className="col-lg-4 text-end">

              <label className="premium-label">
                <FaGlobeAsia className="me-2" />
                Select Language
              </label>

              <select
                className="premium-select"
                value={language}
                onChange={handleLanguageChange}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>

            </div>

          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="container-fluid px-5 py-4">

        <div className="row g-4">

          {/* LEFT SIDE */}
          <div className="col-lg-4">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="desk-box sticky-top"
              style={{ top: "25px" }}
            >

              <h3 className="desk-section-title">
                <FaUpload className="me-2" />
                Upload Crop Leaf
              </h3>

              <img
                src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
                alt="leaf"
                className="desk-leaf-icon"
              />

              <label className="desk-upload-btn">
                <FaUpload className="me-2" />
                Upload Leaf Photo

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="desk-preview mt-4"
                />
              )}

              <button
                className="desk-scan-btn mt-4"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader me-2"></span>
                    Scanning...
                  </>
                ) : (
                  <>
                    <FaSearch className="me-2" />
                    Check Disease
                  </>
                )}
              </button>

              <p className="small text-muted mt-4 mb-0">
                Best result ke liye clear leaf image upload karein.
              </p>

            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-8">

            {!result ? (
              <div className="desk-box text-center p-5">
                <h3 className="text-success fw-bold">
                  <FaCheckCircle className="me-2" />
                  Detection Result
                </h3>

                <p className="text-muted mt-4">
                  Upload crop image to detect disease
                </p>
              </div>
            ) : (
              <>
                {/* TOP RESULT */}
                <div className="row g-4 mb-4">

                  <div className="col-md-6">
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="desk-box disease-card-big"
                    >
                      <h5>
                        <FaBug className="me-2" />
                        Disease Found
                      </h5>

                      <h3 className="mt-3 text-success">
                        {result.prediction}
                      </h3>
                    </motion.div>
                  </div>

                  <div className="col-md-6">
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="desk-box confidence-big"
                    >
                      <h5>Confidence Score</h5>

                      <div className="progress mt-4">
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          style={{ width: confidenceWidth }}
                        >
                          {formatConfidence(result.confidence)}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>

                {/* CAUSE */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="desk-box mb-4"
                >
                  <h3 className="desk-section-title">
                    <FaSeedling className="me-2" />
                    Treatment Guide
                  </h3>

                  {solution?.cause && (
                    <p className="mt-3 mb-0">
                      <b>Cause:</b> {solution.cause}
                    </p>
                  )}
                </motion.div>

                {/* GRID CARDS */}
                <div className="row g-4">

                  {/* Symptoms */}
                  <div className="col-md-6">
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="desk-box small-box"
                    >
                      <h5>Symptoms</h5>

                      <ul>
                        {solution?.symptoms?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Organic */}
                  <div className="col-md-6">
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="desk-box small-box"
                    >
                      <h5>
                        <FaLeaf className="me-2" />
                        Organic Treatment
                      </h5>

                      <ul>
                        {solution?.organic_treatment?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Chemical */}
                  <div className="col-md-6">
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="desk-box small-box"
                    >
                      <h5>
                        <FaFlask className="me-2" />
                        Chemical Treatment
                      </h5>

                      <ul>
                        {solution?.chemical_treatment?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Prevention */}
                  <div className="col-md-6">
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="desk-box small-box"
                    >
                      <h5>
                        <FaShieldAlt className="me-2" />
                        Prevention
                      </h5>

                      <ul>
                        {solution?.prevention?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                </div>
              </>
            )}

            <div className="text-center mt-4 small text-muted">
              Made for Farmers 🇮🇳 | Smart Farming Future 🌱
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}