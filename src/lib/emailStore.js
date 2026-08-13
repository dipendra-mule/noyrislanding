const KEY = "noyris_emails";

/* Secret admin path — only reachable via this exact URL. Change this to a
 * new random string anytime; the list itself stays in localStorage. */
export const ADMIN_HASH = "#/84333/95492/1742/82177/13925/72923/54387/33742";

export function getEmails() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveEmails(emails) {
  try {
    localStorage.setItem(KEY, JSON.stringify(emails));
  } catch (e) {
    console.error("Failed to save emails:", e);
  }
}

export function addEmail(email) {
  const emails = getEmails();
  const clean = String(email || "").trim().toLowerCase();
  if (!clean || emails.some((e) => e.email === clean)) return false;
  emails.push({ email: clean, addedAt: new Date().toISOString() });
  saveEmails(emails);
  return true;
}

export function removeEmail(email) {
  saveEmails(getEmails().filter((e) => e.email !== email));
}

export function clearEmails() {
  saveEmails([]);
}
