export const STAFF_CLEANING_URL = "/siivous.html";

export function isStaffRedirectPath(path: string): boolean {
  return /^\/s\/[^/]+\/?$/i.test(path) || /^\/s-hallinta\/?$/i.test(path);
}

export function staffRedirectUrl(unit?: string): string {
  return unit === undefined
    ? `${STAFF_CLEANING_URL}?admin=1`
    : `${STAFF_CLEANING_URL}?unit=${encodeURIComponent(unit)}`;
}
