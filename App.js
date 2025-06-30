import React, { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("professional");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("es");

  const t = {
    es: {
      title: "Generador de miniaturas con IA",
      desc: "Crea miniaturas virales para YouTube con solo una frase.",
      placeholder: "Escribe de qué trata tu video...",
      style: "Estilo",
      generate: "Generar Miniatura",
      download: "Descargar Imagen",
    },
    en: {
      title: "AI Thumbnail Generator",
      desc: "Create viral YouTube thumbnails from a single prompt.",
      placeholder: "Type what your video is about...",
      style: "Style",
      generate: "Generate Thumbnail",
      download: "Download Image",
    },
  };

  async function generateImage() {
    if (!prompt.trim()) return alert("Por favor escribe de qué trata tu vídeo");
    setLoading(true);
    setImageUrl(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `${prompt}, ${style} style` }),
      });
      const data = await res.json();
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        setImageUrl(data.imageUrl);
      }
    } catch (e) {
      alert("Error al generar la imagen.");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <select onChange={(e) => setLang(e.target.value)} value={lang} style={{ float: "right" }}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
      <h1>{t[lang].title}</h1>
      <p>{t[lang].desc}</p>
      <textarea
        rows={4}
        placeholder={t[lang].placeholder}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <label>{t[lang].style}:</label>
      <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ width: "100%", marginBottom: 10 }}>
        <option value="professional">Professional</option>
        <option value="meme">Meme</option>
        <option value="gaming">Gaming</option>
      </select>
      <button onClick={generateImage} disabled={loading} style={{ width: "100%", padding: 10, fontSize: 16 }}>
        {loading ? "..." : t[lang].generate}
      </button>
      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <img src={imageUrl} alt="Miniatura generada" style={{ width: "100%", borderRadius: 8 }} />
          <a href={imageUrl} download style={{ display: "block", marginTop: 10, textAlign: "center" }}>
            {t[lang].download}
          </a>
        </div>
      )}
    </div>
  );
}
