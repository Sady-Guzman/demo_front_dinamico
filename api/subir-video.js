import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, msg: "Método no permitido" });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return res.status(500).json({
        ok: false,
        msg: "Variables de entorno faltantes",
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

    const { nombre_completo, nivel_estudiante, url_video } = req.body;

    if (!nombre_completo || !nivel_estudiante || !url_video) {
      return res.status(400).json({
        ok: false,
        msg: "Faltan campos",
      });
    }

    const { data, error } = await supabase
      .from("destacados")
      .insert([{ nombre_completo, nivel_estudiante, url_video }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        ok: false,
        msg: "Error al insertar",
        detalle: error.message,
      });
    }

    return res.json({ ok: true, data });
  } catch (e) {
    console.error("Error inesperado:", e);
    return res.status(500).json({ ok: false, msg: "Error inesperado", detalle: e.message });
  }
}
