"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for errors in the root layout. It replaces the whole
 * document, so it carries its own <html>/<body> and minimal inline styling.
 */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#060a17",
          color: "#eef1fb",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", margin: 0 }}>Something went wrong</h1>
          <p style={{ color: "#94a0bd", margin: "0.75rem 0 1.5rem" }}>
            Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              background: "#2563ff",
              color: "#fff",
              border: 0,
              borderRadius: 999,
              padding: "0.8rem 1.6rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
