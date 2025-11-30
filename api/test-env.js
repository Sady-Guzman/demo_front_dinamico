export default function handler(req, res) {
  res.status(200).json({
    url: process.env.SUPABASE_URL || "NO_URL",
    role: process.env.SUPABASE_SERVICE_ROLE ? "OK" : "NO_ROLE"
  });
}
