/** Format an ISO date string to Dutch locale */
export function formatDate(
  iso: string,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...options,
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
