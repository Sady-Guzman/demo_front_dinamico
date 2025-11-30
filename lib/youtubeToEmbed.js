export function youtubeToEmbed(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/;

  const match = url.match(regex);
  if (!match) return null;

  const videoId = match[1];
  return `https://www.youtube.com/embed/${videoId}`;
}
