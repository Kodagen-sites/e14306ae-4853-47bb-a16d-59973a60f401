export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        background: "#ffffff",
        color: "#0a0a0a",
      }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#6b6b6b",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "Fraunces, Georgia, serif",
          fontSize: "clamp(48px, 9vw, 96px)",
          fontWeight: 300,
          margin: "24px 0 16px",
          letterSpacing: "-0.02em",
        }}
      >
        Not on the plans.
      </h1>
      <p style={{ color: "#4a4a4a", maxWidth: 480 }}>
        This page doesn't exist.
      </p>
      <a
        href="/"
        style={{
          marginTop: 32,
          background: "#0a0a0a",
          color: "#ffffff",
          padding: "16px 28px",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        ← Back home
      </a>
    </main>
  );
}
