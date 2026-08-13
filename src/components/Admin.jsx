import React, { useEffect, useState } from "react";
import { getEmails, removeEmail, clearEmails } from "../lib/emailStore.js";

export default function Admin() {
  const [emails, setEmails] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEmails(getEmails());
  }, []);

  const refresh = () => setEmails(getEmails());

  const handleDelete = (email) => {
    removeEmail(email);
    refresh();
  };

  const handleClear = () => {
    if (window.confirm(`Delete all ${emails.length} emails?`)) {
      clearEmails();
      refresh();
    }
  };

  const handleCopy = async () => {
    const text = emails.map((e) => e.email).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Couldn't copy. Select the list and copy manually.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(emails, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "noyris-emails.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full bg-paper px-6 py-12 text-ink">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Email list</h1>
            <p className="mt-1 text-sm text-mist">
              {emails.length} signup{emails.length === 1 ? "" : "s"} &middot; stored locally in this browser
            </p>
          </div>
          <a href="#/" className="text-sm font-semibold text-brand hover:underline">
            &larr; Back to site
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            disabled={emails.length === 0}
            className="h-9 rounded-lg bg-brand px-4 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-40"
          >
            {copied ? "Copied!" : "Copy emails"}
          </button>
          <button
            onClick={handleDownload}
            disabled={emails.length === 0}
            className="h-9 rounded-lg border border-line bg-card px-4 text-sm font-semibold text-ink transition-colors hover:bg-brand-hover disabled:opacity-40"
          >
            Download JSON
          </button>
          <button
            onClick={handleClear}
            disabled={emails.length === 0}
            className="h-9 rounded-lg border border-destructive/30 bg-card px-4 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-40"
          >
            Clear all
          </button>
        </div>

        {emails.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-brandblue/40 bg-card p-10 text-center">
            <p className="text-sm text-mist">No emails yet. Share the site and they&rsquo;ll show up here.</p>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-2">
            {emails.map((e, i) => (
              <li
                key={e.email}
                className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3"
              >
                <span className="w-6 flex-none font-mono text-xs text-mist">{i + 1}</span>
                <span className="flex-1 truncate text-sm font-medium text-ink">{e.email}</span>
                <span className="flex-none font-mono text-[11px] text-mist">
                  {new Date(e.addedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleDelete(e.email)}
                  aria-label={`Delete ${e.email}`}
                  className="flex-none rounded-md px-2 py-1 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
