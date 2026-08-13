import { Search, X } from "lucide-react";
import { Button } from "./Button.jsx";

/* Static port of the app's CommandDeck (src/components/CommandDeck.tsx) in
 * block tone — the add-rule row + the merged search field. Dead UI: the real
 * onAdd / onSearchChange handlers are left as no-ops. */
export function CommandDeck({
  tone = "block",
  addPlaceholder = "Add site, app, or keyword to block",
  searchPlaceholder = "Search everything…",
  addValue = "",
  searchValue = "",
}) {
  const isBlock = tone === "block";

  const inputTone = isBlock
    ? "border-destructive/25 focus-visible:border-destructive focus-visible:ring-destructive/20"
    : "border-success/25 focus-visible:border-success focus-visible:ring-success/20";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={addPlaceholder}
          defaultValue={addValue}
          readOnly
          className={`flex-1 h-10 rounded-lg bg-card px-3 text-body text-brand-ink placeholder:text-brand-light/70 focus:outline-none focus-visible:outline-none focus-visible:ring-2 transition-all duration-200 border ${inputTone}`}
        />
        <Button variant={isBlock ? "destructive" : "success"} size="sm" className="h-10 px-4 rounded-lg">
          {isBlock ? "Block" : "Allow"}
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light" strokeWidth={2} />
        <input
          type="search"
          placeholder={searchPlaceholder}
          defaultValue={searchValue}
          readOnly
          className="pl-10 pr-9 h-10 rounded-full bg-brand-faint/70 border border-brand-border/70 text-body text-brand-ink placeholder:text-brand-light/80 focus:outline-none focus-visible:outline-none focus:bg-card focus-visible:bg-card transition-colors"
        />
        {searchValue && (
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-light" aria-label="Clear search">
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
