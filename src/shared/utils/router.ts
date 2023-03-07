export function getUrlPath(): string[] {
  return window.location.pathname.split("/").filter((url) => url);
}
