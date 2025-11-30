import { youtubeToEmbed } from '../lib/youtubeToEmbed.js';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre_completo, nivel_estudiante, url_video } = req.body;

  const embedUrl = youtubeToEmbed(url_video);
  if (!embedUrl) return res.status(400).json({ error: 'URL inválida' });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase
    .from('videos_estudiantes')
    .insert({
      nombre_completo,
      nivel_estudiante,
      url_video: embedUrl
    });

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ ok: true });
}
