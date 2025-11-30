const { createClient } = require("@supabase/supabase-js");

module.exports = async (req, res) => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return res.status(500).json({
        ok: false,
        msg: "Faltan variables de entorno",
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

    const { data, error } = await supabase
      .from("destacados")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error Supabase:", error.message);
      return res.status(500).json({ ok: false, msg: error.message });
    }

    return res.status(200).json({ ok: true, data });
  } catch (e) {
    console.error("Error inesperado:", e);
    return res.status(500).json({ ok: false, msg: e.message });
  }
};
