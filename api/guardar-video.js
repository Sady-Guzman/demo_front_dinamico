const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

function youtubeToEmbed(url) {
  try {
    const parsed = new URL(url);
    const id = parsed.searchParams.get("v");
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }

  try {
    const { nombre_completo, nivel_estudiante, url_video } = req.body;

    if (!nombre_completo || !nivel_estudiante || !url_video) {
      return res.status(400).json({ ok: false, error: "Datos incompletos" });
    }

    const embed = youtubeToEmbed(url_video);

    if (!embed) {
      return res.status(400).json({ ok: false, error: "URL inválida" });
    }

    const { error } = await supabase
      .from("destacados")
      .insert({
        nombre_completo,
        nivel_estudiante,
        url_video: embed
      });

    if (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
