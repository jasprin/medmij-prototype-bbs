/**
 * Stable PDF sources served as static files.
 * This avoids browser/runtime issues caused by fragile inline base64 blobs.
 */
export const reportPdfSources: Record<string, string> = {
  "rpt-1": "/reports/rpt-1.pdf",
  "rpt-2": "/reports/rpt-2.pdf",
  "rpt-3": "/reports/rpt-3.pdf",
  "rpt-4": "/reports/rpt-4.pdf",
};
