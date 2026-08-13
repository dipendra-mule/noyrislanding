import { Edit3, Trash2, MoreHorizontal } from "lucide-react";
import { Toggle } from "./Toggle.jsx";

/* Static port of the app's BlockRow (blocks.tsx) — title + rule value chips
 * + edit/delete/disable controls. */
export function BlockRow({ block, on = true }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-brand-line/60 last:border-0">
      <Toggle checked={on} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-brand-ink truncate">{block.title}</span>
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-brand-faint text-brand-sub font-mono shrink-0">
            {block.type}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {block.values.map((v, i) => (
            <span key={i} className="text-[13px] px-1.5 py-0.5 rounded-md bg-brand-badge text-brand-sub font-mono">
              {v}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-0.5 shrink-0">
        <span className="flex items-center justify-center w-7 h-7 rounded-md text-brand-light hover:bg-brand-hover cursor-pointer">
          <Edit3 size={14} />
        </span>
        <span className="flex items-center justify-center w-7 h-7 rounded-md text-brand-light hover:bg-brand-hover cursor-pointer">
          <Trash2 size={14} />
        </span>
        <span className="flex items-center justify-center w-7 h-7 rounded-md text-brand-light hover:bg-brand-hover cursor-pointer">
          <MoreHorizontal size={14} />
        </span>
      </div>
    </div>
  );
}
