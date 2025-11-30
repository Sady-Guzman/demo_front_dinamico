export default function handler(req, res) {
  res.json({
    SUPABASE_URL: process.env.SUPABASE_URL ? "OK" : "MISSING",
    SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE ? "OK" : "MISSING"
  });
}
