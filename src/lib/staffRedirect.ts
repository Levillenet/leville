export const STAFF_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5sMdbyDITwTJ28NDyexuCKGA1w8cjcDPnAW6XMgABA4UZYMSklZmEvp-EoybL6_imSQ/exec";

export function isStaffRedirectPath(path: string): boolean {
  return /^\/s\/[^/]+\/?$/i.test(path) || /^\/s-hallinta\/?$/i.test(path);
}

export function staffRedirectUrl(unit?: string): string {
  return unit === undefined
    ? `${STAFF_SCRIPT_URL}?admin=1`
    : `${STAFF_SCRIPT_URL}?unit=${encodeURIComponent(unit)}`;
}