export function getMangaIdFromUrl(url: string | undefined): string | undefined {
  if (!url) {
    return undefined;
  }

  const matches = /series.html\?.*id=(\d+)/.exec(url);
  if (!matches) {
    return undefined;
  }

  return matches[1];
}
