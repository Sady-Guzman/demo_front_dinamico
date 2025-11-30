import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }

  const { data, error } = await supabase
    .from("destacados")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }

  res.status(200).json({ ok: true, data });   // ← IMPORTANTE: "data"
}
