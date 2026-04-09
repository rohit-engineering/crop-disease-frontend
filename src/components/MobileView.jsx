export default function MobileView({
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
  getBadgeColor,
}) {
  return (
    <div className="app-bg">
      {/* TOP HEADER */}
      <div className="mobile-header shadow-sm">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="fw-bold mb-0 text-white">
              🌿 {t.title || BASE_TEXT.title}
            </h4>
            <small className="text-light opacity-75">
              {t.subtitle || BASE_TEXT.subtitle}
            </small>
          </div>

          <div className="header-badge">
            <span className="badge rounded-pill bg-light text-success fw-bold px-3 py-2">
              AI
            </span>
          </div>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="container py-3">
        {/* Language */}
        <div className="card ai-card mb-3 p-3">
          <label className="fw-bold mb-2 text-muted">
            🌍 Language / भाषा
          </label>

          <select
            className="form-select form-select-lg village-select"
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

        {/* Upload */}
        <div className="card ai-card mb-3 p-3">
          <label className="fw-bold mb-2 text-muted">
            📷 Upload Leaf Photo
          </label>

          <label className="btn btn-warning btn-lg w-100 fw-bold village-btn">
            📸 {t.upload || BASE_TEXT.upload}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          <p className="text-muted small mt-2 mb-0">
            Tip: Clear photo lo bhai, sunlight mein lena best rahega 🌞
          </p>
        </div>

        {/* Preview */}
        {preview && (
          <div className="card ai-card mb-3 p-2 preview-card">
            <img src={preview} alt="preview" className="preview-img" />
          </div>
        )}

        {/* Predict */}
        <button
          className="btn btn-success btn-lg w-100 fw-bold predict-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? `⏳ ${t.analyzing || BASE_TEXT.analyzing}`
            : `🔍 ${t.predict || BASE_TEXT.predict}`}
        </button>

        {/* RESULT */}
        <div className="card ai-card mt-4 p-3 result-card">
          <h5 className="fw-bold text-center text-success mb-3">
            ✅ {t.resultTitle || BASE_TEXT.resultTitle}
          </h5>

          {!result ? (
            <p className="text-center text-muted fw-semibold mb-0">
              {t.noResult || BASE_TEXT.noResult}
            </p>
          ) : (
            <>
              <div className="result-row">
                <span className="fw-bold">
                  🌿 {t.disease || BASE_TEXT.disease}:
                </span>
                <span className="fw-bold text-success">{result.prediction}</span>
              </div>

              <div className="result-row mt-2">
                <span className="fw-bold">
                  🎯 {t.confidence || BASE_TEXT.confidence}:
                </span>

                <span
                  className={`badge rounded-pill bg-${getBadgeColor(
                    result.confidence
                  )} px-3 py-2`}
                >
                  {formatConfidence(result.confidence)}
                </span>
              </div>

              {result.warning && (
                <div className="alert alert-warning mt-3 fw-semibold">
                  ⚠️ <b>{t.warning || BASE_TEXT.warning}:</b> {result.warning}
                </div>
              )}

              <div className="small text-muted fw-bold mt-2">
                📌 {t.source || BASE_TEXT.source}:{" "}
                <span className="text-dark">{result.solution_source}</span>
              </div>

              {/* SOLUTION */}
              <div className="solution-box mt-4">
                <h6 className="fw-bold text-center mb-3 text-success">
                  🌱 {t.solution || BASE_TEXT.solution}
                </h6>

                {solution?.message && (
                  <p className="fw-semibold mb-2">{solution.message}</p>
                )}

                {solution?.cause && (
                  <p className="fw-semibold mb-2">
                    <b>Cause:</b> {solution.cause}
                  </p>
                )}

                {solution?.symptoms && Array.isArray(solution.symptoms) && (
                  <div className="mb-3">
                    <b>🟡 {t.symptoms || BASE_TEXT.symptoms}:</b>
                    <ul className="mt-2">
                      {solution.symptoms.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {solution?.organic_treatment &&
                  Array.isArray(solution.organic_treatment) && (
                    <div className="mb-3">
                      <b>🍃 {t.organic || BASE_TEXT.organic}:</b>
                      <ul className="mt-2">
                        {solution.organic_treatment.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {solution?.chemical_treatment &&
                  Array.isArray(solution.chemical_treatment) && (
                    <div className="mb-3">
                      <b>🧪 {t.chemical || BASE_TEXT.chemical}:</b>
                      <ul className="mt-2">
                        {solution.chemical_treatment.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {solution?.prevention &&
                  Array.isArray(solution.prevention) && (
                    <div className="mb-3">
                      <b>🛡️ {t.prevention || BASE_TEXT.prevention}:</b>
                      <ul className="mt-2">
                        {solution.prevention.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {solution?.extra_tip && (
                  <div className="alert alert-success fw-semibold">
                    💡 <b>{t.tip || BASE_TEXT.tip}:</b> {solution.extra_tip}
                  </div>
                )}

                {solution?.warning && (
                  <div className="alert alert-danger fw-semibold">
                    🚨 <b>Safety:</b> {solution.warning}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="text-center mt-4 small text-muted">
          Made for Farmers ❤️ | गाँव के लिए AI सहायता 🌾
        </div>
      </div>
    </div>
  );
}