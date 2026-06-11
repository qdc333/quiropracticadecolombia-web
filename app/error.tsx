"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main style={{ padding: "3rem", textAlign: "center", fontFamily: "system-ui" }}>
      <h1 style={{ color: "#9e4a4a" }}>Algo salió mal</h1>
      <p style={{ color: "#5c5252", margin: "1rem 0" }}>{error.message}</p>
      <button
        type="button"
        onClick={reset}
        style={{
          background: "#9e4a4a",
          color: "#fff",
          border: "none",
          padding: "0.75rem 1.25rem",
          borderRadius: "999px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Reintentar
      </button>
    </main>
  );
}
