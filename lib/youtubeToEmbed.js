export function youtubeToEmbed(url) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("youtube.com")) return null;
    const id = u.searchParams.get("v");
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}
