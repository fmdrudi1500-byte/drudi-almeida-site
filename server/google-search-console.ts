/**
 * Google Search Console API helper
 *
 * Uses the existing Google OAuth2 credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
 * GOOGLE_REFRESH_TOKEN) to submit the sitemap to Google Search Console.
 *
 * API reference: https://developers.google.com/webmaster-tools/v1/sitemaps/submit
 *
 * Required OAuth2 scope: https://www.googleapis.com/auth/webmasters
 */

import { ENV } from "./_core/env";

const SITE_URL = "https://institutodrudiealmeida.com.br";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GSC_API_BASE = "https://www.googleapis.com/webmasters/v3";

export interface GscSubmitResult {
  success: boolean;
  sitemapUrl: string;
  message: string;
  statusCode?: number;
}

export interface GscSitemapInfo {
  path: string;
  lastSubmitted?: string;
  isPending?: boolean;
  isSitemapsIndex?: boolean;
  type?: string;
  lastDownloaded?: string;
  warnings?: number;
  errors?: number;
  contents?: Array<{ type: string; submitted: number; indexed: number }>;
}

/**
 * Obtains a fresh access token using the stored refresh token.
 */
async function getAccessToken(): Promise<string> {
  if (!ENV.googleClientId || !ENV.googleClientSecret || !ENV.googleRefreshToken) {
    throw new Error(
      "Google OAuth2 credentials not configured. " +
        "Ensure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_REFRESH_TOKEN are set."
    );
  }

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: ENV.googleClientId,
      client_secret: ENV.googleClientSecret,
      refresh_token: ENV.googleRefreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to refresh Google access token: ${response.status} — ${body}`);
  }

  const data = (await response.json()) as { access_token?: string; error?: string };
  if (!data.access_token) {
    throw new Error(`No access_token in Google token response: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

/**
 * Submits the sitemap to Google Search Console.
 * Uses PUT /webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}
 */
export async function submitSitemapToGSC(): Promise<GscSubmitResult> {
  try {
    const accessToken = await getAccessToken();

    // URL-encode the site URL and sitemap URL for the API path
    const encodedSiteUrl = encodeURIComponent(SITE_URL);
    const encodedSitemapUrl = encodeURIComponent(SITEMAP_URL);

    const apiUrl = `${GSC_API_BASE}/sites/${encodedSiteUrl}/sitemaps/${encodedSitemapUrl}`;

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204 || response.ok) {
      console.log(`[GSC] Sitemap submitted successfully: ${SITEMAP_URL}`);
      return {
        success: true,
        sitemapUrl: SITEMAP_URL,
        message: "Sitemap submetido com sucesso ao Google Search Console.",
        statusCode: response.status,
      };
    }

    const body = await response.text();
    console.error(`[GSC] Sitemap submission failed: ${response.status} — ${body}`);
    return {
      success: false,
      sitemapUrl: SITEMAP_URL,
      message: `Erro ao submeter sitemap: HTTP ${response.status} — ${body}`,
      statusCode: response.status,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[GSC] Sitemap submission error:", message);
    return {
      success: false,
      sitemapUrl: SITEMAP_URL,
      message: `Erro ao submeter sitemap: ${message}`,
    };
  }
}

/**
 * Retrieves the current sitemap status from Google Search Console.
 * Uses GET /webmasters/v3/sites/{siteUrl}/sitemaps/{feedpath}
 */
export async function getSitemapStatus(): Promise<GscSitemapInfo | null> {
  try {
    const accessToken = await getAccessToken();

    const encodedSiteUrl = encodeURIComponent(SITE_URL);
    const encodedSitemapUrl = encodeURIComponent(SITEMAP_URL);

    const apiUrl = `${GSC_API_BASE}/sites/${encodedSiteUrl}/sitemaps/${encodedSitemapUrl}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`[GSC] Get sitemap status failed: ${response.status} — ${body}`);
      return null;
    }

    return (await response.json()) as GscSitemapInfo;
  } catch (err) {
    console.error("[GSC] Get sitemap status error:", err);
    return null;
  }
}

/**
 * Lists all sitemaps registered in Google Search Console for the site.
 */
export async function listSitemaps(): Promise<GscSitemapInfo[]> {
  try {
    const accessToken = await getAccessToken();

    const encodedSiteUrl = encodeURIComponent(SITE_URL);
    const apiUrl = `${GSC_API_BASE}/sites/${encodedSiteUrl}/sitemaps`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`[GSC] List sitemaps failed: ${response.status} — ${body}`);
      return [];
    }

    const data = (await response.json()) as { sitemap?: GscSitemapInfo[] };
    return data.sitemap ?? [];
  } catch (err) {
    console.error("[GSC] List sitemaps error:", err);
    return [];
  }
}
