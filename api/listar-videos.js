import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ ok: false, msg: "Método no permitido" });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return res.status(500).json({ ok: false, msg: "ENV missing" });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

    const { data, error } = await supabase
      .from("destacados")
      .select("id, created_at, nombre_completo, nivel_estudiante, url_video")
      .order("id", { ascending: false })
      .limit(200);

    if (error) {
      console.error("Supabase select error:", error);
      return res.status(500).json({ ok: false, msg: error.message });
    }

    return res.status(200).json({ ok: true, data });
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ ok: false, msg: String(e) });
  }
}
