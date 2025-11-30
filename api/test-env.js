export default function handler(req, res) {
  res.json({
    url: process.env.SUPABASE_URL ? "ok" : "missing",
    role: process.env.SUPABASE_SERVICE_ROLE ? "ok" : "missing"
  });
}
