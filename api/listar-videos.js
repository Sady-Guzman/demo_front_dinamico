import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

    const { data, error } = await supabase
      .from("destacados")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }

    return res.json({ ok: true, data });
  } catch (e) {
    return res.status(500).json({ ok: false, msg: e.message });
  }
}
