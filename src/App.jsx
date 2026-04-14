// App.jsx

import "./styles/app.css";
import { useEffect, useState } from "react";
import MobileView from "./components/MobileView";
import DesktopView from "./components/DesktopView";
import translations from "./translations/uiText.json";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [language, setLanguage] = useState("hi");

  const BACKEND_URL = "https://crop-disease-detection-hyh4.onrender.com/predict";

  const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
    { code: "bn", name: "বাংলা" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "pa", name: "ਪੰਜਾਬੀ" }
  ];

  // Current language text
  const t = translations[language] || translations.en;
  const BASE_TEXT = translations.en;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!image) return alert(t.selectLeaf);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("language", language);

    try {
      setLoading(true);

      const res = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        alert("Upload only diseased crop leaf.");
        return;
      }

      setResult(data);
    } catch {
      alert("Backend not reachable.");
    } finally {
      setLoading(false);
    }
  };

  const formatConfidence = (val) => {
    if (!val) return "N/A";
    return `${(val * 100).toFixed(2)}%`;
  };

  const getBadgeColor = (confidence) => {
    if (!confidence) return "secondary";
    if (confidence >= 0.85) return "success";
    if (confidence >= 0.7) return "warning";
    return "danger";
  };

  const solution = result?.solution || {
    cause: "",
    symptoms: [],
    organic_treatment: [],
    chemical_treatment: [],
    prevention: [],
    extra_tip: "",
    warning: "",
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const commonProps = {
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
  };

  return isMobile ? (
    <MobileView {...commonProps} />
  ) : (
    <DesktopView {...commonProps} />
  );
}

export default App;