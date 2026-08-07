/**
 * Resolving the origin at runtime keeps Open Graph, canonical and sitemap URLs
 * correct in all three Vercel contexts:
 *   production  -> NEXT_PUBLIC_SITE_URL, or the project's production domain
 *   preview     -> the deployment's own URL, so previews never claim to be prod
 *   development -> localhost
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
