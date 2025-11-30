import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { nombre_completo, nivel_estudiante, url_video } = req.body;

    // Validaciones básicas
    if (!url_video) {
      return res.status(400).json({ message: "Falta la URL del video" });
    }

    // -----------------------------
    // Conversor de YouTube a embed
    // -----------------------------
    function youtubeToEmbed(original) {
      const u = new URL(original);
      const id = u.searchParams.get("v");
      let start = 0;

      const t = u.searchParams.get("t");
      if (t) {
        start = parseInt(t.replace("s", ""), 10);
      }

      return `https://www.youtube.com/embed/${id}${
        start ? `?start=${start}` : ""
      }`;
    }

    const embedUrl = youtubeToEmbed(url_video);

    // -----------------------------
    // Supabase client
    // -----------------------------
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE
    );

    // Insertar en la tabla
    const { data, error } = await supabase.from("destacados").insert([
      {
        nombre_completo,
        nivel_estudiante,
        url_video: embedUrl
      }
    ]);

    if (error) {
      console.error("Error al insertar:", error);
      return res.status(500).json({ message: "Error al insertar video" });
    }

    return res.json({ success: true, data });
  } catch (err) {
    console.error("Error interno:", err);
    return res.status(500).json({ message: "Error interno" });
  }
}
