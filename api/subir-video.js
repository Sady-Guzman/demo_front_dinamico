import { createClient } from "@supabase/supabase-js";
import { youtubeToEmbed } from "../lib/youtubeToEmbed.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, msg: "Método no permitido" });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return res.status(500).json({ ok: false, msg: "ENV missing" });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

    const { nombre_completo, nivel_estudiante, url_video } = req.body ?? {};

    console.log("BODY RECIBIDO:", req.body);

    if (!nombre_completo || !nivel_estudiante || !url_video) {
      return res.status(400).json({ ok: false, msg: "Faltan campos" });
    }

    const embed = youtubeToEmbed(url_video);
    if (!embed) return res.status(400).json({ ok: false, msg: "URL YouTube inválida" });

    const { data, error } = await supabase
      .from("destacados")
      .insert([{ nombre_completo, nivel_estudiante, url_video: embed }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ ok: false, msg: "Error insertando", detalle: error.message });
    }

    return res.status(200).json({ ok: true, data });
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ ok: false, msg: "Error inesperado", detalle: String(e) });
  }
}
