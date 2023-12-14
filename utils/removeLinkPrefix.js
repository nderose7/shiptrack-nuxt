export function removeLinkPrefix(url) {
  return url.replace(/^https?:\/\/www./, "");
}