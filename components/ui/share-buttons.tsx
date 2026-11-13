"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/social-icons";

interface ShareButtonsProps {
  url: string;
  title: string;
}

const btn =
  "border-border hover:border-accent hover:text-accent grid size-10 place-items-center rounded-full border transition-colors";

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted mr-1 text-sm">Share:</span>
      <a
        className={btn}
        aria-label="Share on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
      >
        <LinkedinIcon />
      </a>
      <a
        className={btn}
        aria-label="Share on Facebook"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}
      >
        <FacebookIcon />
      </a>
      <a
        className={btn}
        aria-label="Share on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/?text=${t}%20${u}`}
      >
        <WhatsappIcon />
      </a>
      <button type="button" className={btn} onClick={copy} aria-label="Copy link">
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
