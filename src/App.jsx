import { useEffect, useState ,useCallback } from "react";
import MobileView from "./components/MobileView";
import DesktopView from "./components/DesktopView";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [language, setLanguage] = useState("hi");
  const [translatedText, setTranslatedText] = useState({});

  const BACKEND_URL = "http://127.0.0.1:8000/predict";

  const BASE_TEXT = {
    title: "Crop Doctor AI",
    subtitle: "Upload leaf photo to check disease",
    upload: "Upload Leaf Photo",
    predict: "Check Disease",
    analyzing: "Checking...",
    selectLeaf: "Please select a leaf image",
    resultTitle: "Result",
    noResult: "Upload photo to get result",
    disease: "Disease",
    confidence: "Confidence",
    warning: "Warning",
    solution: "Solution",
    symptoms: "Symptoms",
    organic: "Organic Treatment",
    chemical: "Chemical Treatment",
    prevention: "Prevention",
    tip: "Extra Tip",
    source: "Solution Source",
  };

  const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
    { code: "bn", name: "বাংলা" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
  ];

  const translateText = async (text, targetLang) => {
    if (targetLang === "en") return text;

    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|${targetLang}`
      );

      const data = await res.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

const translateAllContent = useCallback(async () => {
  let newTranslations = {};

  for (let key in BASE_TEXT) {
    newTranslations[key] = await translateText(BASE_TEXT[key], language);
  }

  setTranslatedText(newTranslations);
}, [language]);

  useEffect(() => {
  translateAllContent();
}, [translateAllContent]);

  const t = language === "en" ? BASE_TEXT : translatedText;

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
  if (!image) return alert(t.selectLeaf || BASE_TEXT.selectLeaf);

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

    // 🔥 HANDLE ERROR FROM BACKEND
    if (data.error) {
      setResult(null);
      alert("❌ Please upload only diseased leaf image");
      return;
    }

    setResult(data);

  } catch (err) {
    alert("Backend not reachable. Check FastAPI server.");
    console.error(err);
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

  const solution = result?.solution;

  // 🔥 RESPONSIVE DETECTOR
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

  return (
    <>
      {isMobile ? (
        <MobileView {...commonProps} />
      ) : (
        <DesktopView {...commonProps} />
      )}
    </>
  );
}

export default App;