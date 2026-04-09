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
  getBadgeColor,
}) {
  return (
    <div className="desktop-bg">
      <div className="container py-5">
        <div className="row g-4">
          {/* LEFT PANEL */}
          <div className="col-lg-5">
            <div className="desktop-header-card shadow-sm">
              <h2 className="fw-bold text-white mb-1">
                🌿 {t.title || BASE_TEXT.title}
              </h2>
              <p className="text-light opacity-75 mb-0">
                {t.subtitle || BASE_TEXT.subtitle}
              </p>
            </div>

            <div className="card ai-card shadow-sm p-4 mt-4">
              <label className="fw-bold text-muted mb-2">
                🌍 Select Language
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

              <hr />

              <label className="fw-bold text-muted mb-2">
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

              <p className="small text-muted mt-3 mb-0">
                Better result ke liye leaf ka clear photo lo, blur nahi hona
                chahiye.
              </p>

              {preview && (
                <div className="mt-4 preview-card p-2">
                  <img src={preview} alt="preview" className="preview-img" />
                </div>
              )}

              <button
                className="btn btn-success btn-lg w-100 fw-bold mt-4 predict-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? `⏳ ${t.analyzing || BASE_TEXT.analyzing}`
                  : `🔍 ${t.predict || BASE_TEXT.predict}`}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-lg-7">
            <div className="card ai-card shadow-sm p-4 result-card">
              <h4 className="fw-bold text-success text-center mb-4">
                ✅ {t.resultTitle || BASE_TEXT.resultTitle}
              </h4>

              {!result ? (
                <div className="empty-result-box">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2909/2909761.png"
                    alt="ai"
                    className="empty-ai-img"
                  />
                  <p className="text-muted fw-semibold mt-3">
                    {t.noResult || BASE_TEXT.noResult}
                  </p>
                </div>
              ) : (
                <>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="mini-info-card">
                        <p className="mb-1 text-muted fw-bold">
                          🌿 {t.disease || BASE_TEXT.disease}
                        </p>
                        <h5 className="fw-bold text-success mb-0">
                          {result.prediction}
                        </h5>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mini-info-card">
                        <p className="mb-1 text-muted fw-bold">
                          🎯 {t.confidence || BASE_TEXT.confidence}
                        </p>
                        <h5 className="fw-bold mb-0">
                          <span
                            className={`badge bg-${getBadgeColor(
                              result.confidence
                            )} px-3 py-2`}
                          >
                            {formatConfidence(result.confidence)}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>

                  {result.warning && (
                    <div className="alert alert-warning fw-semibold">
                      ⚠️ <b>{t.warning || BASE_TEXT.warning}:</b>{" "}
                      {result.warning}
                    </div>
                  )}

                  <div className="small fw-bold text-muted mb-3">
                    📌 {t.source || BASE_TEXT.source}:{" "}
                    <span className="text-dark">{result.solution_source}</span>
                  </div>

                  <div className="solution-box mt-3">
                    <h5 className="fw-bold text-success mb-3">
                      🌱 {t.solution || BASE_TEXT.solution}
                    </h5>

                    {solution?.message && (
                      <p className="fw-semibold">{solution.message}</p>
                    )}

                    {solution?.cause && (
                      <p className="fw-semibold">
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

            <div className="text-center mt-4 small text-muted">
              Smart Farming AI | Designed for Rural Farmers 🌾
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}