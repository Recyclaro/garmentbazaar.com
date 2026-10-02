"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          setDone(false);
        }
      }}
      className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}
