import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Falta prompt" });

  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response.data.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error interno" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en puerto ${PORT}`);
});
